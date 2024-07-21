const instance = require('../../config/razorPay')
const userModel = require('../../models/userModel')
const addressModel = require('../../models/addressModel')
const cartModel = require('../../models/cartModel')
const productModel = require('../../models/productModel')
const orderModel = require('../../models/orderModel')
const couponModel = require('../../models/couponModel')

const createOrder = async (req, res, next) => {
    try{

        const { address, coupon } = req.body

        const { userId } = req.session

        const { user } = req.session

        
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
        let  originalAmount 
        
        productsDetails.forEach(val => {
            totalAmount += val.quantity * val.price
        })

        originalAmount = totalAmount

        if (coupon.length > 0) {
            const fetchCoupon = await couponModel.findOne({ code: coupon })

            if (!fetchCoupon) {
                return console.log("can't find coupon, maybe code is invalid")
            }

            totalAmount -= fetchCoupon.discountAmount

            fetchCoupon.userList.push({ userId });

            await fetchCoupon.save()
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


        const options = {
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: "receipt#1",
            payment_capture: '1'
        }

        const order = await instance.orders.create(options)

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
            paymentMethod: 'Razor Pay',
            totalAmount: totalAmount,
            originalAmount: originalAmount,
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

            products.items = []

            await products.save()

            console.log("order success")
        }

        res.send({order: order})
    }catch(error){
        next(error)
    }
}

module.exports = {
    createOrder,
}