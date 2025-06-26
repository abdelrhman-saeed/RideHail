
import 'dotenv/config'

import cors     from 'cors'
import morgan   from 'morgan'
import express  from 'express'
import auth     from './routes/auth.js'
import users    from './routes/users.js'
import rides    from './routes/rides.js'

import loggerMiddleware from './middlewares/logger.js'


const gatewayPort = process.env.API_GATEWAY_PORT || 3000
const app         = express()

app.use(cors())
app.use(morgan('dev'))
app.use(loggerMiddleware)

app.use('/auth', auth)
app.use('/users', users)
app.use('/rides', rides)

app.listen(gatewayPort, () => {
    console.log(`API Gateway running on port ${gatewayPort}`)
})
