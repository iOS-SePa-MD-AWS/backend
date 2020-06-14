"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express = require("express");
const celebrate_1 = require("celebrate");
const users_validators_1 = require("../validators/users-validators");
const signup_action_1 = require("../actions/signup-action");
const signin_action_1 = require("../actions/signin-action");
const logout_action_1 = require("../actions/logout-action");
exports.createRouter = (dependencies) => {
    const router = express.Router();
    router.post("/signup", celebrate_1.celebrate(users_validators_1.signValidator), signup_action_1.singupAction({ usersRepository: dependencies.usersRepository }));
    router.post("/signin", celebrate_1.celebrate(users_validators_1.signValidator), signin_action_1.singinAction({
        usersRepository: dependencies.usersRepository,
        auth: dependencies.auth
    }));
    router.post("/logout", celebrate_1.celebrate(users_validators_1.logoutValidator), dependencies.auth.authenticate, logout_action_1.logoutAction(dependencies));
    return router;
};
