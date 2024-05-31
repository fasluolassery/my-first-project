const express = require('express')
const userRouter = express()
const passport = require('passport')
const { ensureAuthenticated } = require('../middlewares/authMiddleware')    
// -------------------------------

const userValidation = require('../middlewares/userValidation')
const authController = require('../controllers/AuthController')
const homeController = require('../controllers/HomeController')
const otpController = require('../controllers/OtpController')
const emailController = require('../controllers/EmailController')
const productController = require('../controllers/ProductController')
// ------------------------------------------------------------

userRouter.get('/', homeController.loadHome)
userRouter.get('/home', homeController.loadHome)
userRouter.get('/login', authController.loadRegister)
userRouter.get('/verifyotp', emailController.loadVerifyOtp)
userRouter.get('/products', productController.loadProductsUser)
userRouter.get('/productview', productController.loadSingleProductUser)
userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
userRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.userLoginGoogle)


userRouter.post('/register', userValidation.validateRegistration, authController.userRegisterDetails)
userRouter.post('/verifyotp', otpController.userVerifyOtp)
userRouter.post('/login', userValidation.validateLogin, authController.userLoginDetails)





// userRouter.get('/profile', ensureAuthenticated, (req, res) => {
//     res.render('profile', { user: req.user });
// });


module.exports = userRouter