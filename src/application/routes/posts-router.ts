import * as express from "express";
import { celebrate } from "celebrate"
import { newestValidator, createValidator } from "../validators/posts-validators";
import { newestAction } from "./../actions/newest-action"
import { createAction } from "./../actions/create-action"

export const createRouter = (dependencies: any) => {
    const router = express.Router();

    router.post("/newest", celebrate(newestValidator), newestAction(dependencies))
    router.post("/create", celebrate(createValidator), createAction(dependencies))
    
    return router
}