const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    userMail: {type: String, required:true, unique: true},
    otp: {type: Number, required:true},
    exprAt: {type: Date, default: Date.now, expires: 120}
})

const Otps = mongoose.model('Otps',otpSchema);

module.exports = Otps;