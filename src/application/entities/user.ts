import { Entity, Column, Repository, OneToMany, PrimaryColumn } from "typeorm";
import { Post } from "./post";
import { v4 } from "uuid"

@Entity()
export class User extends Repository<User> {
    public static create(user:Partial<User>){
        const entity = new User()
        Object.assign(entity, user)
        return entity
    }

    @PrimaryColumn("uuid", {default: v4()})
    id: string;

    @Column({nullable:false})
    email: string

    @Column({nullable: false})
    password: string;
    
    @OneToMany(type => Post, post => post.user)
    posts: Post[]
}