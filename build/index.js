"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const dotenv = require("dotenv");
dotenv.config();
(async () => {
    const port = process.env.APP_PORT || 3000;
    const server = await app_1.app();
    server.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
})();
