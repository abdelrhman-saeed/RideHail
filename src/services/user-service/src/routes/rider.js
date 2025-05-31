import express from 'express'
import * as riderController from '../controllers/riderController.js'


const router = express.Router()

router.post('/', riderController.createRider)
router.get('/:id', riderController.getRider)

export default router