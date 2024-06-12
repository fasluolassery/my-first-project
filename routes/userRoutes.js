const express = require('express')
const userRouter = express()
const passport = require('passport')
const { ensureAuthenticated } = require('../middlewares/authMiddleware')    
// ---------------------------------------------------------------------

const userValidation = require('../middlewares/userValidation')
const authController = require('../controllers/AuthController')
const homeController = require('../controllers/HomeController')
const otpController = require('../controllers/OtpController')
const emailController = require('../controllers/EmailController')
const productController = require('../controllers/ProductController')
const cartController = require('../controllers/CartController')
// ------------------------------------------------------------------

const sessionCheckUser = require('../middlewares/sessionCheck')
// ------------------------------------------------------------

userRouter.get('/', homeController.loadHome)
userRouter.get('/home', homeController.loadHome)
userRouter.get('/login', sessionCheckUser.isLogout, authController.loadRegister)
userRouter.get('/verifyotp', emailController.loadVerifyOtp)
userRouter.get('/products', sessionCheckUser.isLogin,productController.loadProductsUser)
userRouter.get('/productview', sessionCheckUser.isLogin,productController.loadSingleProductUser)
userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
userRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.userLoginGoogle)
userRouter.get('/cart', sessionCheckUser.isLogin,cartController.loadCart)
userRouter.get('/logout', sessionCheckUser.isLogin,homeController.logout)


userRouter.post('/register', userValidation.validateRegistration, authController.userRegisterDetails)
userRouter.post('/verifyotp', otpController.userVerifyOtp)
userRouter.post('/login', userValidation.validateLogin, authController.userLoginDetails)
userRouter.post('/addtocart', cartController.getProductsToAdd)
userRouter.post('/removeProductFromCart', cartController.removeProduct)



module.exports = userRouter