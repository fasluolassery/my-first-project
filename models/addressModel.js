const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'Users'
    },
    addresses: [
        {
            name: {type: String, required: true},
            phone: {type: Number, required: true},
            street: {type: String, required: true},
            city: {type: String, required: true},
            state: {type: String, required: true},
            zip: {type: Number, required: true},
            country: {type: String, required: true}
        }
    ]

})

const address = mongoose.model('addresses', addressSchema)

module.exports = address