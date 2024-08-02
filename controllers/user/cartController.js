const productModel = require('../../models/productModel')
const cartModel = require('../../models/cartModel')
const userModel = require('../../models/userModel')

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

const loadCart = async (req, res, next) => {
    try {
        const { userId } = req.session

        const findUserCartItems = await cartModel.findOne({ userId: userId }).populate('items.productId')

        if (findUserCartItems) {

            findUserCartItems.items.forEach(val => {
                val.quantity = 1
            })

            const resetQuantityofProducts = await findUserCartItems.save()

            const userCartItems = findUserCartItems.items.map(pro => pro.productId)
            // console.log(userCartItems) //!to remove
            if (userCartItems.length > 0) {
                const itIsCart = true

                res.render('user/cartpage', { cartItems: userCartItems, user: userId, itIsCart: itIsCart })
            } else {
                res.render('user/emtycart', { user: userId })
            }

        } else {
            res.render('user/emtycart', { user: userId })
        }

    } catch (error) {
        next(error)
    }
}

const getProductsToAdd = async (req, res, next) => {
    try {
        const { productId } = req.body;

        if (!req.session.user) {
            console.log("User is not logged in to add product to cart");
            return res.send({ status: 1 });
        }

        const { user } = req.session;

        const findUserData = await userModel.findOne({ email: user });

        if (!findUserData) {
            console.log("User session out");
            return res.send({ status: 1 });
        }

        const product = await productModel.findById(productId).populate('offers');

        if (!product) {
            return res.send({ status: 1, message: 'Product not found' });
        }

        // Calculate updated price with offers
        const productsWithUpdatedPrice = await updatedPrice([product]);
        const updatedProduct = productsWithUpdatedPrice[0];

        let userCart = await cartModel.findOne({ userId: findUserData.id });

        if (!userCart) {
            const newCart = new cartModel({
                userId: findUserData.id,
                items: [{ productId: productId, quantity: 1, price: updatedProduct.offerPrice > 0 ? updatedProduct.offerPrice : updatedProduct.price }]
            });

            const saveCart = await newCart.save();

            if (saveCart) {
                res.send({ status: 2 });
            }
        } else {
            const itemIndex = userCart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                res.send({ status: 3 });
            } else {
                userCart.items.push({ productId, quantity: 1, price: updatedProduct.offerPrice > 0 ? updatedProduct.offerPrice : updatedProduct.price });

                await userCart.save();
                res.send({ status: 2 });
            }
        }

    } catch (error) {
        next(error);
    }
};

const removeProduct = async (req, res, next) => {
    try {

        const { userId, productId } = req.body;
        const findUserCart = await cartModel.findOne({ userId: userId });
        const findProductIndex = findUserCart.items.findIndex(item => item.productId == productId);

        if (findProductIndex !== -1) {
            const updatedCart = await cartModel.updateOne(
                { userId: userId },
                { $pull: { items: { productId: productId } } }
            );
            if (updatedCart) {
                res.send({ status: 2 })
            }
        }

    } catch (error) {
        next(error)
    }
}

const addQuantity = async (req, res, next) => {
    try {
        let { productId, quantity } = req.body;
        const { userId } = req.session;

        if (!userId) {
            return console.log("User ID is not present");
        }

        const findProductCart = await cartModel.findOne({ userId: userId });

        if (!findProductCart) {
            return console.log("Cart not found");
        }

        const product = await productModel.findById(productId).populate('offers');

        if (!product) {
            return console.log("Product not found");
        }

        // Calculate updated price with offers
        const productsWithUpdatedPrice = await updatedPrice([product]);
        const updatedProduct = productsWithUpdatedPrice[0];

        if (updatedProduct.stock < quantity) {
            let error = updatedProduct.stock ? `*only ${updatedProduct.stock} in stock` : '*out of stock';
            return res.send({ error: error });
        }

        findProductCart.items.forEach((item) => {
            if (item.productId.toString() === productId) {
                item.quantity = quantity;
                item.price = updatedProduct.offerPrice > 0 ? updatedProduct.offerPrice : updatedProduct.price;
            }
        });

        await findProductCart.save();
        const productSubtotal = quantity * (updatedProduct.offerPrice > 0 ? updatedProduct.offerPrice : updatedProduct.price);
        return res.send({ quantity: quantity, productSubtotal: productSubtotal });

    } catch (error) {
        next(error);
    }
};

const decQuantity = async (req, res, next) => {
    try {
        let { productId, quantity } = req.body;
        const { userId } = req.session;

        if (!userId) {
            return console.log("User ID is not present");
        }

        const findProductCart = await cartModel.findOne({ userId: userId });

        if (!findProductCart) {
            return console.log("Cart not found");
        }

        const product = await productModel.findById(productId).populate('offers');

        if (!product) {
            return console.log("Product not found");
        }

        // Calculate updated price with offers
        const productsWithUpdatedPrice = await updatedPrice([product]);
        const updatedProduct = productsWithUpdatedPrice[0];

        findProductCart.items.forEach((item) => {
            if (item.productId.toString() === productId) {
                item.quantity = quantity;
                item.price = updatedProduct.offerPrice > 0 ? updatedProduct.offerPrice : updatedProduct.price;
            }
        });

        await findProductCart.save();
        const productSubtotal = quantity * (updatedProduct.offerPrice > 0 ? updatedProduct.offerPrice : updatedProduct.price);
        return res.send({ quantity: quantity, productSubtotal: productSubtotal });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductsToAdd,
    loadCart,
    removeProduct,
    addQuantity,
    decQuantity,
}