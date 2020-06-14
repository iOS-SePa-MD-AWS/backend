import { User } from "./entities/user"
import { Post } from "./entities/post"
import { dbConnection } from "./connection"
import { SESService, upload } from "./services/amazon-service"
import { createAuth, Auth } from "./services/authentication-service"
import { Repository } from "typeorm"
// import { S3, SES } from "aws-sdk"

export interface Dependencies {
    usersRepository: Repository<User>,
    postsRepository: Repository<Post>,
    s3: any,
    ses: any,
    auth: Auth
}

export const getDependencies = async () => {
    const db = await dbConnection()

    const usersRepository = db.getRepository(User)
    const postsRepository = db.getRepository(Post)
    const s3 = upload
    const ses = SESService()

    return {
        usersRepository,
        postsRepository,
        s3,
        ses,
        auth: createAuth(usersRepository)
    }
}