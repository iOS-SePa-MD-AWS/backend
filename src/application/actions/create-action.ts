import { Request, Response, NextFunction } from "express";
import { Form } from "multiparty"
import { Post } from "../entities/post";
import { Repository } from "typeorm";

interface Deps {
    upload: any,
    postsRepository: Repository<Post>
}

export const createAction = ({upload, postsRepository}:Deps) => (req:Request,res:Response, next:NextFunction) => {

    try{
        const form = new Form()
        let url = ""
        let comment = ""
        const commentChunks:any[] = []
        const files: Promise<any>[] = []

        
        form.on('error', () => {
            throw new Error("Something went wrong")
        });
    
        form.on('part', part => {
            if (!part.filename) {
                commentChunks.push(part)
                part.resume();
            }
        
            if (part.filename) {
                files.push(upload(part, part.filename).catch(next))
                part.resume();
            }
        
            part.on('error', () => {
                throw new Error("Something went wrong")
            });
        });

        form.on('close', async () => {
            // comment = Buffer.concat(commentChunks).toString('utf8')
            const xd = await Promise.all(files)
        });

        // const newPost = Post.create({comment, fileUrl: url}) 
        // postsRepository.save(newPost)

        // res.json(newPost)
        form.parse(req)
    }catch(err){
        next(err)
    }
}