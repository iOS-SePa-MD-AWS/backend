import * as express from "express";
import { celebrate } from "celebrate"
import { newestValidator } from "../validators/posts-validators";
import { newestAction } from "./../actions/newest-action"
import { createAction } from "./../actions/create-action"
import { Dependencies } from "../dependencies";
import { myPostsAction } from "../actions/my-posts-action";

export const createRouter = (dependencies: Partial<Dependencies>) => {
    const router = express.Router();

    router.get("/newest", celebrate(newestValidator), newestAction({postsRepository: dependencies.postsRepository!}))
    router.get("/my-posts", celebrate(newestValidator), dependencies.auth!.authenticate, myPostsAction({postsRepository: dependencies.postsRepository!}))

    router.post("/create", dependencies.auth!.authenticate, createAction({ 
        postsRepository: dependencies.postsRepository!,
        usersRepository: dependencies.usersRepository!,
        upload: dependencies.s3!
    }))


    return router
}