const orderModel = require('../../models/orderModel')

const loadOrders = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 5
        const skip = (page - 1) * limit

        const findAllOrders = await orderModel.find().sort({ createdAt: 1 }).limit(limit).skip(skip);
        const totalOrders = await orderModel.countDocuments();
        const totalPages = Math.ceil(totalOrders / limit);

        res.render('admin/order', { orders: findAllOrders, currentPage: page, totalPages })
    } catch (error) {
        next(error)
    }
}

const loadOrderView = async (req, res, next) => {
    try {
        res.render('admin/orderview')
    } catch (error) {
        next(error)
    }
}

const loadOrderDetails = async (req, res, next) => {
    try {
        const { orderId } = req.query

        if (!orderId) {
            return console.log("can't get order id at load order details")
        }

        const findOrder = await orderModel.findOne({ _id: orderId }).populate('user').populate('products.product')

        res.render('admin/orderdetails', { orderDetails: findOrder })
    } catch (error) {
        next(error)
    }
}

const changeOrderStatus = async (req, res, next) => {
    try {
        const { orderId, newStatus } = req.body

        if (newStatus.length <= 0) {
            return console.log("there is no new status to change at change order status")
        }

        if (!orderId) {
            return console.log("can't get orderid here at change order status")
        }

        const findOrder = await orderModel.findOne({ _id: orderId })

        if (!findOrder) {
            return console.log("can't find the order at change order status")
        }

        findOrder.orderStatus = newStatus

        const hello = await findOrder.save()

        if (hello) {
            res.send({ success: 7 })
        }

    } catch (error) {
        next(error)
    }
}

const cancelOrders = async (req, res, next) => {
    try {
        const { orderId } = req.body

        const findOrder = await orderModel.findById(orderId)

        findOrder.orderStatus = 'Cancelled'

        findOrder.products.forEach(val => {
            val.productStatus = 'Cancelled'
        })

        const update = await findOrder.save()

        if (update) {
            console.log("order canceled success at cancel order")
            res.send({ success: true })
        }

    } catch (error) {
        next(error)
    }
}

const changeProductStatus = async (req, res, next) => {
    try {
        const { productId, newStatus, orderId } = req.body

        const findOrder = await orderModel.findById(orderId)

        // findOrder.products.forEach(val => console.log(val.product.toString()))

        const find = findOrder.products.find(val => val.product.toString() == productId)

        find.productStatus = newStatus

        await findOrder.save()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    loadOrders,
    loadOrderView,
    loadOrderDetails,
    changeOrderStatus,
    cancelOrders,
    changeProductStatus,
}