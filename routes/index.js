// import express
import express from 'express';

// import user routes
import userRoutes from './user.js';
// import admin routes
import adminRoutes from './admin.js';
// import employee routes
import employeeRoutes from './employee.js';

// create new router
const router = express.Router();

// for user related routes
router.use('/', userRoutes);
// for routes related to admin
router.use('/dashboard/admin', adminRoutes);
// for routes related to employee
router.use('/dashboard/employee', employeeRoutes);

// export the router
export default router;
