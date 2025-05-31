import db from '../models/index.js'
import { sendKafkaMessage } from '../kafka/producer.js'
import { createDriverSchema } from '../validators/createDriverSchema.js'


const { Driver } = db;

export const createDriver = async (req, res) => {

    try {
        const { value: driverData, validationError } = createDriverSchema.validate(req.body)

        if (validationError)
            return res.status(400).json({ error: validationError.details[0].message })

        const driver = await Driver.create(driverData)


        await sendKafkaMessage('driver_created', String(driver.id), driver)

        return res.status(201).json(driver)
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


export const getDriver = async (req, res) => {

    const driver = await Driver.findByPk(req.params.id)

    if (driver)
        return res.json(driver)

    return res.status(404).json({ error: 'Not found!' })
}