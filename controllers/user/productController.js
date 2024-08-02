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

        // Find the single product and populate offers
        let findProduct = await Product.findOne({ _id: productId }).populate('offers');
        
        if (!findProduct) {
            throw new Error('Product not found');
        }

        // Update the product price based on offers
        const productsWithUpdatedPrice = await updatedPrice([findProduct]);
        findProduct = productsWithUpdatedPrice[0]; // Extract the updated product

        // Find related products
        const findRelatedProducts = await Product.find({ category: findProduct.category }).populate('offers');

        const { user, userId } = req.session;

        const breadcrumbs = [
            { name: 'Home', url: '/' },
            { name: findProduct.category, url: `/category/${findProduct.category.toLowerCase()}` },
            { name: findProduct.productName, url: `/product?id=${findProduct._id}` }
        ];

        res.render('user/productview', { product: findProduct, breadcrumbs: breadcrumbs, relatedProducts: findRelatedProducts, user: userId });

    } catch (error) {
        next(error);
    }
};


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
        if (category == "All") {
            
        }else if(category){
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
    combinedController,
};
