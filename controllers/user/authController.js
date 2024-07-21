const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const User = require('../../models/userModel');
const Otp = require('../../models/otpModel');

const loadRegister = async (req, res, next) => {
    try {

        const { reff } = req.query

        res.render('user/registerpage', { reff: reff});
    } catch (error) {
        next(error)
    }
};

const userRegisterDetails = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req)

        if (!validationErrors.isEmpty()) {
            return console.log('error', validationErrors.array())
        }

        const { userName, userEmail, userPassword, userPhone, refId } = req.body

        const existingUser = await User.findOne({ email: userEmail })

        if (existingUser) {
            res.send({ status: "Email is already registered" })
            return console.log("Email is already registered")
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10)

        const user = {
            username: userName,
            email: userEmail,
            phone: userPhone,
            password: hashedPassword,
            refId: refId
        }

        req.session.userData = user
        req.session.user = userEmail

        res.send({ status: "success" })

    } catch (error) {
        next(error)
    }
}

const userLoginDetails = async (req, res, next) => {
    try {

        const validationErrors = validationResult(req)

        if (!validationErrors.isEmpty()) {
            return console.log('error', validationErrors.array())
        }

        const { loginEmail, loginPassword } = req.body

        // console.log(loginEmail) //! to remove
        // console.log(loginPassword) //! to remove

        const checkUser = await User.findOne({ email: loginEmail })

        if (!checkUser) {
            res.send({ next: 0 })
            return console.log("user not found")
        }

        // console.log(checkUser.password) //! to remove

        const passMatch = await bcrypt.compare(loginPassword, checkUser.password)

        if (!passMatch) {
            res.send({ next: 100 })
            return console.log("Incorrect password")
        }
        // console.log(checkUser.isBlock)
        if (checkUser.isBlock) {
            res.send({ next: 200 })
            return console.log("your account has been temporarily blocked")
        }

        req.session.user = loginEmail
        req.session.userId = checkUser.id

        res.send({ next: 1 })

    } catch (error) {
        next(error)
    }
}

const userLoginGoogle = async (req, res, next) => {
    try {
        console.log("the callback reached here")
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}




module.exports = {
    loadRegister,
    userRegisterDetails,
    userLoginDetails,
    userLoginGoogle
};
