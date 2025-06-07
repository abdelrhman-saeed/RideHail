import express from 'express'
import * as authController from '../controllers/authController.js'

const router = express.Router()

router.post('/:role/login', authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)

export default router
