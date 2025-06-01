
import 'dotenv/config'
import express from 'express'
import sequelize from './database/sequeilize.js'
import driverRoutes from './routes/driver.js'
import riderRoutes from './routes/rider.js'
import verificationRoutes from './routes/verifyCredentials.js'

// 
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/riders', riderRoutes)
app.use('/drivers', driverRoutes)
app.use('/verify-credentials', verificationRoutes)


await sequelize.sync()

app.listen(process.env.USER_SERVICE_PORT, () =>
    console.log(`User Service Running on port ${process.env.USER_SERVICE_PORT}`)
)
