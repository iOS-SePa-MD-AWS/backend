"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app/app");
(async () => {
    const port = process.env.APP_PORT || 3000;
    const server = http.createServer(app_1.app);
    server.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
})();
