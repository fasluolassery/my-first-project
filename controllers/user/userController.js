const User = require('../../models/userModel');
const addressModel = require('../../models/addressModel')
const bcrypt = require('bcrypt')
const orderModel = require('../../models/orderModel')
const productModel = require('../../models/productModel')
const couponModel = require('../../models/couponModel')
const categoryModel = require('../../models/categoryModel')


const loadUserAccount = async (req, res, next) => {
    try {

        const { userId } = req.session

        const findUserDetails = await User.findOne({ _id: userId })

        let referalLink = 'localhost:7777/login/?reff=' + userId

        const findAddress = await addressModel.findOne({ userId: userId })

        let addresses

        if(!findAddress){
            // res.render('user/useraccount', {userDetails: findUserDetails, user: userId, referalLink: referalLink })
            addresses = []
        }else{
            const addresses = findAddress.addresses
        }
        // console.log(findAddress.addresses)

        const findOrders = await orderModel.find({ user: userId})

        const findCoupons = await couponModel.find()

        res.render('user/useraccount', { userDetails: findUserDetails, user: userId, addresses: addresses, orders: findOrders, coupons: findCoupons, referalLink: referalLink })
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

const editAddress = async (req, res, next) => {
    try{
        const { addressId, street, city, state, zip, country } = req.body

        const { userId } = req.session

        const findAddressArray = await addressModel.findOne( { userId: userId } )

        if(!findAddressArray){
            return console.log("Error at findAddressArray in edit address")
        }

        const correctAdd = findAddressArray.addresses.find(val => val.id == addressId)

        if(!correctAdd){
            return console.log("can't get correct address form user in edit address")
        }

        correctAdd.street = street
        correctAdd.city = city
        correctAdd.state = state
        correctAdd.zip = zip
        correctAdd.country = country
        
        const saveEditAddress = await findAddressArray.save()

        if(!saveEditAddress){
            return console.log("Error at save edit address in edit address")
        }

        res.send({success: 7})
        
    }catch(error){
        console.log(error)
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

const search = async (req, res, next) => {
    try{
        const { value } = req.body

        if(value.length <= 0){
            return console.log("there is no value at search")
        }

        const findProducts = await productModel.find({productName: new RegExp(value, 'i')})

        // const findCategories = await categoryModel.find({categoryName: new RegExp(value, 'i')})

        res.send({
            products: findProducts,
            // categories: findCategories
        })
    }catch(error){
        next(error)
    }
}

const filterByCategory = async (req, res, next) => {
    try{
        const { category } = req.body

        if(!category){
            return 
        }

        const findProducts = await productModel.find({ category: category})

        res.send({
            products: findProducts
        })

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
    editAddress,
    search,
    filterByCategory,

};
