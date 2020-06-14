import * as express from "express";
import { celebrate } from "celebrate";
import { signValidator, logoutValidator, changePasswordValidator } from "../validators/users-validators";
import { singupAction } from "../actions/signup-action";
import { singinAction } from "../actions/signin-action";
import { logoutAction } from "../actions/logout-action";
import { Dependencies } from "../dependencies";
import { changePasswordActions } from "../actions/change-password-action";

export const createRouter = (dependencies: Partial<Dependencies>) => {
    const router = express.Router();

    router.post("/signup", celebrate(signValidator), singupAction({usersRepository: dependencies.usersRepository!}))
    router.post("/signin", celebrate(signValidator), singinAction({
        usersRepository: dependencies.usersRepository!,
        auth: dependencies.auth!
    }))
    router.put("/change-password",celebrate(changePasswordValidator), dependencies.auth!.authenticate, changePasswordActions({usersRepository: dependencies.usersRepository!}))
    router.post("/logout", celebrate(logoutValidator), dependencies.auth!.authenticate, logoutAction(dependencies))


    return router
}