const { validationResult } = require('express-validator');
const userModel = require('../../models/userModel')
const orderModel = require('../../models/orderModel')
const productModel = require('../../models/productModel')
const bcrypt = require('bcrypt')

const loadAdminLogin = async (req, res, next) => {
    try {
        res.render('admin/adminlogin');
    } catch (error) {
        next(error)
    }
};

const loadAdminDashboard = async (req, res, next) => {
    try {
        // sales data
        const salesData = await orderModel.aggregate([
            {
                $match: { orderStatus: 'Delivered' }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalSales: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Initialize all months
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const salesValues = new Array(12).fill(0);

        // Populate sales values based on data
        salesData.forEach(item => {
            salesValues[item._id - 1] = item.totalSales;
        });

        // Count total delivered orders
        const totalOrders = await orderModel.countDocuments({
            orderStatus: 'Delivered'
        });

        // Calculate total revenue
        const totalRevenue = salesValues.reduce((sum, value) => sum + value, 0);

        // Count total products
        const totalProducts = await productModel.countDocuments({});

        // Get best-selling products
        const bestSellingProducts = await orderModel.aggregate([
            {
                $match: { orderStatus: 'Delivered' }
            },
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: "$products.product",
                    totalSold: { $sum: "$products.quantity" }
                }
            },
            {
                $sort: { totalSold: -1 }
            },
            {
                $limit: 5
            }
        ]);

        // Fetch product details for best selling products
        const productIds = bestSellingProducts.map(p => p._id);
        const products = await productModel.find({ _id: { $in: productIds } }).select('productName');

        // Map product details to best selling data
        const bestSellingDetails = bestSellingProducts.map(selling => {
            const product = products.find(p => p._id.toString() === selling._id.toString());
            return {
                name: product ? product.productName : "Unknown Product",
                count: selling.totalSold
            };
        });

        // Get top selling categories with total sold
        const topCategories = await orderModel.aggregate([
            {
                $match: { orderStatus: 'Delivered' }
            },
            {
                $unwind: "$products"
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $group: {
                    _id: "$productDetails.category",
                    totalSold: { $sum: "$products.quantity" },
                    products: { $push: { name: "$productDetails.productName", productId: "$productDetails._id" } }
                }
            },
            {
                $sort: { totalSold: -1 }
            },
            {
                $limit: 5
            }
        ]);

        // Map category data
        const categoryProducts = await Promise.all(
            topCategories.map(async (category) => {
                const topProductsInCategory = category.products.slice(0, 5);
                return {
                    category: category._id,
                    totalSold: category.totalSold,
                    products: await Promise.all(topProductsInCategory.map(async (p) => {
                        const totalSold = await orderModel.aggregate([
                            { $match: { "products.product": p.productId, orderStatus: 'Delivered' } },
                            { $unwind: "$products" },
                            { $match: { "products.product": p.productId } },
                            { $group: { _id: null, totalSold: { $sum: "$products.quantity" } } }
                        ]).then(result => result[0]?.totalSold || 0);
                        return { name: p.name, totalSold };
                    }))
                };
            })
        );

        res.render('admin/admindashboard', {
            salesLabels: JSON.stringify(monthNames),
            salesData: JSON.stringify(salesValues),
            totalRevenue: totalRevenue.toFixed(2),
            totalOrders,
            totalProducts,
            bestSellingProducts: bestSellingDetails,
            topCategories: categoryProducts
        });
    } catch (error) {
        next(error);
    }
}


const verifyAdminLogin = async (req, res, next) => {
    try {
        const AdminValidationErrors = validationResult(req)

        if (!AdminValidationErrors.isEmpty()) {
            return console.log('error', validationErrors.array())
        }

        const { loginEmail, loginPassword } = req.body

        const findAdmin = await userModel.findOne({ email: loginEmail })

        if (!findAdmin) {
            res.send({ next: 0 })
            return console.log("Error: Admin Not Found")
        }

        if (!findAdmin.isAdmin) {
            res.send({ next: 0 })
            return console.log("Error: Admin Not Found")
        }

        const adminPass = await bcrypt.compare(loginPassword, findAdmin.password)

        if (!adminPass) {
            res.send({ next: 100 })
            return console.log("Error: Incorrect password")
        }

        req.session.admin = loginEmail
        res.send({ next: 1 })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    loadAdminLogin,
    verifyAdminLogin,
    loadAdminDashboard
}