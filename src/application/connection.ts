import { Connection, createConnection } from "typeorm";
import { User } from "./entities/user";
import { Post } from "./entities/post";

export const dbConnection = (): Promise<Connection> => 
    createConnection({
        database: "app",
        password: "app",
        host: "db",
        username: "app",
        type: 'postgres',
        synchronize: true,
        port:5432,
        logging:false,
        entities: [User,Post]
    })
