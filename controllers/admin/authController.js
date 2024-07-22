const { validationResult } = require('express-validator');
const userModel = require('../../models/userModel')
const bcrypt = require('bcrypt')

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

        const { loginEmail, loginPassword } = req.body

        const findAdmin = await userModel.findOne({ email: loginEmail })

        if (!findAdmin) {
            res.send({ next: 0 })
            return console.log("Error: Admin Not Found")
        }

        if (!findAdmin.isAdmin) {
            res.send({ next: 0 })
            return console.log("Error: Admin Not Found")
        }

        const adminPass = await bcrypt.compare(loginPassword, findAdmin.password)

        if (!adminPass) {
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