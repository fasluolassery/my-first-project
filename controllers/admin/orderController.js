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

const loadOrderDetails = async (req, res, next) => {
    try{
        const { orderId } = req.query

        if(!orderId){
            return console.log("can't get order id at load order details")
        }

        const findOrder = await orderModel.findOne({ _id: orderId }).populate('user').populate('products.product')
        
        res.render('admin/orderdetails', { orderDetails: findOrder})
    }catch(error){
        next(error)
    }
}

const changeOrderStatus = async (req, res, next) => {
    try{
        const { orderId, newStatus } = req.body

        if(newStatus.length <= 0){
            return console.log("there is no new status to change at change order status")
        }

        console.log(orderId)

        if(!orderId){
            return console.log("can't get orderid here at change order status")
        }

        const findOrder = await orderModel.findOne({ _id: orderId})

        if(!findOrder){
            return console.log("can't find the order at change order status")
        }

        findOrder.orderStatus = newStatus

        const hello = await findOrder.save()

        if(hello){
            res.send({ success: 7})
        }

    }catch(error){
        next(error)
    }
}

const cancelOrders = async (req, res, nest) => {
    try{
        const { orderId } = req.body

        const findOrderAndDelete = await orderModel.findByIdAndDelete(orderId)

        if(findOrderAndDelete){
            console.log("order Deleted success at cancel order")
            res.send({ success: true})
        }

    }catch(error){
        next(error)
    }
}

module.exports = {
    loadOrders,
    loadOrderView,
    loadOrderDetails,
    changeOrderStatus,
    cancelOrders,
}