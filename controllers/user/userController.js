const User = require('../../models/userModel');
const bcrypt = require('bcrypt')

const loadUserAccount = async (req, res, next) => {
    try {

        const { userId } = req.session

        const findUserDetails = await User.findOne({ _id: userId })

        res.render('user/useraccount', { userDetails: findUserDetails })
    } catch (error) {
        next(error)
    }
}

const editUser = async (req, res, next) => {
    try {

        const { name, phone } = req.body
        const { userId } = req.session

        const findUserData = await User.findOne({ _id: userId })

        findUserData.username = name
        findUserData.phone = phone

        const update = await findUserData.save()

        if (update) {
            console.log("Updated")
            res.send({ status: 2 })
        }


    } catch (error) {
        next(error)
    }
}





module.exports = {

    loadUserAccount,
    editUser
};
