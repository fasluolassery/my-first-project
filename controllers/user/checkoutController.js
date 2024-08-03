const addressModel = require('../../models/addressModel')
const cartModel = require('../../models/cartModel')
const couponModel = require('../../models/couponModel')

const loadCheckout = async (req, res, next) => {
    try {
        const { userId } = req.session

        if (!userId) {
            return console.log("user is not found in checkout")
        }

        const findUserCart = await cartModel.findOne({ userId: userId }).populate('items.productId')

        if (!findUserCart) {
            return console.log("can't find user cart in loadcheckout")
        }

        let findAddresses = await addressModel.findOne({ userId: userId })

        let addresses

        if (!findAddresses) {
            // console.log("Can't find findAddresses in loadcheckout")
            addresses = []
        } else {
            addresses = findAddresses.addresses
        }



        const findCoupons = await couponModel.find()

        if (!findCoupons) {
            return console.log("Can't find coupons in loadcheckout")
        }

        res.render('user/checkoutpage', { addresses: addresses, userCartItems: findUserCart.items, coupons: findCoupons })

    } catch (error) {
        next(error)
    }
}

const checkoutTotal = async (req, res, next) => {
    try {
        const { userId } = req.session;

        const findUserCart = await cartModel.findOne({ userId: userId }).populate('items.productId');

        if (!findUserCart) {
            return res.status(404).send({ error: "User cart not found" });
        }

        const itemsWithEffectivePrice = findUserCart.items.map(item => {
            const product = item.productId;
            const effectivePrice = product.offerPrice > 0 ? product.offerPrice : product.price;

            return {
                productId: product._id,
                productName: product.productName,
                effectivePrice: effectivePrice,
                quantity: item.quantity
            };
        });

        res.send({ productsDetails: itemsWithEffectivePrice });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    loadCheckout,
    checkoutTotal,
}