const User = require('../../models/userModel');
const addressModel = require('../../models/addressModel')
const bcrypt = require('bcrypt')

const loadUserAccount = async (req, res, next) => {
    try {

        const { userId } = req.session

        const findUserDetails = await User.findOne({ _id: userId })

        const findAddress = await addressModel.findOne({ userId: userId })
        if(!findAddress){
            res.render('user/useraccount', {userDetails: findUserDetails, user: userId })
        }
        // console.log(findAddress.addresses)
        const addresses = findAddress.addresses


        res.render('user/useraccount', { userDetails: findUserDetails, user: userId, addresses: addresses })
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
    try {

        const { userId } = req.session
        const { oldPass, newPass } = req.body

        const findUser = await User.findOne({ _id: userId })

        const { password } = findUser

        const PassMatch = await bcrypt.compare(oldPass, password)

        if (!PassMatch) {
            console.log("entered Password is incorrect")
            return res.send({ status: 1 })
        }

        const newPassHash = await bcrypt.hash(newPass, 10)

        findUser.password = newPassHash
        await findUser.save()

        if (findUser) {
            console.log("Password changed success")
            res.send({ status: 7 })
        }

    } catch (error) {
        next(error)
    }
}

const addAddress = async (req, res, next) => {
    try {
        //!handle errors
        const { street, city, state, zip, country } = req.body
        const { userId } = req.session

        const checkExistingAddress = await addressModel.findOne({ userId: userId })

        if (!checkExistingAddress) {

            const createAdd = new addressModel({

                userId: userId,
                addresses: [{ street, city, state, zip, country }]

            })

            const saveAdd = await createAdd.save()
            if (saveAdd) {
                console.log("new Address added")
                res.send({status: 7})
            }

        }

        checkExistingAddress.addresses.push({street, city, state, zip, country})

        const updateAddress = await checkExistingAddress.save()
        if(updateAddress){
            console.log("added new address")
            res.send({status: 7})
        }



    } catch (error) {
        next(error)
    }
}

const removeAddress = async (req, res, next) => {
    try{
        const { indexOfAddress } = req.body

        const { userId } = req.session
        
        const findAddresses = await addressModel.findOne({ userId: userId })

        findAddresses.addresses.splice(indexOfAddress, 1)

        const saveRemove = await findAddresses.save()

        if(saveRemove){
            console.log("address remove success")
            res.send({status: 7})
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
    removeAddress,
    

};
