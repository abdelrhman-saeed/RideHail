import Joi from 'joi'

export const updateDriverSchema = Joi.object({

        name: Joi
                .string()
                .min(3)
                .max(50),

        email: Joi
                .string()
                .email(),

        phoneNumber: Joi
                .string()
                .min(10),

        vehicleMake: Joi
                .string(),

        vehicleModel: Joi
                .string(),

        licensePlate: Joi
                .string()
                .required(),

        status: Joi
                .string()
                .valid('AVAILABLE', 'UNAVAILABLE')
})
