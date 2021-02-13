const userController = {};

const passport = require('passport');
const { body, validationResult, check } = require('express-validator');

const User = require('../models/user.model');

//Sing Up
//GET
userController.userControllerSingUpGet = (req, res) => {
    res.render('user/signup', {
        title: 'Sign Up'
    });
}

//POST
userController.userControllerSingUpPost = [
    //Validate and sanitize fields.
    body('name', 'Name must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('lastname', 'Last Name must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('username', 'Username must not be empty.').trim().escape().isLength({ min: 3 }).custom(async(username) => {
        const userName = await User.findOne({ username: username });
        if (userName) {
            throw new Error('Username al ready in use.');
        }
    }),
    body('department', 'Department must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('password').isLength({ min: 8 }).withMessage('The Password must be at least 8 chars long').matches(/\d/).withMessage('The Password must contain a number.').trim(),

    async(req, res, next) => {
        //Extract errors
        const errors = validationResult(req);

        //Create a User object
        const {
            name,
            lastname,
            username,
            department,
            password
        } = req.body;

        if (!errors.isEmpty()) {
            res.render('user/signup', {
                title: 'Sign Up',
                name,
                lastname,
                username,
                department,
                errors: errors.array()
            });
        } else {
            const newUser = new User({
                name,
                lastname,
                username,
                department,
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.redirect('/signin');
        }
    }
];

//Sign In
//GET
userController.userControllerSingInGet = (req, res) => {
    res.render('user/signin', {
        title: 'Sign In'
    });
}

//POST
userController.userControllerSingInPost = passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/reservation',
    failureFlash: true
});

//Sign Out
userController.userControllerSingOut = (req, res) => {
    req.logout();
    req.flash('logout_msg', 'You are logged out now.');
    res.redirect('/');
}
module.exports = userController;