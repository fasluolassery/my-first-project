const Products = require('../models/productModel')

const loadHome = async (req, res) => {
    try {
        const findAllProducts = await Products.find()
        res.render('user/homepage', {products: findAllProducts});
    } catch (error) {
        console.log("Error rendering home page:", error.message);
    }
};

module.exports = {
    loadHome
};

const sweet = (req, res) => {
    Swal.fire({
        title: "The Internet?",
        text: "That thing is still around?",
        icon: "question"
      });
}
