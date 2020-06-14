"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router_1 = require("./application/router");
const error_handler_1 = require("./application/error-handler");
const dependencies_1 = require("./application/dependencies");
exports.app = async () => {
    const app = express();
    const deps = await dependencies_1.getDependencies();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.get("/health", (req, res) => {
        res.status(200).json({ status: "200 - ok" });
    });
    app.use("/api", router_1.createRouter(deps));
    app.all("*", (req, res) => { res.status(404).json({ status: "404 - not found" }); });
    app.use(error_handler_1.errorHandler());
    return app;
};
