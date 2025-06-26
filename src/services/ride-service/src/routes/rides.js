import express from 'express'
import * as riderController from '../controllers/rideController.js'

const router = express.Router()

router.post('/', riderController.create)
router.get('/:id', riderController.show)
router.put('/:id', riderController.update)

export default router
