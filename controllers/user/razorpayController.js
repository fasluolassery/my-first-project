const instance = require('../../config/razorPay')
const userModel = require('../../models/userModel')
const addressModel = require('../../models/addressModel')
const cartModel = require('../../models/cartModel')
const productModel = require('../../models/productModel')
const orderModel = require('../../models/orderModel')
const couponModel = require('../../models/couponModel')
const crypto = require('crypto');
require('dotenv').config();

const createInstance = async (req, res, next) => {
    try {
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
        let phone = checkedAddress.phone

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
                originalPrice: val.productId.price,
                price:  val.productId.offerPrice > 0 ? val.productId.offerPrice : val.productId.price,
                productStatus: 'Pending'
            })
        })

        let totalAmount = 0
        let originalAmount
        let totalAmountTwo = 0

        productsDetails.forEach(val => {
            totalAmount += val.quantity * val.price
            totalAmountTwo += val.quantity * val.originalPrice
        })

        originalAmount = totalAmountTwo

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
            
        }


        const options = {
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: "receipt#1",
            payment_capture: '1'
        }

        const razorpayOrder = await instance.orders.create(options)

        const newOrder = new orderModel({
            user: userId,
            products: productsDetails,
            shippingAddress: {
                userName: findUserDetails.username,
                email: user,
                phone: phone,
                address: id,
                street: street,
                city: city,
                state: state,
                zip: zip,
                country: country
            },
            paymentMethod: 'Razor Pay',
            razorpayId: razorpayOrder.id,
            totalAmount: totalAmount,
            originalAmount: originalAmount,
            orderStatus: 'Payment Pending'
        })

        const saveOrder = await newOrder.save()

        res.send({ order: razorpayOrder, orderId: saveOrder.id });
    } catch (error) {
        next(error);
    }
};


const verifyPayment = async (req, res, next) => {
    try {
        const { paymentId, orderId, signature, id } = req.body;

        const order = await orderModel.findById(id).populate('products.product');

        if (!order) {
            return res.status(400).json({ success: false, message: "Order not found" });
        }

        const generatedSignature = crypto.createHmac('sha256', process.env.RAZOR_KEY_SECRET)
            .update(orderId + "|" + paymentId)
            .digest('hex');

        if (generatedSignature === signature) {
            order.orderStatus = "Pending";
            await order.save();

            for (let item of order.products) {
                const product = await productModel.findById(item.product._id);

                if (!product) {
                    return console.log("Product not found:", item.product._id);
                }

                product.stock -= item.quantity;
                await product.save();
            }

            const cart = await cartModel.findOne({ userId: order.user });
            if (cart) {
                cart.items = [];
                await cart.save();
            }

            res.json({ success: true, orderId: order._id });
        } else {
            res.json({ success: false, message: "Verification failed." });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createInstance,
    verifyPayment
}