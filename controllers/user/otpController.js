const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const User = require('../../models/userModel');
const Otp = require('../../models/otpModel');
const transactionModel = require('../../models/transactionSchema')

const userVerifyOtp = async (req, res, next) => {
    try {
        const realOtp = req.session.userOtp
        const userTypedOtp = req.body.otp

        // console.log(userTypedOtp) //! to remove
        // console.log(realOtp) //! to remove

        if (userTypedOtp === realOtp) {
            const otpVerifyUser = req.session.userData

            let balance

            if(otpVerifyUser.refId.length > 0){
                const findRefUser = await User.findOne({_id: otpVerifyUser.refId})
                findRefUser.balance += 301
                await findRefUser.save()

                balance = 301

                const RefTransaction = new transactionModel({
                    userId: otpVerifyUser.refId,
                    amount: 301,
                    type: 'referral'
                })
    
                await RefTransaction.save()
            }else{
                balance = 0
            }

            const saveNewUser = new User({
                username: otpVerifyUser.username,
                email: otpVerifyUser.email,
                phone: otpVerifyUser.phone,
                password: otpVerifyUser.password,
                balance: balance,
                isVerified: true
            })


            const saving = await saveNewUser.save()
            if(saving){
                req.session.userId = saving.id

                if(otpVerifyUser.refId.length > 0){
                    
                    const RefTransactionNewUser = new transactionModel({
                        userId: saving.id,
                        amount: 301,
                        type: 'referral'
                    })

                    await RefTransactionNewUser.save()
                }

                console.log("user saved successfully")
                res.send({next: 1})
            }

            // res.send({ next: 1 })
        } else {
            res.send({ next: 0 })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userVerifyOtp
};
