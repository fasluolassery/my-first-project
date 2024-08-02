const productModel = require('../../models/productModel')
const categoryModel = require('../../models/categoryModel')
const offerModel = require('../../models/offerSchema')

const loadOffers = async (req, res, next) => {
    try {

        const fetchOffers = await offerModel.find({}).populate('productId').populate('categoryId')

        res.render('admin/offers', { offers: fetchOffers })
    } catch (error) {
        next(error)
    }
}

const loadCreateOffer = async (req, res, next) => {
    try {

        const fetchProducts = await productModel.find({}).sort({ createdAt: 1 })

        const fetchCategories = await categoryModel.find({}).sort({ createdAt: 1 })

        res.render('admin/createoffer', { products: fetchProducts, categories: fetchCategories })
    } catch (error) {
        next(error)
    }
}

const createOffer = async (req, res, next) => {
    try {
        const { offerType, discount, startDate, endDate, productId, categoryId } = req.body

        const newOffer = new offerModel({
            offerType,
            discount,
            startDate,
            endDate,
            productId: offerType === 'product' ? productId : undefined,
            categoryId: offerType === 'category' ? categoryId : undefined,
        })


        if (offerType === 'product') {

            const offerId = newOffer.id

            await productModel.findOneAndUpdate(
                { _id: productId },
                { $push: { offers: offerId } },
                { upsert: true, returnOriginal: false }
            );

        } else if (offerType === 'category') {

            const fetchCategory = await categoryModel.findById(categoryId)

            const offerId = newOffer.id

            const product = await productModel.updateMany({ category: fetchCategory.categoryName }, { $push: { offers: offerId } })

        }

        await newOffer.save()

        res.send({ success: 7 })


    } catch (error) {
        next(error)
    }
}


const deleteOffer = async (req, res, next) => {
    try {
        const { offerId } = req.body;

        if (!offerId) {
            return console.log("can't get any offer id at delete offer");
        }

        const offer = await offerModel.findById(offerId);

        if (!offer) {
            return console.log('Offer not found');
        }

        const { offerType, productId, categoryId } = offer;

        const deleting = await offerModel.findByIdAndDelete(offerId);

        if (deleting) {
            if (offerType === 'product') {
                await productModel.findByIdAndUpdate(
                    productId,
                    { $pull: { offers: offerId } },
                    { returnOriginal: false }
                );
            } else if (offerType === 'category') {
                const fetchCategory = await categoryModel.findById(categoryId);
                if (fetchCategory) {
                    await productModel.updateMany(
                        { category: fetchCategory.categoryName },
                        { $pull: { offers: offerId } }
                    );
                }
            }

            console.log('Deleting offer success');
            res.send({ success: 7 });
        } else {
            console.log('Failed to delete offer');
        }

    } catch (error) {
        next(error);
    }
};

module.exports = {
    loadOffers,
    loadCreateOffer,
    createOffer,
    deleteOffer
}