const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            name: { type: String, required: true},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
            productStatus: {type: String, required: true},
            returnRequested: { type: Boolean, default: false },
            returnStatus: { type: String, default: 'None' },
            returnReason: { type: String}
        }
    ],
    shippingAddress: {
        userName: { type: String, required: true},
        email: {type: String, required: true},
        phone: {type: Number, required: true},
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'addresses',
        },
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: Number, required: true},
        country: {type: String, required: true}
    },
    paymentMethod: {type: String},
    razorpayId: {type: String},
    totalAmount: {type: Number, required: true},
    originalAmount: {type: Number, required: true},
    orderStatus: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const order = mongoose.model('orders', orderSchema)

module.exports = order