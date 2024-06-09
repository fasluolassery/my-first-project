const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'Users'},
    items: [{productId: mongoose.Schema.Types.ObjectId, quantity: Number}],
    createdAt: {type: Date, default: Date.now}
})

const Carts = mongoose.model('carts', cartSchema)

module.exports = Carts;