import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';

const verifyWithRequest = async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (err?: Error | null, user?: Express.User, info?: object) => void
) => {
  process.nextTick(function () {
    console.log(`GITHUB_CLIENT_ID=${process.env.GITHUB_CLIENT_ID}`);
    return done(null, profile);
  });
};

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || 'client_id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'client_secret',
    callbackURL: 'http://127.0.0.1:8000/auth/github/callback',
    passReqToCallback: true,
  },

  /* FIX ME ✅ */
  verifyWithRequest
);

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
