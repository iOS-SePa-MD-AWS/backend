import { Connection, createConnection } from "typeorm";
import { User } from "./entities/user";
import { Post } from "./entities/post";

export const dbConnection = (): Promise<Connection> => 
    createConnection({
        url: process.env.CONNETCION_STRING || "postgres://app:app@localhost:5432/app",
        type: "postgres",
        synchronize: true,
        logging:false,
        entities: [User,Post]
    })