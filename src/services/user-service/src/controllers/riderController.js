import db from '../models/index.js'
import { sendKafkaMessage } from '../kafka/producer.js'
import { createRiderSchema } from '../validators/Rider/createRiderSchema.js'
import { updateRiderSchema } from '../validators/Rider/updateRiderSchema.js'


const { Rider } = db;

export const getRiders = async (req, res) => {
    return res.send(await Rider.findAll())
}

export const getRider = async (req, res) => {

    const rider = await Rider.findOne({where: {id: req.params.id}})

    if (rider)
        return res.json(rider)

    return res.status(404).json({error: 'Rider Not Found!'})
}

export const createRider = async (req, res) => {

    try
    {
        const { value, error } = createRiderSchema.validate(req.body)

        if (error)
            return res.status(400).json({ error: error.details[0].message })

        const rider = await Rider.create(value)
        await sendKafkaMessage('rider_created', String(rider.id), rider)

        return res.status(201).json(rider)
    }

    catch (err)
    {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'Validation error',
                details: err.errors.map(e => e.message),
            });
        }

        res.status(500).json({ error: err.message });
    }
}

export const updateRider = async (req, res) => {

    try {
        const { value, error } = updateRiderSchema.validate(req.body)

        if (error)
            return res.status(400).json({ error: error.details[0].message })

        const rider = await Rider.update(value, { where: {id: req.params.id} })
        await sendKafkaMessage('rider_updated', String(rider.id), rider)

        return res.status(201).json({message: 'Rider updated successfully!'})
    }

    catch (err)
    {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'Validation error',
                details: err.errors.map(e => e.message),
            });
        }

        res.status(500).json({ error: err.message });
    }
}
