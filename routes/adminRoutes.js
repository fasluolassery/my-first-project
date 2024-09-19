const express = require('express')
const adminRouter = express()
// -------------------------------

const adminValidation = require('../config/adminValidation')
const authController = require('../controllers/admin/authController')
const userController = require('../controllers/admin/userController')
const categoryController = require('../controllers/admin/categoryController')
const productController = require('../controllers/admin/productController')
const orderController = require('../controllers/admin/orderController')
const couponController = require('../controllers/admin/couponController')
const offerController = require('../controllers/admin/offerController')
const salesController = require('../controllers/admin/salesController')
const upload = require('../config/multerConfig')



adminRouter.get('/', authController.loadAdminLogin)
adminRouter.get('/login', authController.loadAdminLogin)
adminRouter.get('/dashboard', authController.loadAdminDashboard)
adminRouter.get('/users', userController.loadUsers)
adminRouter.get('/category', categoryController.loadCategory)
adminRouter.get('/products', productController.loadProducts)
adminRouter.get('/createproducts', productController.loadCreateProducts)
adminRouter.get('/editproducts', productController.loadEditProduct)
adminRouter.get('/createuser', userController.loadCreateUser)
adminRouter.get('/orders', orderController.loadOrders)
adminRouter.get('/orderview', orderController.loadOrderView)
adminRouter.get('/orderdetails', orderController.loadOrderDetails)
adminRouter.get('/coupons', couponController.loadCoupons)
adminRouter.get('/createCoupon', couponController.loadCreateCoupon)
adminRouter.get('/editCoupon', couponController.loadEditCoupon)
adminRouter.get('/offers', offerController.loadOffers)
adminRouter.get('/createOffer', offerController.loadCreateOffer)
adminRouter.get('/salesReport', salesController.loadSalesReport)



adminRouter.post('/login', adminValidation.validateLoginAdmin, authController.verifyAdminLogin) //todo
adminRouter.post('/blockuser/:id', userController.blockUser)
adminRouter.post('/category', categoryController.getCategoryDetails)
adminRouter.post('/unlistcategory/:id', categoryController.unlistCategory)
adminRouter.post('/updatecategory', categoryController.updateCategory)
adminRouter.post('/createproducts', upload.array('images', 3),productController.createProducts)
adminRouter.post('/unlistproduct/:id', productController.unlistProducts)
adminRouter.post('/editproducts',  upload.array('images', 3), productController.editProducts)
adminRouter.post('/createuser', userController.createUser)
adminRouter.post('/changeOrderStatus', orderController.changeOrderStatus)
adminRouter.post('/changeProductStatus', orderController.changeProductStatus)
adminRouter.post('/cancelOrder', orderController.cancelOrders)
adminRouter.post('/updateReturnRequest', orderController.updateReturnRequest)
adminRouter.post('/createCoupon', couponController.createCoupon)
adminRouter.post('/editCoupon', couponController.editCoupon)
adminRouter.post('/deleteCoupon', couponController.deleteCoupon)
adminRouter.post('/createOffer', offerController.createOffer)
adminRouter.post('/deleteOffer', offerController.deleteOffer)





module.exports = adminRouter