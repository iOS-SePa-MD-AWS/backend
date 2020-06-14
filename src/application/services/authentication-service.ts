
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { ExtractJwt, Strategy as JWTstrategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
 
export interface Auth {
  createToken(user: User): string;
  authenticate(): any;
}
 
const createToken = (user: User): string => {
  return jwt.sign({ ...user }, process.env.JWT_SECRET || "secret");
};
 
const authenticate = () => passport.authenticate('jwt', { session: false });

export const createAuth = (userRepository: Repository<User>): Auth => {
  passport.use(
    new JWTstrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (token, done) => {
        const user = await userRepository.findOne(token.id);
 
        if (user) {
          return done(null, user);
        }
 
        done(new Error('User not found'));
      }
    )
  );
 
  return {
    createToken,
    authenticate: authenticate(),
  };
};
