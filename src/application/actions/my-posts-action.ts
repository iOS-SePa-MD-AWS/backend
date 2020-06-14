import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Post } from "../entities/post";
import { User } from "../entities/user";

interface Deps {
    postsRepository: Repository<Post>
}

export const myPostsAction = ({postsRepository}:Deps) => async (req:Request,res:Response, next:NextFunction) => {
    try{
        //@ts-ignore
        const { id } = req.user!
        const page = Number(req.params.page) || 0
        
        const posts = await postsRepository.find({ 
            relations: ["user"],
            take: 10, 
            skip: page * 10, 
            order: { createdAt:"ASC" },
            where: { user: { id } }
        })

        res.json(posts)
    } catch (e) {
        next(e)
    }
}