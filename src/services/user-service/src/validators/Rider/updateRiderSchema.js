import Joi from 'joi'

export const updateRiderSchema = Joi.object({

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
})
