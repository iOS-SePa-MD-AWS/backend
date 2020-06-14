import { Request, Response, NextFunction } from "express";

import { User } from "../entities/user";
import { Repository } from "typeorm";

interface Deps {
    usersRepository: Repository<User>
}

export const singupAction = ({usersRepository}:Deps) => async (req:Request,res:Response, next:NextFunction) => {
    try{
        const user = await usersRepository.findOne({where: {email: req.body.email}})

        if(user){
            throw new Error("User already exists")
        }

        const newUser = User.create(req.body) 
        usersRepository.save(newUser)
        
        // await ses({recipient: newUser.email, html:`<H1>Login: ${newUser.email} Password:${newUser.password}</H1>`, title: "Thanks for registering"})
        
        res.json(newUser)
    }catch(err){
        next(err)
    }
}