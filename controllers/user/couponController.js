const applyCoupon = async (req, res, next) => {
    try{
        const { couponCode } = req.body

        if(!couponCode){
            return console.log("can't get coupon code")
        }

        // ! to continue
    }catch(error){
        next(error)
    }
}

module.exports = {
    applyCoupon,
}