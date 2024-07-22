const orderModel = require('../../models/orderModel')

const loadSalesReport = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const fetchAllOrders = await orderModel.find({ orderStatus: 'Delivered' }).sort({ createdAt: 1 }).limit(limit).skip(skip)

        const totalOrders = await orderModel.countDocuments({ orderStatus: 'Delivered' });

        const totalPages = Math.ceil(totalOrders / limit);

        res.render('admin/salesreport', {
            fetchAllOrders,
            currentPage: page,
            totalPages
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    loadSalesReport
}