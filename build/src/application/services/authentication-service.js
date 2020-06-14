"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuth = void 0;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const createToken = (user) => {
    return jwt.sign({ ...user }, process.env.JWT_SECRET || "secret");
};
const authenticate = () => passport.authenticate('jwt', { session: false });
exports.createAuth = (userRepository) => {
    passport.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: process.env.JWT_SECRET,
    }, async (token, done) => {
        const user = await userRepository.findOne(token.id);
        if (user) {
            return done(null, user);
        }
        done(new Error('User not found'));
    }));
    return {
        createToken,
        authenticate: authenticate(),
    };
};
