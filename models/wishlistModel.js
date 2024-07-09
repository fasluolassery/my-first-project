const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'Users'
    },
    items: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'products'}}],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Wishlist = mongoose.model('wishlist', wishlistSchema)

module.exports = Wishlist;