const couponModel = require('../../models/couponModel')
const cartModel = require('../../models/cartModel')

const applyCoupon = async (req, res, next) => {
    try{
        const { couponCode } = req.body

        if(!couponCode){
            
            console.log("can't get coupon code")
            return res.send({error: 1})
        }

        const { userId }  = req.session

        if(!userId){
            return console.log("user not logged in")
        }

        const fetchCoupon = await couponModel.findOne({code: couponCode})

        if(!fetchCoupon){
            return console.log("coupon not found")
        }

        const currentDate = new Date();
        if (fetchCoupon.endDate < currentDate) {
            return console.log("Coupon has expired" )
        }

        //! to do
        // if (coupon.user <= coupon.timesUsed) {
        //     return res.status(400).json({ message: "Coupon usage limit reached" });
        // }
        // let hai = fetchCoupon.userList.find(val => {})

        const findCart = await cartModel.findOne({userId: userId}).populate('items.productId')

        const totalAmount = findCart.items.reduce((acc, val) => acc + (val.productId.price * val.quantity) ,0)

        const lastAmount = totalAmount - fetchCoupon.discountAmount

        res.send({disAmount: lastAmount})
        
    }catch(error){
        next(error)
    }
}

module.exports = {
    applyCoupon,
}