
import "dotenv/config"
import http from 'http'
import express from "express";
import LocationManager from "./sockets/locationManager.js";
import * as LocationController from './controllers/locationController.js'
import producer from "./kafka/producer.js";


const app    = express()
const server = http.createServer(app)
const port   = process.env.LOCATION_SERVICE_PORT || 3006

app.use(express.json())


app.get('/', (_, res) => res.send('Locatoin Service OK'))
app.get('/log', () => producer.send({topic: 'logs', messages: [{value: 'topic-01'}]}))


app.get('/nearby', LocationController.getNearbyDrivers)



server.listen(port,
    () => console.log(`Location Service running on port ${port}`))

const lmanager = new LocationManager(server)
lmanager.start()
