import db from '../models/index.js'
import { createUserSchema } from '../validators/createUserSchema.js'
import { sendKafkaMessage } from '../kafka/producer.js'


const {User, Driver} = db;

export const createUser = async (req, res) => {
    
    try {

        const { value: userData, error: userErrors } = createUserSchema.validate(req.body)

        if (userErrors)
            return res.status(400).json({ error: userErrors.details[0].message })

        const user = await User.create(userData)

        if (userData['userType'] == 'rider')
            return res.status(201).json(user)

        const driver = await Driver.create({...userData.driver, userId: user.id})

        await sendKafkaMessage('user_created', String(user.id), user)

        return res.status(201).json( {user: {...user.get({plain: true}), driver: driver.get({plain: true})} } )

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


export const getUser = async (req, res) => {
    
    const user = await User.findByPk(req.params.id)

    if (user) return res.json(user)

    return res.status(404).json({ error: 'Not found!' })

}