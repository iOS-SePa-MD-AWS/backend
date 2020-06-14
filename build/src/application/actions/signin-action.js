"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singinAction = void 0;
exports.singinAction = ({ usersRepository, auth }) => async (req, res, next) => {
    try {
        const user = await usersRepository.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if (!user) {
            throw new Error("Invalid login or password");
        }
        delete user.password;
        const token = auth.createToken(user);
        res.json({ token });
    }
    catch (err) {
        next(err);
    }
};
