import { Joi } from "celebrate";

export const signValidator = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}

export const logoutValidator = { body: {} }

export const changePasswordValidator = { 
    body: {
        password: Joi.string().required(),
        reset_password: Joi.string().required(),
    } 
}