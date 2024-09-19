const mongoose = require("mongoose");
const moment = require('moment-timezone')

const transactionSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    amount: {type: Number, required: true},
    type: {type: String, enum: ['credit', 'debit', 'referral'], required: true},
    createdAt: {
        type: Date,
        default: () => moment().tz('Asia/Kolkata').toDate()
    }
})

const transaction = mongoose.model('transaction', transactionSchema)

module.exports = transaction