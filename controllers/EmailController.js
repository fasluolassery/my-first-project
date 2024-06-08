const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const Otp = require('../models/otpModel');
const User = require('../models/userModel')


const loadVerifyOtp = async (req, res) => {
    try{
        const newUser = req.session.user

        console.log(newUser.email) //! to remove
        // const findMail = await User.findOne({email: newUser.email})
        // console.log(findMail.email) //! to remove

        const otpGen = otpGenerator.generate(4,{lowerCaseAlphabets:false,specialChars:false,upperCaseAlphabets:false})
        console.log("Generated otp:", otpGen) //! to remove
            req.session.userOtp = otpGen;

        const sender = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.USER_PASS
            }
        })
        
        const otpSave = new Otp({
            userMail: newUser.email,
            otp: otpGen
        })
        
        const otpSaving = await otpSave.save()
        if(!otpSaving){
            return console.log("Error in otp saving")
        }

        const emailToSend = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: "Your One-Time Password (OTP) for Gadget-Galaxy Website Login",
            text: `Your One-Time Password (OTP) for logging into our website is:  "${otpGen}".  Please use this code within the next few seconds to complete the sign process. Thank you for using our services.`
        };
        
        sender.sendMail(emailToSend, (error, info) => {
            if(error){
                console.log(error)
            }else{
                console.log("otp mail send:") //todo , info.response
            }
        })

        const otpSchema = Otp.schema;
        const ttlValue = otpSchema.obj.exprAt.expires
        

        const timeToSend = otpSaving.exprAt.getTime()

        console.log("ttlExpireValue:", ttlValue)
        console.log("timeToSend: ", timeToSend)
        // console.log(timeToSend) //! to remove

        res.render('user/otppage', {timeToSend,ttlValue})
        
    }catch(error){
        console.log("Error loading otp page:", error.message)
    }
}

module.exports = {
    loadVerifyOtp
};
