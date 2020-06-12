"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router_1 = require("./router");
exports.app = () => {
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.get("/health", (req, res) => {
        res.status(200).json({ status: "200 - ok" });
    });
    app.use("api", router_1.createRouter);
    return app;
};
