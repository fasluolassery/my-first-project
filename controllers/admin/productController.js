const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
const userModel = require('../../models/userModel')
const cartModel = require('../../models/cartModel')


//!Admin
const loadProducts = async (req, res) => {
    try {
        const findAllProducts = await Product.find()
        // console.log(findAllProducts)   //! to remove
        res.render('admin/products', { products: findAllProducts })
    } catch (error) {
        console.log("Error in loading products:", error.message)
    }
}

const loadCreateProducts = async (req, res) => {
    try {
        const findAllCategories = await Category.find({ isBlock: false })
        // console.log(findAllCategories) //! to remove
        res.render('admin/createproduct', { categories: findAllCategories })
    } catch (error) {
        console.log("Error in loading create product page")
    }
}

const loadEditProduct = async (req, res) => {
    try {
        const productId = req.query.id
        const findProduct = await Product.findOne({ _id: productId })
        const findAllCategories = await Category.find()

        // console.log(findProduct) //! to remove

        if (!findProduct) {
            return console.log("there is no product")
        }

        res.render('admin/editproduct', { product: findProduct, categories: findAllCategories })
    } catch (err) {
        console.log("Error loading edit product", err.message)
    }
}

const createProducts = async (req, res) => {
    try {
        const productDetails = req.body;
        // console.log(productDetails) //! to remove

        //! to do 
        const findCategory = await Category.find({ categoryName: productDetails.category })
        // console.log(findCategory) //! to remove

        const existingProduct = await Product.findOne({ productName: productDetails.title })
        if (existingProduct) {
            res.send({ success: 0 })
            return console.log("product already there")
        }

        const productImages = [];
        if (req.files) {
            req.files.forEach(file => {
                productImages.push(file.filename);
            });
        }

        const imagePaths = req.files.map(file => `/public/productImages/${file.filename}`);

        const newProduct = new Product({
            productName: productDetails.title,
            description: productDetails.description,
            brand: productDetails.brand,
            price: productDetails.cost,
            category: productDetails.category,
            imagePaths: imagePaths,
            stock: productDetails.stock
        });


        const savedProduct = await newProduct.save();
        // console.log(savedProduct) //! to remove

        if (savedProduct) {
            console.log("Product saved successfully");
            res.send({ success: 1 })
        }
    } catch (error) {
        console.log("Error creating new product", error.message);
    }
};

const unlistProducts = async (req, res) => {
    try {
        const productId = req.params.id
        // console.log(productId) //!to remove
        const findProduct = await Product.findOne({ _id: productId })

        if (findProduct) {

            findProduct.isBlock = !findProduct.isBlock

            await findProduct.save()

            console.log(`${findProduct.productName}'s status changed to: ${findProduct.isBlock}`) //! to remove

            res.send({ success: true })

        } else {
            console.log("product id not found to list or unlist")
            res.send({ success: false })
        }
    } catch (error) {
        console.log("Error in unlisting Products", error.message)
    }
}

const editProducts = async (req, res) => {
    try {
        const productInfo = req.body;
        const newImageFiles = req.files;
        const existingImagePaths = req.body.existingImagePaths;

        // console.log("New Image Files: ", newImageFiles); // Debug log //! to remove
        // console.log("Existing Image Paths: ", existingImagePaths); // Debug log //! to remove

        const findProduct = await Product.findOne({ _id: productInfo.productId });

        if (!findProduct) {
            return res.status(404).send({ success: 0, message: 'Product not found' });
        }

        // Update product details
        findProduct.productName = productInfo.productName;
        findProduct.description = productInfo.productDescription;
        findProduct.brand = productInfo.productBrand;
        findProduct.price = productInfo.productPrice;
        findProduct.category = productInfo.productCategory;
        findProduct.stock = productInfo.productStock;

        // Update images if new files are provided
        newImageFiles.forEach(file => {
            const imageIndex = parseInt(file.originalname.replace('image', '')) - 1;
            findProduct.imagePaths[imageIndex] = `/public/productImages/${file.filename}`;
        });

        // Retain existing images if no new file is uploaded
        for (let i = 0; i < 3; i++) {
            if (!newImageFiles.some(file => file.originalname === `image${i + 1}`)) {
                if (existingImagePaths.includes(`image${i + 1}`)) {
                    findProduct.imagePaths[i] = findProduct.imagePaths[i];
                }
            }
        }

        const saveUpdate = await findProduct.save();
        if (saveUpdate) {
            res.send({ success: 1 });
            console.log("Successfully updated product"); //! to remove
        } else {
            res.status(500).send({ success: 0, message: 'Failed to update product' });
        }
    } catch (err) {
        console.error("Error updating product", err.message);
        res.status(500).send({ success: 0, message: 'Error updating product' });
    }
};

module.exports = {
    loadProducts,
    loadCreateProducts,
    createProducts,
    unlistProducts,
    editProducts,
    loadEditProduct,
}