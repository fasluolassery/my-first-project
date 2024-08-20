const cartModel = require("../../models/cartModel");
const Products = require("../../models/productModel");
const userModel = require("../../models/userModel");

const updatedPrice = async (products) => {
  try {
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const activeOffers = product.offers.filter(
          (offer) => new Date(offer.endDate) > new Date()
        );

        if (activeOffers.length > 0) {
          const latestOffer = activeOffers[activeOffers.length - 1];

          product.offerPrice = product.price - latestOffer.discount;
        } else {
          product.offerPrice = 0;
        }

        await product.save();

        return product;
      })
    );

    return updatedProducts;
  } catch (error) {
    console.log(error);
  }
};

const loadHome = async (req, res, next) => {
  try {
    const { user, userId } = req.session;
    let findAllProducts = await Products.find({ isBlock: false })
      .sort({ createdAt: -1 })
      .limit(4)
      .populate("offers");

    findAllProducts = await updatedPrice(findAllProducts);

    if (user) {
      res.render("user/homepage", { products: findAllProducts, user: userId });
    } else {
      res.render("user/homepage", { products: findAllProducts });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const des = req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};


const loadAbout = async (req, res, next) => {
  try{
    res.render('user/about')
  }catch(err){
    next(err)
  }
}

const loadContact = async (req, res, next) => {
  try{
    res.render('user/contact')
  }catch(err){
    next(err)
  }
}

module.exports = {
  loadHome,
  logout,
  loadAbout,
  loadContact
};
