"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newestValidator = exports.createValidator = void 0;
const celebrate_1 = require("celebrate");
exports.createValidator = {
    body: {
        comment: celebrate_1.Joi.string().max(1000).required(),
        image: celebrate_1.Joi.any().required()
    }
};
exports.newestValidator = { body: {} };
