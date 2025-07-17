
import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import { createServiceProxy } from '../proxy.js'

const router = express.Router()
router.use('/', createServiceProxy(process.env.LOCATION_SERVICE_URL, 'location'))

export default router










//router.use('/', authMiddleware, createServiceProxy(process.env.LOCATION_SERVICE_URL, 'location'))
