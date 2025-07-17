import geohash from "ngeohash"
import client from "../memcached.js"
import WebSocket, {WebSocketServer} from "ws";

const geohash_precision = parseInt(process.env.GEOHASH_PRECISION || '6')


export default class LocationManager {

    actions = {
        'updateDriverLocation': this.updateLocation.bind(this),
        'trackDriver':          this.subscribe.bind(this)
    }

    constructor(server) {

        this.wss           = new WebSocketServer({ server })
        this.subscriptions = new Map()
    }

    start() {

        this.wss.on('connection', socket => {

            socket.on('message', (msg) => this.handleMessage(socket, msg))
            socket.on('close', ()      => this.cleanup(socket))
        })

        console.log('Location WebSocket started.')
    }

    cleanup(socket) {

        for(const sockets of this.subscriptions.values())
            sockets.delete(socket)
    }

    subscribe(socket, { driverId }) {

        if ( !(this.subscriptions.has(driverId)) ) this.subscriptions.set(driverId, new Set())

        this.subscriptions.get(driverId).add(socket)
        socket.send(JSON.stringify({ type: 'subscribed', driverId }))
    }

    async handleMessage(socket, raw) {

        try   { var data = JSON.parse(raw) }
        catch { return socket.send(JSON.stringify({ error: 'Invalid JSON Format!' })) }

        if (! this.actions[data.type])
            return socket.send(JSON.stringify({ error: 'Uknown type!' }))

        return this.actions[data.type](socket, data)
    }

    async updateLocation(socket, { driverId, latitude, longitude }) {

        if (! driverId || !latitude || !longitude)
            return socket.send(JSON.stringify({ error: 'Missing Location data!' }))

        const hash         = geohash.encode(latitude, longitude, geohash_precision)
        const locationData = JSON.stringify({ latitude, longitude })

        await client.set(`driver:${driverId}`, locationData, 30)
        await client.set(`geohash:${hash}:${driverId}`, locationData, 30)

        const riders = this.subscriptions.get(driverId) || []

        for(const riderSocket of riders) {

            if (riderSocket.readyState === WebSocket.OPEN) {

                riderSocket.send(JSON.stringify({
                    type: 'driverLocation', driverId, latitude, longitude
                }))
            }
        }

        socket.send(JSON.stringify({ type: 'locatoinStored' }))
    }

}
