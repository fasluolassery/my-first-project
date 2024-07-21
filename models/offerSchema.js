const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    offerType: { type: String, enum: ['product', 'category', 'referral'], required: true},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products'},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
    discount: { type: Number, required: true, min: 0},
    startDate: { type: Date},
    endDate: { type: Date}
})

const offer = mongoose.model('offer', offerSchema)

module.exports = offer