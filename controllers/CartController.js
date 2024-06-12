const productModel = require('../models/productModel')
const cartModel = require('../models/cartModel')
const userModel = require('../models/userModel')

const loadCart = async (req, res) => {
    try {
        const userId = req.query.id

        const findUserCartItems = await cartModel.findOne({ userId: userId }).populate('items.productId')
        const userCartItems = findUserCartItems.items.map(pro => pro.productId)
        console.log(userCartItems)
        if (userCartItems.length > 0) {

            res.render('user/cartpage', { cartItems: userCartItems, user: userId })
        } else {
            res.render('user/emtycart')
        }

    } catch (err) {
        console.log("Error loading Cart page: ", err.message)
    }
}


const getProductsToAdd = async (req, res) => {
    try {
        const { productId } = req.body;
        // console.log(productId)


        if (!req.session.user) {
            console.log("User is not logged in to add product to cart")
            return res.send({ status: 1 })
        }

        const { user } = req.session

        const findUserData = await userModel.findOne({ email: user })

        if (!findUserData) {
            console.log("User session out")
            return res.send({ status: 1 })
        }

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

const removeProduct = async (req, res) => {
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



    } catch (err) {
        console.log("Error in removing product from cart: ", err)
    }
}

module.exports = {
    getProductsToAdd,
    loadCart,
    removeProduct
}