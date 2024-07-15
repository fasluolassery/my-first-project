const razorPay = require('razorpay')

const razInstance = new razorPay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
})

module.exports = razInstance