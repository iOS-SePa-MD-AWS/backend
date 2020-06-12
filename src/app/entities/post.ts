
import {Entity, PrimaryGeneratedColumn, Column, Repository, ManyToOne} from "typeorm";
import { User } from "./user";

@Entity()
export class Post extends Repository<Post> {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type=> User, user=>user.posts)
    user: User;

    @Column({nullable: false})
    password: string;
}