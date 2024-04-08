// import express
import express from 'express';

// import user routes
import userRouter from './user.js';
// import admin routes
import adminRouter from './admin.js';
// import employee routes
import employeeRouter from './employee.js';


// create new router
const router = express.Router();

// for user related routes
router.use('/',userRouter);
// for routes related to admin
router.use('/dashboard/admin',adminRouter);
// for routes related to employee
router.use('/dashboard/employee',employeeRouter);

// export the router
export default router;
