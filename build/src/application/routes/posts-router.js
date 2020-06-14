"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express = require("express");
const celebrate_1 = require("celebrate");
const posts_validators_1 = require("../validators/posts-validators");
const newest_action_1 = require("./../actions/newest-action");
const create_action_1 = require("./../actions/create-action");
exports.createRouter = (dependencies) => {
    const router = express.Router();
    router.get("/newest", celebrate_1.celebrate(posts_validators_1.newestValidator), newest_action_1.newestAction({ postsRepository: dependencies.postsRepository }));
    router.post("/create", dependencies.auth.authenticate, create_action_1.createAction({
        postsRepository: dependencies.postsRepository,
        usersRepository: dependencies.usersRepository,
        upload: dependencies.s3
    }));
    return router;
};
