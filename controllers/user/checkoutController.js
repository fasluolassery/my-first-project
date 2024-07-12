const addressModel = require('../../models/addressModel')
const cartModel = require('../../models/cartModel')
const couponModel = require('../../models/couponModel')

const loadCheckout = async (req, res, next) => {
    try{
        const { userId } = req.session

        if(!userId){
            return console.log("user is not found in checkout")
        }

        const findUserCart = await cartModel.findOne({ userId: userId}).populate('items.productId')

        if(!findUserCart){
            return console.log("can't find user cart in loadcheckout")
        }

        const findAddresses = await addressModel.findOne({ userId: userId })

        if(!findAddresses){
            return console.log("Can't find findAddresses in loadcheckout")
        }

        const addresses = findAddresses.addresses

        const findCoupons = await couponModel.find()

        if(!findCoupons){
            return console.log("Can't find coupons in loadcheckout")
        }

        res.render('user/checkoutpage', { addresses: addresses, userCartItems: findUserCart.items, coupons: findCoupons})

    }catch(error){
        next(error)
    }
}

const checkoutTotal = async (req, res, next) => {
    try{
        const { userId } = req.session

        const findUserCart = await cartModel.findOne({userId: userId}).populate('items.productId')

        if(!findUserCart){
            return console.log("can't find user cart in checkout total")
        }

        res.send({productsDeatails: findUserCart.items})

    }catch(error){
        next(error)
    }
}

module.exports = {
    loadCheckout,
    checkoutTotal,
}