import db from '../models/index.js'
import { sendKafkaMessage } from '../kafka/producer.js'
import { createDriverSchema } from '../validators/Driver/createDriverSchema.js'
import { updateDriverSchema } from '../validators/Driver/updateDriverSchema.js'


const { Driver } = db;

// get all drivers
export const getDrivers = async (req, res) => {
    return res.send(await Driver.findAll())
}

// show driver
export const getDriver = async (req, res) => {

    const driver = await Driver.findByPk(req.params.id)

    if (driver)
        return res.json(driver)

    return res.status(404).json({ error: 'Not found!' })
}

// register
export const createDriver = async (req, res) => {

    try {
        const { value, error } = createDriverSchema.validate(req.body)

        if (error)
            return res.status(400).json({ error: error.details[0].message })

        const driver = await Driver.create(value)
        await sendKafkaMessage('driver_created', String(driver.id), driver)

        return res.status(201).json(driver)
    }

    catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {

            return res.status(400).json({
                error: 'Validation error',
                details: err.errors.map(e => e.message),
            });
        }

        res.status(500).json({ error: err.message });
    }
}

// update a driver
export const updateDriver = async (req, res) => {

    try {

        const { value, error } = updateDriverSchema.validate(req.body)

        if (error)
            return res.status(400).json({ error: error.details[0].message })

        const driver = Driver.update(value, { where: { id: req.params.id } })
        await sendKafkaMessage('driver_updated', String(driver.id), driver)

        return res.send('Driver Updated Successfully!')
    }

    catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {

            return res.status(400).json({
                error: 'Validation error',
                details: err.errors.map(e => e.message),
            });
        }

        res.status(500).json({ error: err.message });
    }
}

