const { validationResult } = require('express-validator');

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
    loadAdminLogin,
    verifyAdminLogin,
    loadAdminDashboard
}