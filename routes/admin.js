// import express
import express from 'express';

// creating router
const router = express.Router();

// passport for authentication
import passport from '../config/passport_local.js';
import { addEmployee, addEmployeeForm, admin, assignReview, deleteEmployee, updateEmployee, updateForm } from '../controllers/adminController.js';

// controller

// to render the dashboard
router.get('/',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    admin);

// to delete an employee
router.get('/delete/',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    deleteEmployee);

// to render the update form
router.get('/updateForm',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    updateForm);

// to update an employee's data
router.post('/update',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
   updateEmployee);

// to render add employee form
router.get('/addEmployee',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
   addEmployeeForm);

// for creating a new user by admin
router.post('/createEmployee',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    addEmployee);

// assign review to an employee
router.post('/assignReview',
    // to check whether user is logged in or not
    passport.checkAuthentication,
    // to check whether the user is admin or not
    passport.isAdmin,
    // controller for route
    assignReview);

// export router
export default router;
