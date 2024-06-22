const orderModel = require('../../models/orderModel')
const cartModel = require('../../models/cartModel')

const placeOrder = async (req, res, next) => {
    try{
        console.log(req.body)
        const { userId } = req.session
        const products = await cartModel.findOne({ userId: userId})
        
    }catch(error){
        next(error)
    }
}

module.exports = {
    placeOrder,

}