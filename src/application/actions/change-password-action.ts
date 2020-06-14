import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user";

interface Deps {
    usersRepository: Repository<User>
}

export const changePasswordActions = ({usersRepository}:Deps) => async (req:Request,res:Response, next:NextFunction) => {
    try {
        //@ts-ignore
        const { id } = req.user
        if(req.body.password !== req.body.reset_password || !id){
            throw new Error("Passwords does not match")
        }
    
        await usersRepository.createQueryBuilder()
            .update()
            .set({password: req.body.password})
            .where({id})
            .execute()

        
        res.status(204).send()
    } catch(err) {
        next(err)
    }
}