const couponModel = require('../../models/couponModel')
const cartModel = require('../../models/cartModel')

const applyCoupon = async (req, res, next) => {
    try {
        const { couponCode } = req.body

        if (!couponCode) {
            console.log("can't get coupon code")
            return res.send({ error: 1 })
        }

        const { userId } = req.session

        if (!userId) {
            return console.log("user not logged in")
        }

        const fetchCoupon = await couponModel.findOne({ code: couponCode })

        if (!fetchCoupon) {
            console.log("coupon not found")
            return res.send({ error: '*coupon not found' })
        }

        const currentDate = new Date();
        if (fetchCoupon.endDate && fetchCoupon.endDate < currentDate) {
            console.log("Coupon has expired");
            return res.send({ error: '*coupon has expired' })
        }

        if (fetchCoupon.startDate && fetchCoupon.startDate > currentDate) {
            console.log("Coupon not valid yet");
            return res.send({ error: '*Coupon not valid yet' })
        }

        if (fetchCoupon.userList.some(user => user.userId === userId)) {
            console.log("Coupon already used by this user");
            return res.send({ error: '*Coupon already used' })
        }

        const findCart = await cartModel.findOne({ userId: userId }).populate('items.productId');

        if (!findCart) {
            return console.log("Cart not found for user");
        }

        const totalAmount = findCart.items.reduce((acc, val) => acc + (val.productId.price * val.quantity), 0);

        if (totalAmount < fetchCoupon.minPurchaseAmount) {
            console.log("Minimum purchase amount not met");
            return res.send({ error: '*Minimum purchase amount not met' })
        }

        const lastAmount = totalAmount - fetchCoupon.discountAmount;

        await fetchCoupon.save();

        res.send({ discountedAmount: lastAmount + 40 });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    applyCoupon,
}