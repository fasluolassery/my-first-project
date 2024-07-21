const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: false,
        trim: true
    },
    price: {type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    imagePaths: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offer' }]
})

const Products = mongoose.model('products', productSchema)
module.exports = Products