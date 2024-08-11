const wishlistModel = require('../../models/wishlistModel')

const loadWishlist = async (req, res, next) => {
    try {
        const { userId } = req.session

        if (!userId) {
            return console.log("user is not logged in at loadWishlist")
        }

        let findUserList = await wishlistModel.findOne({ userId: userId }).populate('items.productId')

        if (!findUserList) {
            findUserList = []
            findUserList.items = []
        }


        res.render('user/wishlist', { products: findUserList.items })
    } catch (error) {
        next(error)
    }
}

const addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body

        if (!req.session.userId) {
            console.log("User is not logged In to add product to wishlist")
            return res.send({ status: 1 })
        }

        const { userId } = req.session

        let userWishlist = await wishlistModel.findOne({ userId: userId });

        if (!userWishlist) {
            const newList = new wishlistModel({
                userId: userId,
                items: [{ productId }]
            })

            const saveList = await newList.save()

            if (saveList) {
                console.log(saveList)
                res.send({ status: 2 })
            }
        } else {
            const existingProduct = userWishlist.items.find(product => product.productId.toString() == productId)

            if (existingProduct) {
                res.send({ status: 3 })
                return console.log("the product is already in the wishlist")
            } else {
                userWishlist.items.push({ productId })
            }

            await userWishlist.save();
            res.send({ status: 2 });

        }


    } catch (error) {
        next(error)
    }
}

const removeProduct = async (req, res, next) => {
    try {
        const { productId } = req.body

        const { userId } = req.session

        if (!userId) {
            return console.log("can't find userId at wishlist remove products")
        }

        const findList = await wishlistModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { items: { productId: productId } } },
            { new: true }
        )

        if (!findList) {
            return console.log("wishlist not found")
        }

        console.log("successfully removed product from wishlist")
        res.send({ status: 7 })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    addToWishlist,
    loadWishlist,
    removeProduct,
}