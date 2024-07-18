const orderModel = require('../../models/orderModel')
const cartModel = require('../../models/cartModel')
const userModel = require('../../models/userModel')
const addressModel = require('../../models/addressModel')
const productModel = require('../../models/productModel')
const couponModel = require('../../models/couponModel')
const transactionModel = require('../../models/transactionSchema')

const loadWallet = async (req, res, next) => {
    try{
        const { userId } = req.session

        if(!userId){
            return console.log("can't get userId at loadWallet")
        }

        const fetchUser = await userModel.findById(userId)

        if(!fetchUser){
            return console.log("user not found")
        }

        const transactions = await transactionModel.find({userId: userId}).sort({createdAt: -1})

        res.render('user/wallet',{ transactions: transactions, user: fetchUser})
    }catch(error){
        next(error)
    }
}

const orderWithWallet = async (req, res, next) => {
    try{
        const { address, coupon } = req.body

        const { userId, user } = req.session

        if (!address) {
            return console.log("can't find address id at place order wallet")
        }

        if (!userId) {
            return console.log("can't find userId at place order wallet")
        }

        if (!user) {
            return console.log("can't find user at place order wallet")
        }

        const findUserDetails = await userModel.findOne({ _id: userId })

        if (!findUserDetails) {
            return console.log("can't find user at place order")
        }

        const findUserAddress = await addressModel.findOne({ userId: userId })

        if (!findUserAddress) {
            return console.log("can't find user address at place order")
        }

        let checkedAddress = ''
        findUserAddress.addresses.forEach((val) => {
            if (val.id == address) {
                checkedAddress = val    
            }
        })

        let id = checkedAddress.id
        let street = checkedAddress.street
        let city = checkedAddress.city
        let state = checkedAddress.state
        let zip = checkedAddress.zip
        let country = checkedAddress.country

        const products = await cartModel.findOne({ userId: userId }).populate('items.productId')

        if (!products) {
            return console.log("can't find user products at order place")
        }

        const productsDetails = []
        products.items.forEach(val => {
            productsDetails.push({
                product: val.productId.id,
                name: val.productId.productName,
                quantity: val.quantity,
                price: val.productId.price,
                productStatus: 'Pending'
            })
        })

        let totalAmount = 40

        productsDetails.forEach(val => {
            totalAmount += val.quantity * val.price
        })

        if (coupon.length > 0) {
            const fetchCoupon = await couponModel.findOne({ code: coupon })

            if (!fetchCoupon) {
                return console.log("can't find coupon, maybe code is invalid")
            }

            totalAmount -= fetchCoupon.discountAmount

            fetchCoupon.userList.push({ userId });

            await fetchCoupon.save()
        }

        if(totalAmount > findUserDetails.balance){
            console.log("Insufficient Balance in Wallet")
            return res.send({error: 'Insufficient Balance'})
        }

        for (let item of productsDetails) {
            const product = await productModel.findOne({ _id: item.product });

            if (!product) {
                return console.log("product not found")
            }

            // console.log(product.stock, "and", item.quantity)

            if (product.stock < item.quantity) {
                res.send({ error: 1 })
                return console.log("product don't have enough quantity")
            }

            // // Decrease product quantity
            // product.stock -= item.quantity;
            // await product.save();
        }

        const newOrder = new orderModel({
            user: userId,
            products: productsDetails,
            shippingAddress: {
                userName: findUserDetails.username,
                email: user,
                address: id,
                street: street,
                city: city,
                state: state,
                zip: zip,
                country: country
            },
            paymentMethod: 'wallet',
            totalAmount: totalAmount,
            orderStatus: 'Pending'
        })

        const saveOrder = await newOrder.save()
        if (saveOrder) {

            for (let item of productsDetails) {
                const product = await productModel.findOne({ _id: item.product });

                if (!product) {
                    return console.log("product not found")
                }

                // Decrease product quantity
                product.stock -= item.quantity;
                await product.save();
            }

            findUserDetails.balance -= totalAmount

            await findUserDetails.save()

            products.items = []

            await products.save()

            const transaction = new transactionModel({
                userId: userId,
                amount: totalAmount,
                type: 'debit'
            })

            await transaction.save()

            console.log("order success")
            res.send({ success: 7 })
        } else {
            return console.log("order placing failed")
        }




    }catch(error){
        next(error)
    }
}

module.exports = {
    loadWallet,
    orderWithWallet,
}