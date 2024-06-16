const { body } = require('express-validator')

const validateLoginAdmin = [
    body('loginEmail').isEmail().withMessage('Invalid email'),
    body('loginPassword').notEmpty().withMessage('Password is required')
];

module.exports = { 
    validateLoginAdmin
}