"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = void 0;
const multiparty_1 = require("multiparty");
const post_1 = require("../entities/post");
const toString = require("stream-to-string");
exports.createAction = ({ upload, postsRepository, usersRepository }) => (req, res, next) => {
    try {
        const form = new multiparty_1.Form();
        const files = [];
        let comment = "";
        form.on('error', () => {
            throw new Error("Something went wrong");
        });
        form.on('part', async (part) => {
            if (!part.filename) {
                comment = await toString(part);
                part.resume();
            }
            if (part.filename) {
                files.push(upload(part, `${new Date().toISOString()}_${part.filename}`).catch(next));
                part.resume();
            }
            part.on('error', () => {
                throw new Error("Something went wrong");
            });
        });
        form.on('close', async () => {
            const [image] = await Promise.all(files);
            //@ts-ignore
            const author = await usersRepository.findOne({ where: { id: req.user.id } });
            const newPost = post_1.Post.create({ comment, fileUrl: image.Location, user: author });
            postsRepository.save(newPost);
            delete newPost.user;
            res.json(newPost);
        });
        form.parse(req);
    }
    catch (err) {
        next(err);
    }
};
