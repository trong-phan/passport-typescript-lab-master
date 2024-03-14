import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import dotenv from 'dotenv';
import { addNewUser, getUserById } from '../../controllers/userController';
import passport from 'passport';

dotenv.config();

const verifyWithRequest = async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (err?: Error | null, user?: Express.User, info?: object) => void
) => {
  if (!profile) {
    process.nextTick(function () {
      return done(null, undefined);
    });
  } else {
    let user = getUserById(profile.id);
    if (!user) {
      user = {
        id: profile.id,
        name: profile.displayName,
        email: '',
        password: '',
      };
      addNewUser(user);
    }

    process.nextTick(function () {
      return done(null, user ? user : undefined);
    });
  }
};

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:8000/auth/github/callback',
    passReqToCallback: true,
  },

  /* FIX ME ✅ */
  verifyWithRequest
);

passport.serializeUser<number>(function (
  user: Express.User,
  done: (err: any, id?: number) => void
) {
  done(null, user.id);
});

passport.deserializeUser<number>(function (
  id: number,
  done: (err: any, user?: Express.User | false | null) => void
) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: 'User not found' }, null);
  }
});

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
