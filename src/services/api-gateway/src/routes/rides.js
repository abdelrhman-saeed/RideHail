
import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import { createServiceProxy } from '../proxy.js'

const router = express.Router()
router.use('/', authMiddleware, createServiceProxy(process.env.RIDE_SERVICE_URL, 'rides'))

export default router
