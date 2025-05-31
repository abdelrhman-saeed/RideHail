import db from '../models/index.js'
import { sendKafkaMessage } from '../kafka/producer.js'
import { createUserSchema } from '../validators/createRiderSchema.js'


const { Rider } = db;

export const createRider = async (req, res) => {

    try {
        const { value: riderData, validationError } = createUserSchema.validate(req.body)

        if (validationError)
            return res.status(400).json({ error: validationError.details[0].message })

        const rider = await Rider.create(riderData)


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


export const getRider = async (req, res) => {
    const rider = await Rider.findByPk(req.params.id)

    if (rider)
        return res.json(rider)

    return res.status(404).json({ error: 'Not found!' })
}