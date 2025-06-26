
import 'dotenv/config'
import express from 'express'
import routes from './routes/rides.js'

const app = express()

app.use(express.json())
app.use('/', routes)

const PORT = process.env.RIDE_SERVICE_PORT || 3005

app.listen(PORT,
    () => console.log(`Ride Service Running on port ${PORT}`))
