const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
const userModel = require('../../models/userModel')
const cartModel = require('../../models/cartModel')


const loadProductsUser = async (req, res, next) => {
    try {
        const findAllProducts = await Product.find({ isBlock: false })
        const findAllCategories = await Category.find({ isBlock: false })
        const { user, userId } = req.session

        res.render('user/products', { products: findAllProducts, categories: findAllCategories, user: userId })

        // console.log(findAllProducts)
    } catch (error) {
        next(error)
    }
}

const loadSingleProductUser = async (req, res, next) => {
    try {
        const productId = req.query.id;
        const findProduct = await Product.findOne({ _id: productId });

        const findRelatedProducts = await Product.find({ category: findProduct.category })
        // console.log(findRelatedProducts) //!to remove

        const { user, userId } = req.session

        if (!findProduct) {
            throw new Error('Product not found');
        }

        const breadcrumbs = [
            { name: 'Home', url: '/' },
            { name: findProduct.category, url: `/category/${findProduct.category.toLowerCase()}` },
            { name: findProduct.productName, url: `/product?id=${findProduct._id}` }
        ];

        res.render('user/productview', { product: findProduct, breadcrumbs: breadcrumbs, relatedProducts: findRelatedProducts, user: userId });
        

    } catch (error) {
        next(error)
    }
};

const sortProducts = async (req, res, next) => {
    try{
        const { index } = req.body
       if(index == 1){
        const findProducts = await Product.find().sort({ productName: 1})

        res.send({products: findProducts})
       }else if(index == 2){
        const findProducts = await Product.find().sort({ productName: -1})

        res.send({products: findProducts})
       }else if(index == 3){
        const findProducts = await Product.find().sort({ price: 1})

        res.send({products: findProducts})
       }else if(index == 4){
        const findProducts = await Product.find().sort({ price: -1})

        res.send({products: findProducts})
       }else if(!index){
        const findProducts = await Product.find()

        res.send({products: findProducts})
       }
    }catch(error){
        next(error)
    }
}



module.exports = {

    loadProductsUser,
    loadSingleProductUser,
    sortProducts,

};
