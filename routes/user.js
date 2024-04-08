import express from 'express';
// import passport
import passport from '../config/passport_local.js';
import { createAccount, createSession, home, signUp, signout } from '../controllers/userController.js';
// import user controller

// create new router
const router = express.Router();
// to render homepage / signin page
router.get('/', home);

// to render the sign up page
router.get('/sign-up',signUp);

// for signing out a user 
router.get('/signout', signout);

// for signin a user / creating session
router.post('/create-session', 
    // using passport for authentication
    passport.authenticate(
        // strategy
        'local',
        // if signing in fails
        { failureRedirect: '/' }),

    // controller
    createSession);

// creating a new user
router.post('/create-account', createAccount);

// export the router
export default router;
