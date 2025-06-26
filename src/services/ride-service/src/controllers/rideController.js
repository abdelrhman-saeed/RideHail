
import db from '../models/index.js'
import { sendKafkaMessage } from '../kafka/producer.js'
import createRideSchema from '../validators/ride/createRideSchema.js'
import updateRideSchema from '../validators/ride/updateRideSchema.js'
import checkStatus from '../models/rideStatus/checkStatus.js'


/** @type{{Ride: import('../models/Ride.js'), RideUpdates: import('../models/RideUpdates.js')}} */
const { Ride, RideUpdates } = db


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const show = async (req, res) => res.json(await Ride.findByPk(req.params.id))


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const create = async (req, res) => {


    const { value, error } = createRideSchema.validate(req.body)

    if (error)
        return res.status(400).json({ error: error.details[0].message })

    try {

        const user = JSON.parse(req.headers['x-user'] || '{}')

        if (! user.id)
            return res.status(401).json({error: 'No User!'})

        value.rider_id = user.id
        const ride     = await Ride.create(value)

        await RideUpdates.create({ ride_id: ride.id, status:  'REQUESTED' })
        await sendKafkaMessage('ride.created', String(ride.id), ride)

        return res.status(201).json(ride)
    }

    catch(thrown) {
        return res.status(500).json({error: thrown.message})
    }

}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const update = async (req, res) => {

    try {

        const value = await updateRideSchema.validateAsync(req.body)
        const ride  = await Ride.findByPk(req.params.id)

        if (value.status) {

            checkStatus(ride.status, value.status)
            await RideUpdates.create({ status: value.status, ride_id: ride.id })
        }

        ride.update(value)

        await sendKafkaMessage('ride.updated', String(ride.id), ride)
        return res.status(201).json({message: 'Updated Succussfully!'})
    }

    catch(thrown) {
        return res.status(500).json({error: thrown.message})
    }

}