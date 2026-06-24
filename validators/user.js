const { body } = require('express-validator');

const createUserValidator = [
    body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),

    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('name').notEmpty().withMessage('Name is required'),

    body('mobileNumber')
    .notEmpty().withMessage('Mobile number is required')
    .isMobilePhone().withMessage('Mobile number is required'),

    body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['admin','user']).withMessage('Role is required'),
];

module.exports = {
    createUserValidator,
}