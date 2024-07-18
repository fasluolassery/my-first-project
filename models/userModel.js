const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

// User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBlock: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(findOrCreate)

const Users = mongoose.model('users', userSchema);

module.exports = Users;