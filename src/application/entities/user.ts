
import { Entity, Column, Repository, OneToMany, PrimaryColumn } from "typeorm";
import { Post } from "./post";

@Entity()
export class User extends Repository<User> {
    public static create(user:Partial<User>){
        const entity = new User()
        Object.assign(entity, user)
        return entity
    }

    @PrimaryColumn("uuid")
    id: number;

    @Column({nullable:false})
    email: string

    @Column({nullable: false})
    password: string;
    
    @OneToMany(type => Post, post => post.user)
    posts: Post[]
}