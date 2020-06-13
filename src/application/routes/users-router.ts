import * as express from "express";
import { celebrate } from "celebrate";
import { signValidator, logoutValidator } from "../validators/users-validators";
import { singupAction } from "../actions/signup-action";
import { singinAction } from "../actions/signin-action";
import { logoutAction } from "../actions/logout-action";




export const createRouter = (dependencies: any) => {
    const router = express.Router();

    router.post("/signup", celebrate(signValidator), singupAction(dependencies))
    router.post("/signin", celebrate(signValidator), singinAction(dependencies))
    router.post("/logout", celebrate(logoutValidator), logoutAction(dependencies))

    return router
}