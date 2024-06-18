const User = require('../../models/userModel');
const addressModel = require('../../models/addressModel')
const bcrypt = require('bcrypt')

const loadUserAccount = async (req, res, next) => {
    try {

        const { userId } = req.session

        const findUserDetails = await User.findOne({ _id: userId })

        res.render('user/useraccount', { userDetails: findUserDetails, user: userId })
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

const changePass = async (req, res, next) => {
    try{

        const { userId } = req.session
        const { oldPass, newPass } = req.body

        const findUser = await User.findOne({_id: userId})
        
        const { password } = findUser
        
        const PassMatch = await bcrypt.compare(oldPass, password)

        if(!PassMatch){
            console.log("entered Password is incorrect")
            return res.send({status: 1})
        }

        const newPassHash = await bcrypt.hash(newPass, 10)

        findUser.password = newPassHash
        await findUser.save()

        if(findUser){
            console.log("Password changed success")
            res.send({status: 7})
        }
        
    }catch(error){
        next(error)
    }
}

const addAddress = async (req, res, next) => {
    try{
        //!handle errors
        const { street, city, state, zip, country } = req.body
        const { userId } = req.session
        const createAdd = new addressModel({

            userId: userId,
            street: street,
            city: city,
            state: state,
            zip: zip,
            country: country
        })

        const saveAdd = await createAdd.save()
        if(saveAdd){
            console.log("big success")
        }

    }catch(error){
        next(error)
    }
}


module.exports = {

    loadUserAccount,
    editUser,
    changePass,
    addAddress,

};
