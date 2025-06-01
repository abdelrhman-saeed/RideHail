import axios    from 'axios'
import jwt      from 'jwtwebtoken'
import bcrypt   from 'bcrypt'

const JWT_SECRET        = process.env.JWT_SECRET
const JWT_EXPIRES_IN    = process.env.JWT_EXPIRES_IN || '1d'
const USER_SERVICE_URL  = process.env.USER_SERVICE_URL

export const login = async () => {

    const { email, password } = req.body

    if ( ! email || ! password )
        return res.status(400).json({error: 'Email and password are required!'})

    try
    {
        const response  = await axios.get(`${USER_SERVICE_URL}/users/${email}`)
        const user      = response.data

        if (! user) return res.status(404).json({
            error: `${capitalize(req.params.role)} not found!`
        })

        if (! await bcrypt.compare(password, user.passwordHash))
            return res.status(401).json({error: 'Invalid credentails!'})

        const token = jwt.sign(
            { id: user.id, email: user.email, userType: req.params.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        )

        return res.status(200).json({ token })
    }

    catch (err)
    {
        if (err.response?.status === 404)
            return res.status(404).json({ error: `${capitalize(req.params.role)} not found!` })

        console.error('Login error: ', err.mesasge)
        return res.status(500).json({ error: 'Internal server error!' })
    }
}
