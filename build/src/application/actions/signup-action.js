"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singupAction = void 0;
const user_1 = require("../entities/user");
exports.singupAction = ({ usersRepository }) => async (req, res, next) => {
    try {
        const user = await usersRepository.findOne({ where: { email: req.body.email } });
        if (user) {
            throw new Error("User already exists");
        }
        const newUser = user_1.User.create(req.body);
        usersRepository.save(newUser);
        // await ses({recipient: newUser.email, html:`<H1>Login: ${newUser.email} Password:${newUser.password}</H1>`, title: "Thanks for registering"})
        res.json(newUser);
    }
    catch (err) {
        next(err);
    }
};
