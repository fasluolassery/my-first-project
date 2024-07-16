const Category = require('../../models/categoryModel');

const loadCategory = async (req, res, next) => {
    try {
        const findAllCategories = await Category.find().sort({createdAt: 1})
        res.render('admin/category', { categories: findAllCategories })
    } catch (error) {
        next(error)
    }
}

const getCategoryDetails = async (req, res, next) => {
    try {
        const categoryDetails = req.body
        // console.log(categoryDetails) //!to remove
        const existingCategory = await Category.findOne({ categoryName: categoryDetails.categoryName.toLowerCase() })

        if (existingCategory) {
            if (categoryDetails.categoryName.toLowerCase() == existingCategory.categoryName.toLowerCase()) {
                res.send({ next: 100 })
                return console.log("Category already there")
            }
        }

        if (categoryDetails) {
            const newCategory = new Category({
                categoryName: categoryDetails.categoryName.toLowerCase(),
                description: categoryDetails.categoryDescription
            })

            if (newCategory) {
                await newCategory.save()
                console.log("Category details saved")
                res.send({ next: 1 })
            }
        }
    } catch (error) {
        next(error)
    }
}

const unlistCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id
        const findCategory = await Category.findOne({ _id: categoryId })

        if (findCategory) {

            findCategory.isBlock = !findCategory.isBlock

            await findCategory.save()

            console.log(`${findCategory.categoryName}'s status changed to: ${findCategory.isBlock}`) //! to remove

            res.send({ success: true })

        } else {
            console.log("category id not found to list or unlist")
            res.send({ success: false })
        }
    } catch (error) {
        next(error)
    }
}


const updateCategory = async (req, res, next) => {
    try {
        const updateCategoryDetails = req.body
        // console.log(updateCategoryDetails) //! to remove

        const findCategory = await Category.findOne({ _id: updateCategoryDetails.categoryId })

        const existingCategory = await Category.findOne({ categoryName: updateCategoryDetails.categoryName.toLowerCase() })

        if (existingCategory) {
            if (updateCategoryDetails.categoryName.toLowerCase() == existingCategory.categoryName.toLowerCase()) {
                res.send({ next: 100 })
                return console.log("Category already there")
            }
        }

        if (!findCategory) {
            return console.log("category not found")
        }

        findCategory.categoryName = updateCategoryDetails.categoryName.toLowerCase()
        findCategory.description = updateCategoryDetails.categoryDescription

        await findCategory.save()
        res.send({ next: 1 })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    loadCategory,
    getCategoryDetails,
    unlistCategory,
    updateCategory
};
