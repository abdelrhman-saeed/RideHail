import express from 'express'
import * as driverController from '../controllers/driverController.js'


const router = express.Router()

router.get('/', driverController.getDrivers)
router.get('/:id', driverController.getDriver)

router.post('/', driverController.createDriver)
router.put('/:id', driverController.updateDriver)

export default router
