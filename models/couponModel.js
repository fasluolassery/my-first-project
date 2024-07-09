const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    discountAmount: {type: Number, required: true},
    startDate: {type: Date},
    endDate: {type: Date},
    minPurchaseAmount: {type: Number, required: true},
})

const coupon = mongoose.model('coupon', couponSchema)

module.exports = coupon