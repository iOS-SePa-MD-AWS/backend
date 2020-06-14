"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newestAction = void 0;
exports.newestAction = ({ postsRepository }) => async (req, res, next) => {
    try {
        const page = Number(req.params.page) || 1;
        const posts = await postsRepository.find({
            take: 10,
            skip: page * 10,
            order: { createdAt: "ASC" }
        });
        res.json(posts);
    }
    catch (e) {
        next(e);
    }
};
