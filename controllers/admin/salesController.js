const orderModel = require('../../models/orderModel');

const loadSalesReport = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const queryType = req.query.type;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        let dateFilter = {};

        if (queryType) {
            const now = new Date();

            switch (queryType) {
                case 'Daily':
                    dateFilter = {
                        createdAt: {
                            $gte: new Date(now.setHours(0, 0, 0, 0)),
                            $lt: new Date(now.setHours(23, 59, 59, 999))
                        }
                    };
                    break;
                case 'Weekly':
                    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                    const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                    dateFilter = {
                        createdAt: {
                            $gte: new Date(weekStart.setHours(0, 0, 0, 0)),
                            $lt: new Date(weekEnd.setHours(23, 59, 59, 999))
                        }
                    };
                    break;
                case 'Yearly':
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    const yearEnd = new Date(now.getFullYear(), 11, 31);
                    dateFilter = {
                        createdAt: {
                            $gte: new Date(yearStart.setHours(0, 0, 0, 0)),
                            $lt: new Date(yearEnd.setHours(23, 59, 59, 999))
                        }
                    };
                    break;
                default:
                    break;
            }
        } else if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59, 999))
                }
            };
        }

        const fetchAllOrders = await orderModel.find({ 
            orderStatus: 'Delivered',
            ...dateFilter 
        }).sort({ createdAt: -1 }).limit(limit).skip(skip);

        const totalOrders = await orderModel.countDocuments({ 
            orderStatus: 'Delivered',
            ...dateFilter 
        });

        const totalPages = Math.ceil(totalOrders / limit);

        res.render('admin/salesreport', {
            fetchAllOrders,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loadSalesReport
};
