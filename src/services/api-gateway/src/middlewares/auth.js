import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

    let token = req.headers['authorization']
    token     = token && token.split(' ')[1];

    if (! token) return res.status(401).json({ error: 'Token required!' })

    try {
        req.headers['x-user'] = JSON.stringify(jwt.verify(token, process.env.JWT_SECRET))
        next()
    }
    catch (err) {
        console.error(`error: ${err}`)
        return res.status(403).json({ error: 'Invalid or expired token' })
    }
}

export default auth

