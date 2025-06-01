import bcrypt from 'bcryptjs'
import db from '../models/index.js'

const { Rider, Driver } = db

export const verifyCredentials = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ error: 'Email and password are required!' })

    try {

        const user = await (req.params.role == 'rider' ? Rider : Driver)
            .findOne({
                where: { email },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

        if (!user || !await bcrypt.compare(password, user.passwordHash))
            return res.status(401).json({ error: 'Invalid credentails!' })

        return res.json(user)
    }
    catch (err) {
        console.error(`Verify Credentails Error: ${err.message}`)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}
