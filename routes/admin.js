// import express
import express from 'express';

// creating router
const adminRouter = express.Router();

// passport for authentication
import passport from '../config/passport_local.js';
import { addEmployee, addEmployeeForm, admin, assignReview, deleteEmployee, updateEmployee, updateForm } from '../controllers/adminController.js';

// controller

// to render the dashboard
adminRouter.get('/',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    admin);

// to delete an employee
adminRouter.get('/delete/',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    deleteEmployee);

// to render the update form
adminRouter.get('/updateForm',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    updateForm);

// to update an employee's data
adminRouter.post('/update',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
   updateEmployee);

// to render add employee form
adminRouter.get('/addEmployee',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
   addEmployeeForm);

// for creating a new user by admin
adminRouter.post('/createEmployee',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    addEmployee);

// assign review to an employee
adminRouter.post('/assignReview',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    assignReview);

// export router
export default adminRouter;
