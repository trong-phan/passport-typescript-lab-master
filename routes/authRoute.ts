import express from 'express';
import passport from 'passport';
import { forwardAuthenticated } from '../middleware/checkAuth';

const router = express.Router();

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', { message: (req.session as any).messages?.pop() });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    /* FIX ME: ✅ failureMsg needed when login fails */
    failureMessage: true,
  })
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect('/auth/login');
});

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
);

export default router;
