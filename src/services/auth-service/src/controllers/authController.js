import axios from 'axios'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import memjs from 'memjs'

/**
 * access token
 */
const JWT_SECRET     = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'

/**
 * refresh token
 */
const JWT_REFRESH_SECRET     = process.env.JWT_SECRET
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

/**
 * memcached
 */
const MEMCACHED_HOST = process.env.MEMCACHED_HOST
const MEMCACHED_PORT = process.env.MEMCACHED_PORT
const memcached      = memjs.Client.create(`${MEMCACHED_HOST}:${MEMCACHED_PORT}`)

/**
 * user-service
*/
const FETCH_USER_ENDPOINT = process.env.FETCH_USER_ENDPOINT


export const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ error: 'Email and password are required!' })

    try {

        const response = await axios.post(`${FETCH_USER_ENDPOINT}/${req.params.role}`, {email, password})
        const user     = response.data

        if (!user) return res.status(404).json({
            error: `${capitalize(req.params.role)} not found!`
        })

        if (! await bcrypt.compare(password, user.passwordHash))
            return res.status(401).json({ error: 'Invalid credentails!' })

        const accessToken = jwt.sign(
            { id:        user.id, email: user.email, userType: req.params.role }, JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        )

        const refreshToken = jwt.sign(
            { id:        user.id, email: user.email, userType: req.params.role }, JWT_REFRESH_SECRET,
            { expiresIn: JWT_REFRESH_EXPIRES_IN }
        )

        await memcached.set(
            `refresh_token:${refreshToken}`, user.id.toString(), { expires: 60 * 60 * 24 * 7 }
        )

        return res.status(200).json({ accessToken, refreshToken })
    }

    catch (err)
    {
        if (err.response?.status === 404)
            return res.status(404).json({ error: `${capitalize(req.params.role)} not found!` })

        return res.status(500).json({ error: `Internal server error!` })
    }
}

export const refresh = async (req, res) => {

    let refreshToken = req.body.refreshToken

    if (!refreshToken)
        return res.status(400).json({ message: 'Refresh Token Required!' })

    try {

        const storedToken = await memcached.get(`refresh_token:${refreshToken}`)

        if (!storedToken?.value)
            return res.status(403).json({ message: 'Invalid or expired refresh token' })

        const user = jwt.verify(refreshToken, JWT_REFRESH_SECRET)

        memcached.delete(`refresh_token:${refreshToken}`)

        const accessToken = jwt.sign(user, JWT_SECRET)
        refreshToken      = jwt.sign(user, JWT_REFRESH_SECRET)

        await memcached.set(
            `refresh_token:${refreshToken}`, user.id.toString(), { expires: 60 * 60 * 24 * 7 }
        )

        return res.json({ accessToken, refreshToken })
    }

    catch (err) {
        res.status(403).json({ message: 'Token expired or invalid' })
    }

}

export const logout = async (req, res) => {

    const refreshToken = req.body.refreshToken

    if (!refreshToken)
        return res.status(400).json({ message: 'Refresh Token Required!' })

    await memcached.delete(`refresh_token:${refreshToken}`)

    return res.json({ mesage: 'Logged out Successfully!' })
}

