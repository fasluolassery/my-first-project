const otpGenerator = require('otp-generator');
const couponModel = require('../../models/couponModel')

const loadCoupons = async (req, res, next) => {
    try{

        const findAllCoupons = await couponModel.find().sort({createdAt: 1})

        res.render('admin/coupons', {coupons: findAllCoupons})
    }catch(error){
        next(error)
    }
}

const loadCreateCoupon = async (req, res, next) => {
    try{
        res.render('admin/createcoupon')
    }catch(error){
        next(error)
    }
}

const createCoupon = async (req, res, next) => {
    try{
        const { name, amount, startDate, endDate, minPurchaseAmount, description} = req.body

        const existingCoupon = await couponModel.findOne({name: name})

        if(existingCoupon){
            console.log("this coupon already exists")
            return res.send({error: 5})
        }

        const code = otpGenerator.generate(4, { lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false })

        const newCoupon = new couponModel({
            name: name,
            code: name.toUpperCase() + code,
            description: description,
            discountAmount: amount,
            startDate: startDate,
            endDate: endDate,
            minPurchaseAmount: minPurchaseAmount
        })

        const saveNewCoupon = await newCoupon.save()

        if(saveNewCoupon){
            console.log("success created new coupon")
            res.send({success: 7})
        }
    }catch(error){
        next(error)
    }
}

const deleteCoupon = async (req, res, next) => {
    try{
        const { couponId } = req.body

        if(!couponId){
            return console.log("can't get any coupon id at delete coupon")
        }

        const deleting = await couponModel.findByIdAndDelete(couponId)

        if(deleting){
            console.log('deleting coupon success')
            res.send({success: 7})
        }


    }catch(error){
        next(error)
    }
}

module.exports = {
    loadCoupons,
    loadCreateCoupon,
    createCoupon,
    deleteCoupon,
}