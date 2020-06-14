import { Joi } from "celebrate";

export const createValidator = {
    body: {
        comment: Joi.string().max(1000).required(),
        image: Joi.any().required()
    }
}

export const newestValidator = { body: {} }