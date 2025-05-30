import Joi from 'joi'

export const createUserSchema = Joi.object({

        name: Joi
                .string()
                .min(3)
                .max(50)
                .required(),

        email: Joi
                .string()
                .email()
                .required(),

        passwordHash: Joi
                .string()
                .min(6)
                .required(),

        phoneNumber: Joi
                .string()
                .min(10)
                .required(),

        userType: Joi
                .string()
                .valid('rider', 'driver'),

        driver: Joi
                .object({
                        vehicleMake: Joi.string().required(),
                        vehicleModel: Joi.string().required(),
                        licensePlate: Joi.string() .required(),
                        status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE')
                })
                .when('userType', {
                        is: 'driver',
                        then: Joi.required(),
                        otherwise: Joi.forbidden()
                })
})