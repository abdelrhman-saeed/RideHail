import express from 'express'
import * as driverController from '../controllers/driverController.js'


const router = express.Router()

router.post('/', driverController.createDriver)
router.get('/:id', driverController.getDriver)

export default router