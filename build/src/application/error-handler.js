"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.celebrateToValidationError = void 0;
const celebrate_1 = require("celebrate");
const http_status_codes_1 = require("http-status-codes");
const translation_1 = require("./helpers/translation");
const isProduction = (err) => (process.env.NODE_ENV === "production" ? undefined : err.stack);
exports.celebrateToValidationError = (errors) => {
    const errorsArray = errors.joi.details.map((error) => {
        const key = error.path.join(".");
        const translationId = `validation.${error.type}`;
        return {
            [key]: new translation_1.Translation(translationId, {
                field: key,
            }),
        };
    });
    return Object.assign.apply({}, errorsArray);
};
exports.errorHandler = () => (err, req, res, 
// eslint-disable-next-line
next) => {
    const body = { ...req.body };
    delete body.password;
    console.error(JSON.stringify({
        logType: "ERROR",
        error: err,
        stack: err.innerStack || err.stack,
        url: req.baseUrl + req.url,
        body,
    }));
    if (celebrate_1.isCelebrate(err)) {
        try {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: exports.celebrateToValidationError(err),
            });
        }
        catch (e) {
            return res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).json({
                error: new translation_1.Translation("error.validation.parse"),
            });
        }
    }
    return res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).json({
        error: new translation_1.Translation("error.unknown"),
        stack: isProduction(err),
    });
};
