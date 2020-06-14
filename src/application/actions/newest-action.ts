import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Post } from "../entities/post";
import { User } from "../entities/user";

interface Deps {
    postsRepository: Repository<Post>
}

export const newestAction = ({postsRepository}:Deps) => async (req:Request,res:Response, next:NextFunction) => {
    try{
        const page = Number(req.params.page) || 1

        const posts = await postsRepository.find({ 
            take: 10, 
            skip: page * 10, 
            order: { createdAt:"ASC" }
        })
        res.json(posts)
    } catch (e) {
        next(e)
    }
}