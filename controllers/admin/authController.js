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
        // Aggregating sales data for the line chart, considering only delivered orders
        const salesData = await orderModel.aggregate([
            {
                $match: { orderStatus: 'Delivered' } // Filter to include only delivered orders
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalSales: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: { _id: 1 } // Sort by month
            }
        ]);

        // Initialize all months with zero sales
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
        const totalProducts = await productModel.countDocuments({}); // Count all products

        // Get best-selling products
        const bestSellingProducts = await orderModel.aggregate([
            {
                $match: { orderStatus: 'Delivered' } // Filter to include only delivered orders
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
                $limit: 5 // Limit to top 5 best-selling products
            }
        ]);

        // Fetch product details for best-selling products
        const productIds = bestSellingProducts.map(p => p._id);
        const products = await productModel.find({ _id: { $in: productIds } }).select('productName'); // Fetch product names

        // Map product details to best-selling data
        const bestSellingDetails = bestSellingProducts.map(selling => {
            const product = products.find(p => p._id.toString() === selling._id.toString());
            return {
                name: product ? product.productName : "Unknown Product",
                count: selling.totalSold
            };
        });

        // Get top-selling categories
        const topCategories = await orderModel.aggregate([
            {
                $match: { orderStatus: 'Delivered' } // Filter to include only delivered orders
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
                $lookup: {
                    from: 'products',
                    localField: '_id',
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
                    totalSold: { $sum: "$totalSold" }
                }
            },
            {
                $sort: { totalSold: -1 }
            },
            {
                $limit: 5 // Limit to top 5 categories
            }
        ]);

        // Get products for top-selling categories
        const categoryProductPromises = topCategories.map(async (category) => {
            const productsInCategory = await orderModel.aggregate([
                {
                    $match: { orderStatus: 'Delivered' } // Filter to include only delivered orders
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
                    $match: { 'productDetails.category': category._id }
                },
                {
                    $group: {
                        _id: "$productDetails._id",
                        name: { $first: "$productDetails.productName" },
                        totalSold: { $sum: "$products.quantity" }
                    }
                },
                {
                    $sort: { totalSold: -1 }
                }
            ]);
            return { category: category._id, products: productsInCategory };
        });

        const categoryProducts = await Promise.all(categoryProductPromises);

        // Render the dashboard with the sales data, total revenue, total orders, total products, best-selling products, and top-selling categories
        res.render('admin/admindashboard', {
            salesLabels: JSON.stringify(monthNames),
            salesData: JSON.stringify(salesValues),
            totalRevenue: totalRevenue.toFixed(2), // Pass total revenue to the template
            totalOrders, // Pass total order count to the template
            totalProducts, // Pass total product count to the template
            bestSellingProducts: bestSellingDetails, // Pass best-selling products to the template
            topCategories: categoryProducts // Pass top-selling categories and products to the template
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