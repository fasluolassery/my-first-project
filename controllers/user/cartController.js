const productModel = require('../../models/productModel')
const cartModel = require('../../models/cartModel')
const userModel = require('../../models/userModel')

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
        // console.log(productId) //! to remove


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


    } catch (error) {
        next(error)
    }
}

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
        let { productId, quantity } = req.body
        const { userId } = req.session

        if (!userId) {
            return console.log("userid is not here at addquantity")
        }

        const findProductCart = await cartModel.findOne({ userId: userId })

        if (!findProductCart) {
            return console.log("can't find cart of user at addquantity")
        }

        const productStock = await productModel.findOne({ _id: productId })
        if (!productStock) {
            return console.log("product not found in addquantity")
        }

        if (productStock.stock < quantity) {
            let error = ''
            if (!productStock.stock) {
                error = '*out of stock'
            } else {
                error = `*only ${productStock.stock} in stock`
            }
            return res.send({ error: error })
        }

        const stockCheck = findProductCart.items.forEach((val, ind) => {
            if (val.productId == productId) {
                // console.log(val)
                if (quantity <= productStock.stock) {
                    val.quantity = quantity
                } else {
                    return quantity = productStock.stock
                }
            }
        })

        const saveIncQuantity = await findProductCart.save()
        if (saveIncQuantity) {
            // console.log("quantity addedd to the cart, product at addquantity")
            const productSubtotal = quantity * productStock.price
            return res.send({ quantity: quantity, productSubtotal: productSubtotal })
        }

    } catch (error) {
        next(error)
    }
}

const decQuantity = async (req, res, next) => {
    try {
        let { productId, quantity } = req.body
        const { userId } = req.session

        if (!userId) {
            return console.log("userid is not here at addquantity")
        }

        const findProductCart = await cartModel.findOne({ userId: userId })

        if (!findProductCart) {
            return console.log("can't find cart of user at addquantity")
        }

        const productStock = await productModel.findOne({ _id: productId })
        if (!productStock) {
            return console.log("product not found in addquantity")
        }

        findProductCart.items.forEach((val, ind) => {
            if (val.productId == productId) {
                if (quantity <= productStock.stock) {
                    val.quantity = quantity
                } else {
                    return quantity = productStock.stock
                }
            }
        })

        const saveDecQuantity = await findProductCart.save()
        if (saveDecQuantity) {
            // console.log("quantity decrement at the cart, product at addquantity")
            const productSubtotal = quantity * productStock.price
            return res.send({ quantity: quantity, productSubtotal: productSubtotal })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getProductsToAdd,
    loadCart,
    removeProduct,
    addQuantity,
    decQuantity,
}