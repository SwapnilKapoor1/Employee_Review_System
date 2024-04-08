
// feedback's model (database)
import Feedback from '../models/Feedback.js';
// user's model (database)
import User from '../models/User.js';

// for password encryption
import bcrypt from 'bcryptjs';

// render the admin's dashboard page
export const admin = async (req, res) => {
    try {
        const employeeList = await User.find({ role: 'Employee' });
        res.render('admin', {
            title: "Admin | Dashboard ",
            employee: employeeList
        });
    } catch (error) {
        console.log(error);
    }
}

// delete an employee from database
export const deleteEmployee = async (req, res) => {
    try {
        const id = req.query.id;
        await Feedback.deleteMany({ reviewer: id });
        await Feedback.deleteMany({ recipient: id });
        await User.findByIdAndDelete(id);
        req.flash('success', 'Employee successfully deleted');
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

// route for rendering the update data form
export const updateForm = async (req, res) => {
    try {
        const employee = await User.findById(req.query.id);
        let feedbackByOther = [];
        const idofFeedbacks = employee.feedbackByOthers;
        if (idofFeedbacks.length > 0) {
            for (let index = 0; index < idofFeedbacks.length; index++) {
                let feedback = await Feedback.findById(idofFeedbacks[index]).populate('reviewer', 'name');
                if (feedback) {
                    feedbackByOther.push(feedback);
                }
            }
        }
        res.render('updateForm', {
            title: "Admin | Update Employee ",
            employee: employee,
            feedbacks: feedbackByOther
        });
    } catch (error) {
        console.log(error);
    }
}

// update employees data
export const updateEmployee = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.query.id, req.body);
        req.flash('success', 'Info Updated !!');
        res.redirect('/dashboard/admin');
    } catch (error) {
        console.log(error);
    }
}

// render the form for adding a new employee
export const addEmployeeForm = (req, res) => {
    res.render('addEmployee', {
        title: "Admin | Add Employee ",
    });
}

// route for adding employee
export const addEmployee = async (req, res) => {
    try {
        const { name, email, password, cnf_password } = req.body;
        const role = 'Employee';
        const userExist = await User.findOne({ email });
        if (!userExist) {
            if (password !== cnf_password) {
                req.flash('error', 'Password does not match !!');
                return res.redirect('back');
            }
            const cryptPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                role,
                password: cryptPassword,
            })
            req.flash('success', 'New employee created ');
        } else {
            req.flash('error', 'Email address already exist');
        }
        return res.redirect('/dashboard/admin');
    } catch (error) {
        console.log(error);
    }
}

// router for assign a review to any employee
export const assignReview = async (req, res) => {
    try {
        const employee = await User.findById(req.query.id);
        if (employee.reviewAssigned.includes(req.body.recipient)) {
            req.flash('error', 'Recipient already assigned to this user');
            return res.redirect('back');
        }
        employee.reviewAssigned.push(req.body.recipient);
        await employee.save();
        req.flash('success', 'Review Assigned');
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}
