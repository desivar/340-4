// Needed Resources
const express = require('express');
const router = new express.Router();
const utilities = require('../utilities/');
const accountController = require('../controllers/accountController');
const regValidate = require('../utilities/account-validation'); // Assuming this is the correct path
const { body, validationResult } = require('express-validator');

// Validation rules (assuming these are what you want)
const registrationRules = () => {
    return [
        body('account_firstname')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a first name.'),
        body('account_lastname')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a last name.'),
        body('account_email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email address.'),
        body('account_password')
            .trim()
            .isLength({ min: 12 })
            .withMessage('Password must be at least 12 characters long.')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,}$/)
            .withMessage('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'),
    ];
};

const loginRules = () => {
    return [
        body('account_email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email address.'),
        body('account_password')
            .trim()
            .isLength({ min: 12 })
            .withMessage('Password must be at least 12 characters long.')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,}$/)
            .withMessage('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'),
    ];
};

const updateRegistrationRules = () => {
    return [
        body('account_firstname')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a first name.'),
        body('account_lastname')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a last name.'),
        body('account_email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email address.'),
    ];
};

const updatePasswordRules = () => {
    return [
        body('account_password')
            .trim()
            .isLength({ min: 12 })
            .withMessage('Password must be at least 12 characters long.')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,}$/)
            .withMessage('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'),
    ];
};

// Data validation check
const checkRegData = async (req, res, next) => {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
        let errors = validationResults.array();
        return res.render('account/registration', {
            errors,
            account_firstname: req.body.account_firstname,
            account_lastname: req.body.account_lastname,
            account_email: req.body.account_email,
        });
    }
    next();
};

const checkLoginData = async (req, res, next) => {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
        let errors = validationResults.array();
        return res.render('account/login', {
            errors,
            account_email: req.body.account_email,
        });
    }
    next();
};

const checkUpdateRegData = async (req, res, next) => {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
        let errors = validationResults.array();
        return res.render('account/update', { // Assuming the update view is named 'update'
            errors,
            account_firstname: req.body.account_firstname,
            account_lastname: req.body.account_lastname,
            account_email: req.body.account_email,
        });
    }
    next();
};

const checkPasswordData = async (req, res, next) => {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
        let errors = validationResults.array();
        return res.render('account/update', { // Assuming the update view is named 'update'
            errors,
        });
    }
    next();
};

/* ***********************
 * Route to build Login View
 *************************/
router.get('/login', utilities.handleErrors(accountController.buildLogin));

/* ***********************
 * Process the login attempt
 *************************/
router.post(
    '/login',
    loginRules(),
    checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
);

/* ***********************
 * Route to build Registration View
 *************************/
router.get('/registration', utilities.handleErrors(accountController.buildRegistration));

/* ***********************
 * Route to handle Registration
 *************************/
router.post(
    '/registration',
    registrationRules(),
    checkRegData,
    utilities.handleErrors(accountController.registerAccount)
);

/* ***********************
 * Route to build Account Management View
 *************************/
router.get('/', utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

/* ***********************
 * Route to build Update Account View
 *************************/
router.get(
    '/update/:account_id',
    utilities.checkLogin,
    utilities.handleErrors(accountController.buildUpdateAccountView)
);

/* ***********************
 * Update Account Information
 *************************/
router.post(
    '/update-user-info/',
    utilities.checkLogin,
    updateRegistrationRules(),
    checkUpdateRegData,
    utilities.handleErrors(accountController.updateAccountInfo)
);

/* ***********************
 * Change Password
 *************************/
router.post(
    '/update-user-password/',
    utilities.checkLogin,
    updatePasswordRules(),
    checkPasswordData,
    utilities.handleErrors(accountController.updatePassword)
);

/* ***********************
 * Route to build Logout View
 *************************/
router.get("/logout", utilities.handleErrors(accountController.logout));

module.exports = router;