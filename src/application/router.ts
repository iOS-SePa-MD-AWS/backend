import * as express from "express";
import * as usersRouting from "./routes/users-router"
import * as postsRouting from "./routes/posts-router"
import { Dependencies } from "./dependencies";


export const createRouter = (dependencies: Partial<Dependencies>) => {
    const router = express.Router();

    router.use("/users", usersRouting.createRouter(dependencies))
    router.use("/posts", postsRouting.createRouter(dependencies))

    return router
}