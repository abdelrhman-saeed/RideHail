import express from 'express'
import * as riderController from '../controllers/riderController.js'


const router = express.Router()

router.get('/', riderController.getRiders)
router.get('/:id', riderController.getRider)

router.post('/', riderController.createRider)
router.put('/:id', riderController.updateRider)

export default router
