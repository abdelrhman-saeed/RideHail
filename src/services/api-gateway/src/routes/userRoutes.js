import express from 'express'
import { createServiceProxy } from '../proxy.js'

const router = express.Router()
router.use('/', createServiceProxy(process.env.USER_SERVICE_URL, 'users'))

export default router
