const User = require('../../models/userModel');
const bcrypt = require('bcrypt')

//!USER
const loadUserAccount = async (req, res) => {
    try {

        const { user } = req.session

        const findUserDetails = await User.findOne({ email: user })

        res.render('user/useraccount', { userDetails: findUserDetails })
    } catch (err) {
        console.log("Error in load user account: ", err) //! to do error handling middleware
    }
}

const editUser = async (req, res) => {
    try {

        const { name, phone } = req.body
        const { user } = req.session

        const findUserData = await User.findOne({ email: user })

        findUserData.username = name
        findUserData.phone = phone

        const update = await findUserData.save()
        
        if(update){
            console.log("Updated")
            res.send({status: 2})
        }


    } catch (err) {
        console.log("Error in edit user: ", err)
    }
}





module.exports = {
   
    loadUserAccount,
    editUser
};
