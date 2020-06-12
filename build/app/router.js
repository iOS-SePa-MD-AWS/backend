"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express = require("express");
exports.createRouter = () => {
    const router = express.Router();
    router.use("/auth");
};
