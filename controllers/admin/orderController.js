const orderModel = require('../../models/orderModel')

const loadOrders = async (req, res, next) => {
    try{
        const findAllOrders = await orderModel.find()
        
        res.render('admin/order', { orders: findAllOrders})
    }catch(error){
        next(error)
    }
}

const loadOrderView = async (req, res, next) => {
    try{
        res.render('admin/orderview')
    }catch(error){
        next(error)
    }
}

module.exports = {
    loadOrders,
    loadOrderView
}