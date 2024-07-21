const orderModel = require('../../models/orderModel')
const cartModel = require('../../models/cartModel')
const userModel = require('../../models/userModel')
const addressModel = require('../../models/addressModel')
const productModel = require('../../models/productModel')
const couponModel = require('../../models/couponModel')
const transactionModel = require('../../models/transactionSchema')

const placeOrder = async (req, res, next) => {
    try {
        const { address } = req.body

        const { coupon } = req.body


        if (!address) {
            return console.log("can't find address or address id at place order")
        }

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
        let originalAmount 

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
            paymentMethod: 'cod',
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
            res.send({ success: 7 })
        } else {
            return console.log("order placing failed")
        }

    } catch (error) {
        next(error)
    }
}

const loadOrderDetails = async (req, res, next) => {
    try {

        const { orderId } = req.query

        const findOrder = await orderModel.findById(orderId).populate('products.product')

        if (!findOrder) {
            return console.log("can't get order details in load order details")
        }

        res.render('user/orderdetails', { order: findOrder })
    } catch (error) {
        next(error)
    }
}

const cancelOrder = async (req, res, next) => {
    try {
        const { orderId } = req.body

        if (!orderId) {
            return console.log("can't get order id at cancel order")
        }

        const findOrder = await orderModel.findById(orderId)

        findOrder.orderStatus = 'Cancelled'

        findOrder.products.forEach(val => {
            val.productStatus = 'Cancelled'
        })

        const updateCancel = await findOrder.save()

        if (updateCancel) {
            console.log("order cancelled success")
            res.send({ success: 7 })
        }

    } catch (error) {
        next(error)
    }
}

const cancelSingleProduct = async (req, res, next) => {
    try {
        const { orderId, productId } = req.body

        const { userId } = req.session

        if (!orderId || !productId) {
            return console.log("can't get order id and product id at cancel single product")
        }

        const findOrder = await orderModel.findById({ _id: orderId })

        if (!findOrder) {
            return console.log("can't find order at cancel single products")
        }

        const product = findOrder.products.find(val => val.id == productId)

        if (!product) {
            return console.log("can't find product at cancel single products")
        }

        const findProduct = await productModel.findById(product.product.toString())

        if (!findProduct) {
            return console.log("can't find findProduct in cancel single product")
        }

        findProduct.stock += product.quantity

        await findProduct.save()

        product.productStatus = 'Cancelled'

        const saveCancel = await findOrder.save()

        if(findOrder.paymentMethod == 'Razor Pay' || findOrder.paymentMethod == 'wallet'){
            const user = await userModel.findById(userId)
            user.balance += findOrder.totalAmount
            await user.save()   

            const transaction = new transactionModel({
                userId: userId,
                amount: findOrder.totalAmount,
                type: 'credit'
            })

            await transaction.save()
            
            res.send({success: 8})
        }else if(saveCancel){
            console.log("cancel product success")
            res.send({ success: 7 })
        }

    } catch (error) {
        next(error)
    }
}

const returnSingleOrder = async (req, res, next) => {
    try {
        const { orderId, productId } = req.body

        if (!orderId || !productId) {
            return console.log("can't get order id and product id at cancel single product")
        }

        const findOrder = await orderModel.findById({ _id: orderId })

        if (!findOrder) {
            return console.log("can't find order at cancel single products")
        }

        const product = findOrder.products.find(val => val.id == productId)

        if (!product) {
            return console.log("can't find product at cancel single products")
        }

        const findProduct = await productModel.findById(product.product.toString())

        if (!findProduct) {
            return console.log("can't find findProduct in cancel single product")
        }

        findProduct.stock += product.quantity

        await findProduct.save()

        product.productStatus = 'Returned'

        const saveCancel = await findOrder.save()

        if (saveCancel) {
            console.log("cancel product success")
            res.send({ success: 7 })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    placeOrder,
    loadOrderDetails,
    cancelOrder,
    cancelSingleProduct,
    returnSingleOrder,
}