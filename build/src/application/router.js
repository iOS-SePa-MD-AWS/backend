"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express = require("express");
const usersRouting = require("./routes/users-router");
const postsRouting = require("./routes/posts-router");
exports.createRouter = (dependencies) => {
    const router = express.Router();
    router.use("/users", usersRouting.createRouter(dependencies));
    router.use("/posts", postsRouting.createRouter(dependencies));
    return router;
};
