const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
const userModel = require('../../models/userModel')
const cartModel = require('../../models/cartModel')


const loadProductsUser = async (req, res) => {
    try {
        const findAllProducts = await Product.find({ isBlock: false })
        const findAllCategories = await Category.find({ isBlock: false })
        const { user } = req.session

        let findUser
        if (user) {

            findUser = await userModel.findOne({ email: user })
            const userId = findUser.id
            const findCart = await cartModel.findOne({ userId: userId }).populate('items.productId')

            if (findCart) {

                const userCartItems = findCart.items.map(pro => pro.productId)
                res.render('user/products', { products: findAllProducts, categories: findAllCategories, user: userId, userCartItems: userCartItems });

            } else {

                res.render('user/products', { products: findAllProducts, categories: findAllCategories, user: userId })

            }

        } else {

            res.render('user/products', { products: findAllProducts, categories: findAllCategories, user: user })
        }

        // console.log(findAllProducts)
    } catch (err) {
        console.log("Error loading products page in user side", err.message)
    }
}

const loadSingleProductUser = async (req, res) => {
    try {
        const productId = req.query.id;
        const findProduct = await Product.findOne({ _id: productId });

        const findRelatedProducts = await Product.find({ category: findProduct.category })
        // console.log(findRelatedProducts) //!to remove

        const { user } = req.session

        if (!findProduct) {
            throw new Error('Product not found');
        }

        const breadcrumbs = [
            { name: 'Home', url: '/' },
            { name: findProduct.category, url: `/category/${findProduct.category.toLowerCase()}` },
            { name: findProduct.productName, url: `/product?id=${findProduct._id}` }
        ];

        let findUser
        if (user) {

            findUser = await userModel.findOne({ email: user })
            const userId = findUser.id
            const findCart = await cartModel.findOne({ userId: userId }).populate('items.productId')


            if (findCart) {

                const userCartItems = findCart.items.map(pro => pro.productId)
                res.render('user/productview', { product: findProduct, breadcrumbs: breadcrumbs, relatedProducts: findRelatedProducts, user: userId, userCartItems: userCartItems });

            }else{

            res.render('user/productview', { product: findProduct, breadcrumbs: breadcrumbs, relatedProducts: findRelatedProducts, user: user });


            }

        } else {

            res.render('user/productview', { product: findProduct, breadcrumbs: breadcrumbs, relatedProducts: findRelatedProducts, user: user });

        }

    } catch (err) {
        console.log("Error loading single product", err.message);
        res.status(500).send("Internal Server Error");
    }
};



module.exports = {
   
    loadProductsUser,
    loadSingleProductUser,
};
