const Products = require('../models/productModel')

const loadHome = async (req, res) => {
    try {
        const findAllProducts = await Products.find({isBlock: false})
        res.render('user/homepage', {products: findAllProducts});
    } catch (error) {
        console.log("Error rendering home page:", error.message);
    }
};

const logout = async (req, res) => {
    try{
        const des = req.session.destroy()
        res.redirect('/home')
    }catch(err){
        console.log("Error at logout: ", err.message)
    }
}

module.exports = {
    loadHome,
    logout
};
