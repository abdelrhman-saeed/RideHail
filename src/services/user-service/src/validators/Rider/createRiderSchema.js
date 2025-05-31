import Joi from 'joi'

export const createRiderSchema = Joi.object({

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
                .required()
})