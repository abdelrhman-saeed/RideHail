import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import loggerMiddleware from './middlewares/logger.js'

const gatewayPort = process.env.API_GATEWAY_PORT || 3000
const app         = express()

app.use(cors())
app.use(morgan('dev'))
app.use(loggerMiddleware)

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

app.listen(gatewayPort, () => {
    console.log(`API Gateway running on port ${gatewayPort}`)
})
