import { Request, Response, NextFunction } from "express";
import { Dependencies } from "../dependencies";
import { Repository } from "typeorm";
import { Post } from "../entities/post";

interface Deps {
    postsRepository: Repository<Post>
}

export const newestAction = ({postsRepository}:Deps) => async (req:Request,res:Response, next:NextFunction) => {
    const posts = await postsRepository.find({ 
        take:10, 
        skip: Number(req.params.page) * 10, 
        order: {createdAt:"ASC"}
    })
    res.json(posts)
}