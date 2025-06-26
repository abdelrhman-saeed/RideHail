import Joi from 'joi'


const createRideSchema = Joi.object({
    pickup_latitude:   Joi.number().min(-90).max(90).required(),
    pickup_longitude:  Joi.number().min(-90).max(90).required(),
    dropoff_latitude:  Joi.number().min(-90).max(90).required(),
    dropoff_longitude: Joi.number().min(-90).max(90).required(),
})

export default createRideSchema
