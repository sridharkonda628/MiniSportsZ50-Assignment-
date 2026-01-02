const { body, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const validateRegister = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain a number')
        .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Join all error messages into a single string or return the first one
            const msg = errors.array().map(err => err.msg).join('. ');
            return next(new AppError(msg, 400));
        }
        next();
    }
];

const validateLogin = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const msg = errors.array().map(err => err.msg).join('. ');
            return next(new AppError(msg, 400));
        }
        next();
    }
];

module.exports = {
    validateRegister,
    validateLogin
};
