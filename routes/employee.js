// import express
import express from 'express';

// create new router
const router = express.Router();

// passport for authentication
import passport from '../config/passport_local.js';

// controller
import {employee,  addReview } from '../controllers/employeeController.js';

// to render the dashboard for an employee
router.get('/',
    // check whether the user is logged in not
    passport.checkAuthentication,
    // to check whether the logged in user is employee or not
    passport.isEmployee,
    // controller
    employee);

// for giving feedback to a fellow employee
router.post('/addReview',
    // check whether the user is logged in or not
    passport.checkAuthentication,
    // check whether logged in user is an employee or not
    passport.isEmployee,
    // controller
    addReview);

// export the router 
export default router;
