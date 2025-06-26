import Joi      from 'joi'
import axios    from 'axios'
import { error } from 'node:console';


const updateRideSchema = Joi.object({

    pickup_latitude:   Joi.number().min(-90).max(90),
    pickup_longitude:  Joi.number().min(-90).max(90),
    dropoff_latitude:  Joi.number().min(-90).max(90),
    dropoff_longitude: Joi.number().min(-90).max(90),
    status:            Joi.string().valid('CANCELED', 'COMPLETED', 'ASSIGNED', 'REQUESTED', 'IN_TRANSIT'),
    driver_id:         Joi.number()
    .when('status', { is: 'ASSIGNED', then: Joi.required(), otherwise: Joi.forbidden() })
})
.external(async (value, helpers) => {

    if (value.status !== 'ASSIGNED') return;

    try {
        await axios.get(`${process.env.USER_SERVICE_URL}/drivers/${value.driver_id}`)
    }
    catch (error) {
        if (error.response?.status === 404) {
            // return helpers.error('any.invalid')
            throw new Error('Driver not found!')
        }
    }

});

export default updateRideSchema;
