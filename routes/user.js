import express from 'express';
// import passport
import passport from '../config/passport_local.js';
import { createAccount, createSession, home, signUp, signout } from '../controllers/userController.js';
// import user controller

// create new router
const userRouter = express.Router();
// to render homepage / signin page
userRouter.get('/', home);

// to render the sign up page
userRouter.get('/sign-up',signUp);

// for signing out a user 
userRouter.get('/signout', signout);

// for signin a user / creating session
userRouter.post('/create-session', 
    // using passport for authentication
    passport.authenticate(
        // strategy
        'local',
        // if signing in fails
        { failureRedirect: '/' }),

    // controller
    createSession);

// creating a new user
userRouter.post('/create-account', createAccount);

// export the router
export default userRouter;
