import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user";
import { Auth } from "../services/authentication-service";

interface Deps {
    usersRepository: Repository<User>,
    auth: Auth,
}

export const singinAction = ({usersRepository,auth}:Deps) => async (req:Request,res:Response, next:NextFunction) => {
    try {
        const user = await usersRepository.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })

        if(!user){
            throw new Error("Invalid login or password")
        }

        delete user.password
        const token = auth.createToken(user)
        res.json({token})
    } catch (err){
        next(err)
    }
}