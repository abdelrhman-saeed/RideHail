
import 'dotenv/config'
import express from 'express'
import sequelize from './database/sequeilize.js'
import userRoutes from './routes/user.js'

// 
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRoutes)

await sequelize.sync()

app.listen(process.env.USER_SERVICE_PORT, () =>
    console.log(`User Service Running on port ${process.env.USER_SERVICE_PORT}`)
)