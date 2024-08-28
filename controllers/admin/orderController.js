const orderModel = require('../../models/orderModel')
const userModel = require('../../models/userModel')
const transactionModel = require('../../models/transactionSchema')
const productModel = require('../../models/productModel')

const loadOrders = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 5
        const skip = (page - 1) * limit

        const findAllOrders = await orderModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
        const totalOrders = await orderModel.countDocuments();
        const totalPages = Math.ceil(totalOrders / limit);

        // Fetch return requests
        const returnRequests = await orderModel.find({ 'products.returnRequested': true }).sort({ createdAt: -1})
            .populate('products.product') // Populate product details
            
        const returnRequestsCount = await orderModel.find({ 'products.returnRequested': true }).countDocuments();

        res.render('admin/order', { orders: findAllOrders, currentPage: page, totalPages, reqCount: returnRequestsCount, returns: returnRequests })
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

        const findOrder = await orderModel.findById(orderId)

        if (!findOrder) {
            return console.log("can't find the order at change order status")
        }

        findOrder.orderStatus = newStatus

        findOrder.products.forEach(val => {

            val.productStatus = newStatus
        })


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

        const allCancelled = findOrder.products.every(p => p.productStatus === newStatus);

        if (allCancelled) {
            findOrder.orderStatus = newStatus;
        }

        await findOrder.save()

    } catch (error) {
        next(error)
    }
}

const updateReturnRequest = async (req, res, next) => {
    try {
        const { orderId, productId, status } = req.body;

        if (!orderId || !productId || !status) {
            return res.status(400).json({ message: 'Order ID, Product ID, and Status are required' });
        }

        const order = await orderModel.findOne({ _id: orderId, 'products.product': productId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const product = order.products.find(val => val.product.toString() === productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found in the order' });
        }

        const findUser = await userModel.findById(order.user);

        if (!findUser) {
            return console.log("User not found at updateReturnRequest");
        }

        product.returnStatus = status;

        if (status === 'Approved') {
            product.productStatus = 'Returned';

            // Return the user's money regardless of the reason
            findUser.balance += product.price * product.quantity; // Increment balance by the total price of the returned products

            // Create a transaction record
            const transaction = new transactionModel({
                userId: findUser.id,
                amount: product.price * product.quantity, // Total amount credited back to the user
                type: 'credit'
            });

            await transaction.save();

            // Update stock only if the return reason is not 'Product is damaged'
            if (product.returnReason !== 'Product is damaged') {
                const productToUpdate = await productModel.findById(productId);
                if (productToUpdate) {
                    productToUpdate.stock += product.quantity; // Increment stock by the quantity returned
                    await productToUpdate.save();
                } else {
                    return res.status(404).json({ message: 'Product not found in the inventory' });
                }
            }
        }

        const allReturned = order.products.every(p => p.returnStatus === 'Approved');

        if (allReturned) {
            order.orderStatus = 'Returned';
        }

        await order.save();

        res.status(200).json({ success: 'Return request updated successfully' });
    } catch (error) {
        next(error);
    }
};





module.exports = {
    loadOrders,
    loadOrderView,
    loadOrderDetails,
    changeOrderStatus,
    cancelOrders,
    changeProductStatus,
    updateReturnRequest,
}