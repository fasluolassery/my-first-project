const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
const userModel = require('../../models/userModel')
const cartModel = require('../../models/cartModel')

const updatedPrice = async (products) => {
    try {
        const updatedProducts = await Promise.all(products.map(async (product) => {

            const activeOffers = product.offers.filter(offer => new Date(offer.endDate) > new Date());

            if (activeOffers.length > 0) {

                const latestOffer = activeOffers[activeOffers.length - 1];

                product.offerPrice = product.price - latestOffer.discount;

            } else {

                product.offerPrice = 0;
            }

            await product.save();

            return product;

        }));

        return updatedProducts;

    } catch (error) {
        console.log(error)
    }
}

const loadProductsUser = async (req, res, next) => {
    try {
        let findAllProducts = await Product.find({ isBlock: false }).populate('offers')
        const findAllCategories = await Category.find({ isBlock: false })
        const { user, userId } = req.session

        const isProduct = true

        findAllProducts = await updatedPrice(findAllProducts)

        res.render('user/products', { products: findAllProducts, categories: findAllCategories, user: userId, isProduct: isProduct })

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
    try {
        const { index } = req.body
        if (index == 1) {
            const findProducts = await Product.find().sort({ productName: 1 })

            res.send({ products: findProducts })
        } else if (index == 2) {
            const findProducts = await Product.find().sort({ productName: -1 })

            res.send({ products: findProducts })
        } else if (index == 3) {
            const findProducts = await Product.find().sort({ price: 1 })

            res.send({ products: findProducts })
        } else if (index == 4) {
            const findProducts = await Product.find().sort({ price: -1 })

            res.send({ products: findProducts })
        } else if (!index) {
            const findProducts = await Product.find()

            res.send({ products: findProducts })
        }
    } catch (error) {
        next(error)
    }
}

const combinedController = async (req, res, next) => {
    try {
        const { value, category, index } = req.body;

        console.log(req.body)

        let query = {};

        // Search by value
        if (value && value.length > 0) {
            query.productName = new RegExp(value, 'i');
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        let findProducts = Product.find(query);

        // Sort products
        if (index) {
            switch (index) {
                case 1:
                    findProducts = findProducts.sort({ productName: 1 });
                    break;
                case 2:
                    findProducts = findProducts.sort({ productName: -1 });
                    break;
                case 3:
                    findProducts = findProducts.sort({ price: 1 });
                    break;
                case 4:
                    findProducts = findProducts.sort({ price: -1 });
                    break;
                default:
                    break;
            }
        }

        const products = await findProducts;

        res.send({ products });
    } catch (error) {
        next(error);
    }
};




module.exports = {

    loadProductsUser,
    loadSingleProductUser,
    sortProducts,
    combinedController,
};
