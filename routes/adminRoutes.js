const express = require('express')
const adminRouter = express()
// -------------------------------

const adminValidation = require('../middlewares/adminValidation')
const authController = require('../controllers/AuthController')
const userController = require('../controllers/UserController')
const categoryController = require('../controllers/CategoryController')
const productController = require('../controllers/ProductController')
const upload = require('../middlewares/multerConfig')



adminRouter.get('/', authController.loadAdminLogin)
adminRouter.get('/login', authController.loadAdminLogin)
adminRouter.get('/dashboard', authController.loadAdminDashboard)
adminRouter.get('/users', userController.loadUsers)
adminRouter.get('/category', categoryController.loadCategory)
adminRouter.get('/products', productController.loadProducts)
adminRouter.get('/createproducts', productController.loadCreateProducts)
adminRouter.get('/editproducts', productController.loadEditProduct)
adminRouter.get('/createuser', userController.loadCreateUser)


adminRouter.post('/login', adminValidation.validateLoginAdmin, authController.verifyAdminLogin) //todo 
adminRouter.post('/blockuser/:id', userController.blockUser)
adminRouter.post('/category', categoryController.getCategoryDetails)
adminRouter.post('/unlistcategory/:id', categoryController.unlistCategory)
adminRouter.post('/updatecategory', categoryController.updateCategory)
adminRouter.post('/createproducts', upload.array('images', 3),productController.createProducts)
adminRouter.post('/unlistproduct/:id', productController.unlistProducts)
adminRouter.post('/editproducts',  upload.array('images', 3), productController.editProducts)
adminRouter.post('/createuser', userController.createUser)



module.exports = adminRouter