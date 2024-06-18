const cartModel = require('../../models/cartModel');
const Products = require('../../models/productModel')
const userModel = require('../../models/userModel');
const { userLoginDetails } = require('./authController');

const loadHome = async (req, res, next) => {
    try {
        
        const { user, userId } = req.session
        const findAllProducts = await Products.find({isBlock: false})
        if(user){
            
            res.render('user/homepage', {products: findAllProducts, user: userId})
        }else{
            res.render('user/homepage', {products: findAllProducts})
        }

    } catch (error) {
        next(error)
    }
};

const logout = async (req, res, next) => {
    try {
        const des = req.session.destroy()
        res.redirect('/login')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    loadHome,
    logout
};
