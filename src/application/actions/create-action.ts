import { Request, Response, NextFunction } from "express";
import { Form } from "multiparty"
import { Post } from "../entities/post";
import { Repository } from "typeorm";
import { User } from "../entities/user";
import * as toString from "stream-to-string"

interface Deps {
    upload: any,
    postsRepository: Repository<Post>,
    usersRepository: Repository<User>
}

export const createAction = ({upload, postsRepository, usersRepository}:Deps) => (req:Request,res:Response, next:NextFunction) => {

    try{
        const form = new Form()
        const files: Promise<any>[] = []
        let comment = ""

        form.on('error', () => {
            throw new Error("Something went wrong")
        });
    
        form.on('part', async part => {
            if (!part.filename) {
                comment = await toString(part)
                part.resume();
            }
        
            if (part.filename) {
                files.push(upload(part, `${new Date().toISOString()}_${part.filename}`).catch(next))
                part.resume();
            }
        
            part.on('error', () => {
                throw new Error("Something went wrong")
            });
        });

        form.on('close', async () => {
            const [image] = await Promise.all(files)
            //@ts-ignore
            const author = await usersRepository.findOne({where:{id: req.user!.id}})
            const newPost = Post.create({comment, fileUrl: image.Location, user:author}) 

            postsRepository.save(newPost)
            delete newPost.user

            res.json(newPost)   
        });


        form.parse(req)
    }catch(err){
        next(err)
    }
}