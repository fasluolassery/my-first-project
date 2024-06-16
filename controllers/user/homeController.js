const cartModel = require('../../models/cartModel');
const Products = require('../../models/productModel')
const userModel = require('../../models/userModel')

const loadHome = async (req, res) => {
    try {
        const findAllProducts = await Products.find({ isBlock: false })
        const { user } = req.session
        let findUser
        if (user) {

            findUser = await userModel.findOne({ email: user })
            const userId = findUser.id
            const findCart = await cartModel.findOne({ userId: userId }).populate('items.productId')

            if (findCart) {

                const userCartItems = findCart.items.map(pro => pro.productId)
                res.render('user/homepage', { products: findAllProducts, user: userId });

            }else{

            res.render('user/homepage', { products: findAllProducts, user: userId });

            }

        } else {

            res.render('user/homepage', { products: findAllProducts, user: user });
        }

    } catch (error) {
        console.log("Error rendering home page:", error.message);
    }
};

const logout = async (req, res) => {
    try {
        const des = req.session.destroy()
        res.redirect('/login')
    } catch (err) {
        console.log("Error at logout: ", err.message)
    }
}

module.exports = {
    loadHome,
    logout
};
