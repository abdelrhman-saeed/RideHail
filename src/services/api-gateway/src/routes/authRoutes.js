import express from 'express'
import { createServiceProxy } from '../proxy.js'

const router = express.Router()

router.use('/', createServiceProxy(process.env.AUTH_SERVICE_URL, 'auth'))

export default router
