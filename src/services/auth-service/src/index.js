import 'dotenv/config'
import express from 'express'
import authRoutes from './routes/auth.js'

const app = express()

app.use(express.json())
app.use('/', authRoutes)

const PORT = process.env.AUTH_SERVICE_PORT || 3001

app.listen(PORT,
    () => console.log(`Auth Service Running on port ${PORT}`))
