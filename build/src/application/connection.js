"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./entities/user");
const post_1 = require("./entities/post");
exports.dbConnection = () => typeorm_1.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_NAME,
    type: "postgres",
    synchronize: true,
    logging: false,
    entities: [user_1.User, post_1.Post]
});
