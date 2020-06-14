"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutValidator = exports.signValidator = void 0;
const celebrate_1 = require("celebrate");
exports.signValidator = {
    body: {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required()
    }
};
exports.logoutValidator = { body: {} };
