const mongoose = require('mongoose');
const Products = require('./productModel');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'Users'
    },
    items: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
         quantity: Number
        }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Carts = mongoose.model('carts', cartSchema)

module.exports = Carts;