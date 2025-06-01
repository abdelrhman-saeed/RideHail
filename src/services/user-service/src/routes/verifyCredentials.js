import express from 'express'
import * as verifyUserController from '../controllers/verifyUserController.js'

const router = express.Router()
router.post('/:role(rider|driver)', verifyUserController.verifyCredentials)

export default router
