
import geohash from 'ngeohash'
import client from "../memcached.js"


export const getNearbyDrivers = async (req, res) => {

    const { latitude, longitude } = req.body

    if (! latitude || ! longitude)
        return res.status(401).json({ error: 'rider\'s coordinates are required !'})

    const hash = geohash.encode(latitude, longitude)
    const area = [hash, ...geohash.neighbor(hash)]

    let drivers = []

    for(const hashedNeighboor of area) {

        const keys     = await client.stats()
        const matches  = Object
            .keys(keys[0])
            .filter(k => k.includes(`geohash:${hashedNeighboor}`))

        for(const key of matches)
        {
            const result = await client.get(key)

            if (result?.value) drivers.push(JSON.parse(result.value.toString()))
        }
    }

    return res.json({drivers})
}
