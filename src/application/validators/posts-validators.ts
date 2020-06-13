import { Joi } from "celebrate";

export const createValidator = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}

export const newestValidator = { body: {} }