const userModel = require('../models/userModel')

// middleware/sessionCheck.js
const isLogin = async (req, res, next) => {
  try {
    if (req.session.user) {

      if (typeof req.session.user === 'string') {

        const findUser = await userModel.findOne({ email: req.session.user })

        if (!findUser.isBlock) {

          // User is logged in
          next();

        } else {

          const errorMessage = "*your account has been temporarily blocked";
          res.render('user/registerpage', { error: errorMessage })

        }

      } else if (typeof req.session.user === 'object') {
        // console.log(req.session.user)
        const findUser = await userModel.findOne({ email: req.session.user.email })

        if (!findUser.isBlock) {

          next()

        } else {

          const errorMessage = "*your account has been temporarily blocked";
          res.render('user/registerpage', { error: errorMessage })

        }
      }

    } else {

      // User is not logged in
      const errorMessage = "*You're not logged in, Please login to continue";

      res.render('user/registerpage', { error: errorMessage })
    }
  } catch (err) {
    console.log("Error at session check:", err.message)
  }

};




const isLogout = async (req, res, next) => {
  try{
    if(!req.session.user){
      next()
    }else{
      res.redirect('/home')
    }

  }catch(err){
    console.log("Error in isLogout: ", err.message)
  }
}

module.exports = {
  isLogin,
  isLogout
};
