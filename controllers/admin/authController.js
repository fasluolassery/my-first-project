const { validationResult } = require('express-validator');

const loadAdminLogin = async (req, res, next) => {
    try {
        res.render('admin/adminlogin');
    } catch (error) {
        next(error)
    }
};

const verifyAdminLogin = async (req, res, next) => {
    try {
        const AdminValidationErrors = validationResult(req)

        if (!AdminValidationErrors.isEmpty()) {
            return console.log('error', validationErrors.array())
        }

        const adminCredential = {
            adminMail: process.env.EMAIL_ADMIN,
            adminPassword: process.env.ADMIN_PASS
        }

        const { loginEmail, loginPassword } = req.body

        if (loginEmail !== adminCredential.adminMail) {
            res.send({ next: 0 })
            return console.log("Error: Admin Not Found")
        }

        if (loginPassword !== adminCredential.adminPassword) {
            res.send({ next: 100 })
            return console.log("Error: Incorrect password")
        }

        req.session.admin = loginEmail
        res.send({ next: 1 })

    } catch (error) {
        next(error)
    }
}

const loadAdminDashboard = async (req, res, next) => {
    try {
        res.render('admin/admindashboard')
    } catch (error) {
        next(error)
    }
}


module.exports = {
    loadAdminLogin,
    verifyAdminLogin,
    loadAdminDashboard
}