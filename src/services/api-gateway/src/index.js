import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createProxyMiddleware } from "http-proxy-middleware";
import { createServiceProxy } from './proxy.js'

// import loggerMiddleware from './middlewares/logger.js'
//import authRoutes from './routes/authRoutes.js'
//import userRoutes from './routes/userRoutes.js'

const gatewayPort = process.env.API_GATEWAY_PORT || 3000
const app         = express()

app.use(morgan('dev'))
app.use(cors())

// app.use(loggerMiddleware)

//app.use('/auth', authRoutes)
//app.use('/users', userRoutes)

app.use('/auth', createServiceProxy('http://auth-service:3001', 'auth'))
app.use('/users', createServiceProxy('http://user-service:3004', 'users'))

app.listen(gatewayPort, () => {
    console.log(`API Gateway running on port ${gatewayPort}`)
})
