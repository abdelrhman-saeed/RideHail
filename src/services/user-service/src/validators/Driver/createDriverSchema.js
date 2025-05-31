import Joi from 'joi'

export const createDriverSchema = Joi.object({

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

        licensePlate: Joi
                .string()
                .required(),

        vehicleMake: Joi
                .string()
                .required(),

        vehicleModel: Joi
                .string()
                .required(),

        status: Joi
                .string()
                .valid('AVAILABLE', 'UNAVAILABLE')
                .required()
})
