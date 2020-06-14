"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependencies = void 0;
const user_1 = require("./entities/user");
const post_1 = require("./entities/post");
const connection_1 = require("./connection");
const amazon_service_1 = require("./services/amazon-service");
const authentication_service_1 = require("./services/authentication-service");
exports.getDependencies = async () => {
    const db = await connection_1.dbConnection();
    const usersRepository = db.getRepository(user_1.User);
    const postsRepository = db.getRepository(post_1.Post);
    const s3 = amazon_service_1.upload;
    const ses = amazon_service_1.SESService();
    return {
        usersRepository,
        postsRepository,
        s3,
        ses,
        auth: authentication_service_1.createAuth(usersRepository)
    };
};
