const productModel = require('../models/productModel')
const cartModel = require('../models/cartModel')
const userModel = require('../models/userModel')

const loadCart = async (req, res) => {
    try {
        res.render('user/cartpage')
    } catch (err) {
        console.log("Error loading Cart page: ", err.message)
    }
}


const getProductsToAdd = async (req, res) => {
    try {
        const { productId } = req.body;


        if (!req.session.user) {
            console.log("User is not logged in to add product to cart")
            return res.send({ status: 1 })
        }

        const { user } = req.session

        const findUserData = await userModel.findOne({ email: user })


        let userCart = await cartModel.findOne({ userId: findUserData.id });

        if (!userCart) {

            const newCart = new cartModel({
                userId: findUserData.id,
                items: [{ productId: productId, quantity: 1 }]
            })

            const saveCart = await newCart.save();

            if (saveCart) {
                res.send({ status: 2 })
            }
        } else {

            // Find index of the item if it already exists in the cart
            const itemIndex = userCart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // If item exists, send a message that the product is already in the cart
                res.send({ status: 3 });
            } else {
                // If item does not exist, add new item to the cart
                userCart.items.push({ productId, quantity: 1 });

                // Save the updated cart
                await userCart.save();
                res.send({ status: 2 });
            }
        }


    } catch (err) {
        console.log("Error in adding products to cart: ", err.message)
    }
}

const addToCartSingle = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const { user } = req.session;

        const findUserData = await userModel.findOne({ email: user });

        if (!findUserData) {
            console.log("User session out to add product to cart");
            return res.send({ status: 1});
        }

        let userCart = await cartModel.findOne({ userId: findUserData.id });

        if (!userCart) {
            // Create a new cart if none exists and the quantity is within limit
            if (quantity > 6) {
                return res.send({ status: 3 });
            }

            const newCart = new cartModel({
                userId: findUserData.id,
                items: [{ productId, quantity }]
            });

            const saveCart = await newCart.save();

            if (saveCart) {
                return res.send({ status: 2 });
            }
        } else {
            // Check if the product already exists in the cart
            const existingProductIndex = userCart.items.findIndex(item => item.productId.toString() === productId);

            if (existingProductIndex !== -1) {
                // If the product exists, update its quantity
                const newQuantity = userCart.items[existingProductIndex].quantity + quantity;

                if (newQuantity > 6) {
                    // If new quantity exceeds 6, send a message
                    return res.send({ status: 3 });
                }

                userCart.items[existingProductIndex].quantity = newQuantity;
            } else {
                // If the product doesn't exist, check if adding it exceeds total allowed items
                const totalItemsInCart = userCart.items.length;

                if (totalItemsInCart >= 6) {
                    return res.send({ status: 3 });
                }

                userCart.items.push({ productId, quantity });
            }

            // Save the updated cart
            await userCart.save();

            return res.send({ status: 4 });
        }
    } catch (err) {
        console.log("Error at single add to cart: ", err.message);
        // return res.status(500).send({ status: 5, message: "Failed to add product to cart" });
    }
};



module.exports = {
    getProductsToAdd,
    loadCart,
    addToCartSingle,
}