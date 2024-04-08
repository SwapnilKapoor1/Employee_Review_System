// getting user's model 
import User from '../models/User.js';

// for password encryption
import bcrypt from 'bcryptjs';

// render homepage / login page
export const home = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        if (user.role === 'Admin') {
            return res.redirect('/dashboard/admin');
        }
        return res.redirect('/dashboard/employee');
    }

    return res.render('signIn', {
        title: "Sign In"
    });
}

// render the signup page
export const signUp = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        if (user.role === 'Admin') {
            return res.redirect('/dashboard/admin');
        }
        return res.redirect('/dashboard/employee');
    }

    return res.render('signUp', {
        title: "Sign Up"
    });
}

// for creating a new user in database
export const createAccount = async (req, res) => {
    try {
        let { name, email, password, cnf_password, role } = req.body;
        email = email.toLowerCase();

        const userExist = await User.findOne({ email });

        if (userExist) {
            req.flash('error', 'User already exists');
            return res.redirect('/');
        }

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
        });

        req.flash('success', 'New User created, Please login !!');
        return res.status(201).redirect('/');

    } catch (error) {
        console.log(error);
    }
}

// create session
export const createSession = (req, res) => {
    const user = req.user;

    req.flash('success', 'Welcome, You are logged in');
    if (user.role === 'Admin') {
        return res.redirect('/dashboard/admin');
    }

    return res.redirect('/dashboard/employee');
}

// for signing out the logged in user
export const signout = async (req, res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err) 
        }

        req.flash('success', 'You are logged out successfully !!');
        res.redirect('/');
    });
}
