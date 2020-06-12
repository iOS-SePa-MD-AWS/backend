
import {Entity, PrimaryGeneratedColumn, Column, Repository, OneToMany} from "typeorm";
import { Post } from "./post";

@Entity()
export class User extends Repository<User> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    email: string

    @Column({nullable: false})
    password: string;
    
    @OneToMany(type => Post, post => post.user)
    posts: Post[]
}