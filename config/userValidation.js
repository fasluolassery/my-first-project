const { body } = require('express-validator')


const validateRegistration = [
    body('userName').notEmpty().withMessage('Name is required'),
    body('userEmail').isEmail().withMessage('Invalid email'),
    body('userPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('userPhone').isMobilePhone().withMessage('Invalid phone number')
];


const validateLogin = [
    body('loginEmail').isEmail().withMessage('Invalid email'),
    body('loginPassword').notEmpty().withMessage('Password is required')
];

module.exports = {
    validateRegistration,
    validateLogin
}