import { createConnection } from "typeorm";
import { User } from "./entities/user";
import { Post } from "./entities/post";

export const dbConnection = () => 
    createConnection({
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        port: Number(process.env.DB_PORT),
        name: process.env.DB_NAME,
        type: "postgres",
        synchronize: true,
        logging:false,
        entities: [User,Post]
    })