"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Post_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const uuid_1 = require("uuid");
let Post = Post_1 = class Post extends typeorm_1.Repository {
    static create(post) {
        const entity = new Post_1();
        const createdAt = new Date();
        const id = uuid_1.v4();
        Object.assign(entity, { ...post, createdAt, id });
        return entity;
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid", { default: uuid_1.v4() }),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_1.User, user => user.posts),
    __metadata("design:type", user_1.User)
], Post.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Post.prototype, "fileUrl", void 0);
__decorate([
    typeorm_1.Column({ length: 1000, nullable: false }),
    __metadata("design:type", String)
], Post.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
Post = Post_1 = __decorate([
    typeorm_1.Entity()
], Post);
exports.Post = Post;
