
import { Entity, Column, Repository, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";


@Entity()
export class Post extends Repository<Post> {
    public static create(post:Partial<Post>){
        const entity = new Post()
        Object.assign(entity, post)
        return entity
    }

    @PrimaryColumn("uuid")
    id: number;

    @ManyToOne(type=> User, user=>user.posts)
    user: User;

    @Column()
    fileUrl: string;

    @Column({length:1000})
    comment: string

    @Column()
    createdAt: Date;
}