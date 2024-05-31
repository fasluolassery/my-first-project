const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const User = require('../models/userModel');
const Otp = require('../models/otpModel');


//! USER SIDE
const loadRegister = async (req, res) => {
    try {
        res.render('user/registerpage');
    } catch (error) {
        console.log("Error rendering login page:", error.message);
    }
};

const userRegisterDetails = async (req, res) => {
    try{
    
        const validationErrors = validationResult(req)
        
        if(!validationErrors.isEmpty()){
            return console.log('error',validationErrors.array())
        }
        
        const {userName, userEmail, userPassword, userPhone} = req.body
        
        const existingUser = await User.findOne({email:userEmail})
        
        if(existingUser){
            res.send({status:"Email is already registered"})
            return console.log("Email is already registered")
        }
        
        const hashedPassword = await bcrypt.hash(userPassword, 10)

        const user ={
            username:userName,
            email: userEmail,
            phone: userPhone,
            password: hashedPassword
        }

        req.session.user = user
        
        
        res.send({status:"success"})

    }catch(error){
        console.log("Error saving users:", error.message)
    }
}

const userLoginDetails = async (req, res) => {
    try{

        const validationErrors = validationResult(req)
        
        if(!validationErrors.isEmpty()){
            return console.log('error',validationErrors.array())
        }

        const { loginEmail, loginPassword } = req.body

        console.log(loginEmail) //! to remove
        console.log(loginPassword) //! to remove

        const checkUser = await User.findOne({email:loginEmail})

        if(!checkUser){
            res.send( { next: 0 } )
            return console.log("user not found")
        }

        console.log(checkUser.password) //! to remove

        const passMatch = await bcrypt.compare(loginPassword, checkUser.password)

        if(!passMatch){
            res.send( { next: 100} )
            return console.log("Incorrect password")
        }
        console.log(checkUser.isBlock)
        if(checkUser.isBlock){
            res.send( {next: 200})
            return console.log("your account has been temporarily blocked")
        }
        
        req.session.user = loginEmail
        res.send( { next: 1 } )

    }catch(error){
        console.log("Error login users:", error.message)
    }
}

const userLoginGoogle = async (req, res) => {
    try{
        console.log("the callback reached here")
        res.redirect('/')
    }catch(err){
        console.log("Error at googleAuth login", err.message)
    }
}



//! ADMIN SIDE
const loadAdminLogin = async (req, res) => {
    try {
        res.render('admin/adminlogin');
    } catch (error) {
        console.log("Error loading admin login:", error.message);
    }
};

const verifyAdminLogin = async (req, res) => {
    try{
        const AdminValidationErrors = validationResult(req)
        
        if(!AdminValidationErrors.isEmpty()){
            return console.log('error',validationErrors.array())
        }

        const adminCredential = {
            adminMail: process.env.EMAIL_ADMIN,
            adminPassword: process.env.ADMIN_PASS
        }

        const { loginEmail, loginPassword } = req.body

        if(loginEmail !== adminCredential.adminMail){
            res.send( {next: 0 } )
            return console.log("Error: Admin Not Found")
        }

        if(loginPassword !== adminCredential.adminPassword){
            res.send( {next: 100} )
            return console.log("Error: Incorrect password")
        }

        req.session.admin = loginEmail
        res.send( { next:1 } )

    }catch(error){
        console.log("Error verifying admin", error.message)
    }
}

const loadAdminDashboard = async (req, res) => {
    try{
        res.render('admin/admindashboard')
    }catch(error){
        console.log("Error loading admin dashboard", error.message)
    }
}

module.exports = {
    loadRegister,
    userRegisterDetails,
    userLoginDetails,
    loadAdminLogin,
    verifyAdminLogin,
    loadAdminDashboard,
    userLoginGoogle
};
