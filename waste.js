//! HEADER ACTION AREA
{/* <div class="header-bottom d-none d-lg-block">
                <div class="container">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-lg-3 col">
                            <div class="header-logo">
                                <a href="index.html"><img src="assets/images/logo/logo.png" alt="Site Logo" /></a>
                            </div>
                        </div>
                        <div class="col-lg-6 d-none d-lg-block">
                            <div class="search-element">
                                <form action="#">
                                    <input type="text" placeholder="Search" />
                                    <button><i class="pe-7s-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-3 col">
                            <div class="header-actions">
                                <!-- Single Wedge Start -->
                                <a href="#offcanvas-wishlist" class="header-action-btn offcanvas-toggle">
                                    <i class="pe-7s-like"></i>
                                </a>
                                <!-- Single Wedge End -->
                                <a href="#offcanvas-cart" class="header-action-btn header-action-btn-cart offcanvas-toggle pr-0">
                                    <i class="pe-7s-shopbag"></i>
                                    <span class="header-action-num">01</span>
                                    <!-- <span class="cart-amount">€30.00</span> -->
                                </a>
                                <a href="#offcanvas-mobile-menu" class="header-action-btn header-action-btn-menu offcanvas-toggle d-lg-none">
                                    <i class="pe-7s-menu"></i>
                                </a>
                                <!-- New Login Button with Text -->
                                <a href="/login" class="header-action-btn">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                    */}

//! HEADER NAVIGATION AREA
{/* <div class="header-nav-area d-none d-lg-block sticky-nav">
                <div class="container">
                    <div class="header-nav">
                        <div class="main-menu position-relative">
                            <ul>
                                <li class="dropdown"><a href="#">Home</a></li>
                                <li><a href="about.html">Products</a></li>
                                <li class="dropdown position-static"><a href="about.html">My account</a></li>
                                <li class="dropdown position-static"><a href="#">About</a></li>
                                <li class="dropdown "><a href="#">Contact</a></li>
                                <!-- <li><a href="contact.html">Contact</a></li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}


//! HEADER TOP AREA
{/* <div class="header-top">
                <div class="container">
                    <div class="row justify-content-between align-items-center">
                        <div class="col">
                            <div class="welcome-text">
                                <p>World Wide Completely Free Returns and Shipping</p>
                            </div>
                        </div>
                        <div class="col d-none d-lg-block">
                            <div class="top-nav">
                                <ul>
                                    <li><a href="tel:0123456789"><i class="fa fa-phone"></i> +012 3456 789</a></li>
                                    <li><a href="mailto:demo@example.com"><i class="fa fa-envelope-o"></i> demo@example.com</a></li>
                                    <li><a href="my-account.html"><i class="fa fa-user"></i> Account</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
//! EMAIL.COM VALIDATION

// userValidation.js

// const { body } = require('express-validator');

// exports.validateRegistration = [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('email')
//         .isEmail().withMessage('Invalid email')
//         .custom(value => {
//             // Custom validation: check if email domain is valid
//             if (!value.endsWith('@example.com')) { // Change 'example.com' to your desired domain
//                 throw new Error('Email must be from a valid domain');
//             }
//             return true;
//         }),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//     body('phone').isMobilePhone().withMessage('Invalid phone number')
// ];

//! session thing


// Configure session middleware
// app.use(session({
//     secret: 'your-secret-key', // Used to sign the session ID cookie
//     resave: false, // Don't save session if unmodified
//     saveUninitialized: false // Don't create session until something is stored
// }));


//! to check if it's a axios reqest

// if (req.get('X-Requested-With') === 'XMLHttpRequest') {
//     // Request was made by Axios or similar library
//     console.log('Axios request received');
// } else {
//     // Request was made by form submission or other means
//     console.log('Non-Axios request received');
// }

//! MY USER REG FORM

{/* <form action="/register" method="post" id="myForm">
<input type="text" id="userName" name="userName" placeholder="Name" />
<input name="userEmail" id="userEmail" placeholder="Email" type="email" />
<input type="tel" name="userPhone" id="userPhone" placeholder="Phone" />
<input type="password" name="userPassword" id="userPassword" placeholder="Password" />
<div class="button-box">
    <button type="submit"><span>Register</span></button>
</div>
</form> */}


//! my script
{/* <script>
        function userValidateForm() {
            // Get form field values
            const username = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            const password = document.getElementById('userPassword').value.trim();

            // Clear previous error messages
            document.getElementById('errorMessages').innerHTML = '';

            // Validate username
            if (username === '') {
                displayError('*Please enter your name');
                return;
            }

            // Validate email
            if (email === '') {
                displayError('*Please enter your email');
                return;
            } else if (!isValidEmail(email)) {
                displayError('*Please enter a valid email address');
                return;
            }

            // Validate phone
            if (phone === '') {
                displayError('*Please enter your phone number');
                return;
            } else if (!isValidPhoneNumber(phone)) {
                displayError('*Please enter a valid phone number');
                return;
            }

            // Validate password
            if (password === '') {
                displayError('*Please enter your password');
                return;
            } else if (password.length < 6) {
                displayError('*Password must be at least 6 characters long');
                return;
            }

            // All fields are valid
            return true;
        }

        // Function to check if email is valid
        function isValidEmail(email) {
            // Regular expression for validating email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Function to check if phone number is valid
        function isValidPhoneNumber(phone) {
            // Regular expression for validating phone number format
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);
        }

        function displayError(errorMessage) {
            const errorDiv = document.getElementById('errorMessages');
            const errorParagraph = document.createElement('p');
            errorParagraph.textContent = errorMessage;
            errorDiv.appendChild(errorParagraph);
        }

        document.getElementById('userName').addEventListener('input', userValidateForm);
        document.getElementById('userEmail').addEventListener('input', userValidateForm);
        document.getElementById('userPhone').addEventListener('input', userValidateForm);
        document.getElementById('userPassword').addEventListener('input', userValidateForm);

        document.getElementById('userRegister').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            if (userValidateForm()) {

                console.log("validation success...")//! TO REMOVE

                const formData = {
                    userName: document.getElementById('userName').value.trim(),
                    userEmail: document.getElementById('userEmail').value.trim(),
                    userPhone: document.getElementById('userPhone').value.trim(),
                    userPassword: document.getElementById('userPassword').value.trim()
                };

                // console.log(formData) //! TO REMOVE

                // Send form data to backend using Axios
                axios.post('/register', formData)
                    .then(response => {
                        // Handle successful response from backend
                        console.log('Response:', response.data.status);
                        if (response.data.status == 'Email is already registered') {
                            console.log("Email already")
                            displayError(response.data.status)
                        } else if (response.data.status == 'success') {
                            Swal.fire({
                                icon:"info",
                                title: "verify Email",
                                text:"We have sent you verification email. please check it",
                                // showDenyButton: true,
                                // showCancelButton: true,
                                confirmButtonText: "verify email",
                                // denyButtonText: `Don't save`
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
    //                             if (result.isConfirmed) {
    //                                 // Swal.fire("Saved!", "", "success");
    //                                 window.location.href = '/verifyotp'
    //                             }
    //                         });
    //                         // window.location.href = '/verifyUserMail';
    //                     }
    //                 })
    //                 .catch(error => {
    //                     // Handle error
    //                     console.error('Error:', error);
    //                 });
    //             // this.submit(); // Submit the form if validation passes
    //         }

    //     });

    // </script> */}

//! sigup success sweet alert

// const Toast = Swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.onmouseenter = Swal.stopTimer;
//       toast.onmouseleave = Swal.resumeTimer;
//     }
//   });
//   Toast.fire({
//     icon: "success",
//     title: "Signed in successfully"
//   });

//! verify email sweet alert
// Swal.fire({
//     title: "Do you want to save the changes?",
//     showDenyButton: true,
//     showCancelButton: true,
//     confirmButtonText: "verify email",
//     // denyButtonText: `Don't save`
// }).then((result) => {
//     /* Read more about isConfirmed, isDenied below */
//     if (result.isConfirmed) {
//         // Swal.fire("Saved!", "", "success");
//         window.location.href = '/verifyUserMail'
//     } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//     }
// });

{/* <script>
function adminValidateFormLogin() {
    const loginEmail = document.getElementById('adminMaillogin').value.trim();
    const loginPassword = document.getElementById('adminPasswordlogin').value.trim();

    document.getElementById('errorMessagesLogin').innerHTML = ''

    if (loginEmail === '') {
        displayErrorLogin('*Please enter your email');
        return false;
    } else if (!isValidEmailLogin(loginEmail)) {
        displayErrorLogin('*Please enter a valid email address');
        return false;
    }

    if (loginPassword === '') {
        displayErrorLogin('*Please enter your password');
        return false;
    } else if (loginPassword.length < 6) {
        displayErrorLogin('*Password must be at least 6 characters long');
        return false;
    }

    return true;

}

function isValidEmailLogin(email) {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayErrorLogin(errorMessage) {
    const errorDiv = document.getElementById('errorMessagesLogin');
    const errorParagraph = document.createElement('p');
    errorParagraph.textContent = errorMessage;
    errorDiv.appendChild(errorParagraph);
}

document.getElementById('adminMaillogin').addEventListener('input', adminValidateFormLogin)
document.getElementById('adminPasswordlogin').addEventListener('input', adminValidateFormLogin)

document.getElementById('adminLogin').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    if (adminValidateFormLogin()) {

        console.log("login validation success...")//! TO REMOVE

        const loginFormData = {
            loginEmail: document.getElementById('adminMaillogin').value.trim(),
            loginPassword: document.getElementById('adminPasswordlogin').value.trim()
        };

        // console.log(formData) //! TO REMOVE

        // Send form data to backend using Axios
        axios.post('/admin/login', loginFormData)
            .then(res => {
                if (res.data.next == 1) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "logged in successfully"
                    });
                    setTimeout(() => {
                        window.location.href = '/admin/dashboard'
                    }, 800)
                }else if(res.data.next == 0){
                    displayErrorLogin("Admin not found");
                }else if(res.data.next == 100){
                    displayErrorLogin("Incorrect password");
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
        // this.submit(); // Submit the form if validation passes
    }

});

</script> */}


//!my user controller
// const {validationResult} = require('express-validator')
// const bcrypt = require("bcrypt")
// const otpGenerator = require('otp-generator')
// const nodemailer = require('nodemailer')
// const User = require('../models/userModel')
// const Otp = require('../models/otpModel')
// // const { text } = require('express')


// const loadHome = async (req, res) => {
//     try{
//         res.render('user/homepage')
//     }catch(error){
//         console.log("Error rendering home page:", error.message)
//     }
// }

// const loadRegister = async (req, res) => {
//     try{
//         res.render('user/registerpage')
//     }catch(error){
//         console.log("Error rendering login page:", error.message)
//     }
// }

// const userRegisterDetails = async (req, res) => {
//     try{
    
//         const validationErrors = validationResult(req)
        
//         if(!validationErrors.isEmpty()){
//             return console.log('error',validationErrors.array())
//         }
        
//         const {userName, userEmail, userPassword, userPhone} = req.body
        
//         const existingUser = await User.findOne({email:userEmail})
        
//         if(existingUser){
//             res.send({status:"Email is already registered"})
//             return console.log("Email is already registered")
//         }
        
//         const hashedPassword = await bcrypt.hash(userPassword, 10)

//         const user = new User({
//             username:userName,
//             email: userEmail,
//             phone: userPhone,
//             password: hashedPassword
//         })

//         const saveUser = await user.save()

//         if(saveUser){
//             console.log("user saved success") //! to remove
//             req.session.user = userEmail
//             res.send({status:"success"})
//         }

//     }catch(error){
//         console.log("Error saving users:", error.message)
//     }
// }


// const loadVerifyOtp = async (req, res) => {
//     try{
        
//         const findMail = await User.findOne({email:req.session.user})
//         console.log(findMail.email) //! to remove

//         const otpGen = otpGenerator.generate(4,{lowerCaseAlphabets:false,specialChars:false,upperCaseAlphabets:false})
//         console.log("Generated otp:", otpGen) //! to remove
//             req.session.userOtp = otpGen;

//         const sender = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.USER_PASS
//             }
//         })

//         const emailToSend = {
//             from: process.env.EMAIL_USER,
//             to: findMail.email,
//             subject: "Your One-Time Password (OTP) for Gadget-Galaxy Website Login",
//             text: `Your One-Time Password (OTP) for logging into our website is: ${otpGen}. Please use this code within the next few seconds to complete the sign process. Thank you for using our services.`
//         };
        
//         sender.sendMail(emailToSend, (error, info) => {
//             if(error){
//                 console.log(error)
//             }else{
//                 console.log("otp mail send:") //todo , info.response
//             }
//         })

//         const otpSave = new Otp({
//             userMail: findMail.email,
//             otp: otpGen
//         })

//         const otpSaving = await otpSave.save()
//         if(otpSaving){
            
//             // console.log(otpSaving) //! to remove
//             console.log("otp saved") //! to remove
//         }

//         const otpSchema = Otp.schema;
//         const ttlValue = otpSchema.obj.exprAt.expires
        

//         const timeToSend = otpSaving.exprAt.getTime()
//         console.log(timeToSend) //! to remove

//         res.render('user/otppage', {timeToSend,ttlValue})
        
//     }catch(error){
//         console.log("Error loading otp page:", error.message)
//     }
// }

// const userVerifyOtp = async (req, res) => {
//     try{
//         const realOtp = req.session.userOtp
//         const userTypedOtp = req.body.otp

//         console.log(userTypedOtp) //! to remove
//         console.log(realOtp) //! to remove
        
//         if(userTypedOtp === realOtp){
//             res.send({next:1})
//         }else{
//             res.send({next:0})
//         }
//     }catch(error){
//         console.log("Error otp giving:", error.message)
//     }
// }


// const userLoginDetails = async (req, res) => {
//     try{

//         const validationErrors = validationResult(req)
        
//         if(!validationErrors.isEmpty()){
//             return console.log('error',validationErrors.array())
//         }

//         const { loginEmail, loginPassword } = req.body

//         console.log(loginEmail) //! to remove
//         console.log(loginPassword) //! to remove

//         const checkUser = await User.findOne({email:loginEmail})

//         if(!checkUser){
//             res.send( { next: 0 } )
//             return console.log("user not found")
//         }

//         console.log(checkUser.password) //! to remove

//         const passMatch = await bcrypt.compare(loginPassword, checkUser.password)

//         if(!passMatch){
//             res.send( { next: 100} )
//             return console.log("Incorrect password")
//         }
//         console.log(checkUser.isBlock)
//         if(checkUser.isBlock){
//             res.send( {next: 200})
//             return console.log("your account has been temporarily blocked")
//         }
        
//         req.session.user = loginEmail
//         res.send( { next: 1 } )

//     }catch(error){
//         console.log("Error login users:", error.message)
//     }
// }



// module.exports = {
//     loadHome,
//     loadRegister,
//     userRegisterDetails,
//     loadVerifyOtp,
//     userVerifyOtp,
//     userLoginDetails
// }

//! my admin controller
// const {validationResult} = require('express-validator')
// const User = require('../models/userModel')
// const Category = require('../models/categoryModel')
// const Product = require('../models/productModel')

// const loadAdminLogin = async (req, res) => {
//     try{
//         res.render('admin/adminlogin')
//     }catch(error){
//         console.log("Error loading admin login:", error.message)
//     }
// }   

// const verifyAdminLogin = async (req, res) => {
//     try{
//         const AdminValidationErrors = validationResult(req)
        
//         if(!AdminValidationErrors.isEmpty()){
//             return console.log('error',validationErrors.array())
//         }

//         const adminCredential = {
//             adminMail: process.env.EMAIL_ADMIN,
//             adminPassword: process.env.ADMIN_PASS
//         }

//         const { loginEmail, loginPassword } = req.body

//         if(loginEmail !== adminCredential.adminMail){
//             res.send( {next: 0 } )
//             return console.log("Error: Admin Not Found")
//         }

//         if(loginPassword !== adminCredential.adminPassword){
//             res.send( {next: 100} )
//             return console.log("Error: Incorrect password")
//         }

//         req.session.admin = loginEmail
//         res.send( { next:1 } )

//     }catch(error){
//         console.log("Error verifying admin", error.message)
//     }
// }

// const loadAdminDashboard = async (req, res) => {
//     try{
//         res.render('admin/admindashboard')
//     }catch(error){
//         console.log("Error loading admin dashboard", error.message)
//     }
// }

// const loadUsers = async (req, res) => {
//     try{
//         const allUsers = await User.find()

//         res.render('admin/users', {users: allUsers})
//     }catch(error){
//         console.log("Error loading users", error.message)
//     }
// }

// const blockUser = async (req, res) => {
//     try{
//         const userId = req.params.id
//         const user = await User.findOne({_id:userId})
//         if(user){
//             user.isBlock = !user.isBlock
//             const update = await user.save()
//             console.log(`${user.username}'s status changed to  : ${user.isBlock}`) //! to remove
//             res.send({success: true})
//         }else{
//             console.log("user id not found to block or unblock")
//             res.send({success: false})
//         }
//     }catch(error){
//         console.log("Error in block user", error.message)
//     }
// }

// const loadCategory = async (req, res) => {
//     try{
//         const findAllCategories = await Category.find()
//         res.render('admin/category', {categories: findAllCategories})
//     }catch(error){
//         console.log("Error in loading category:", error.message)
//     }
// }

// const getCategoryDetails = async (req, res) => {
//     try{
//         const categoryDetails = req.body
//         console.log(categoryDetails)
//         const existingCategory = await Category.findOne({categoryName: categoryDetails.categoryName})

//         if(existingCategory){
//             res.send({next: 100})
//             return console.log("Category already there")
//         }
        
//         if(categoryDetails){
//             const newCategory = new Category({
//                 categoryName: categoryDetails.categoryName,
//                 description: categoryDetails.categoryDescription
//             })

//             if(newCategory){
//                 await newCategory.save()
//                 console.log("Category details saved")
//                 res.send({next:1})
//             }
//         }
//     }catch(error){
//         console.log("Error getting category Details", error.message)
//     }
// }

// const unlistCategory = async (req, res) => {
//     try{
//         const categoryId = req.params.id
//         const findCategory = await Category.findOne({_id:categoryId})

//         if(findCategory){
            
//             findCategory.isBlock = !findCategory.isBlock

//             await findCategory.save()

//             console.log(`${findCategory.categoryName}'s status changed to: ${findCategory.isBlock}`) //! to remove
            
//             res.send({success: true})

//         }else{
//             console.log("category id not found to list or unlist")
//             res.send({success: false})
//         }
//     }catch(error){
//         console.log("Error in unlisting Category", error.message)
//     }
// }

// const updateCategory = async (req, res) => {
//     try{
//         const updateCategoryDetails = req.body
//         console.log(updateCategoryDetails)

//         const findCategory = await Category.findOne({_id: updateCategoryDetails.categoryId})

//         if(!findCategory){
//             return console.log("category not found")
//         }

//         findCategory.categoryName = updateCategoryDetails.categoryName
//         findCategory.description = updateCategoryDetails.categoryDescription

//         await findCategory.save()
//         res.send({next: 1})

//     }catch(err){
//         console.log("Error updating category")
//     }
// }


// const loadProducts = async (req, res) => {
//     try{
//         const findAllProducts = await Product.find()
//         // console.log(findAllProducts)   //! to remove

//         res.render('admin/products', {products: findAllProducts})
//     }catch(error){
//         console.log("Error in loading products:", error.message)
//     }
// }

// const loadCreateProducts = async (req, res) => {
//     try{
//         res.render('admin/createproduct')
//     }catch(error){
//         console.log("Error in loading create product page")
//     }
// }

// const createProducts = async (req, res) => {
//     try{
//         const productDetails = req.body

//         const saveProduct = new Product({
//             name: productDetails.title,
//             description: productDetails.description,
//             price: productDetails.cost,
//             category: productDetails.category,
//         })

//         const savingProduct = await saveProduct.save()

//         if(savingProduct){
//             console.log("product saved") //! to remove
//         }
//     }catch(error){
//         console.log("Error creating new products", error.message)
//     }
// }


// module.exports = 
//     loadAdminLogin,
//     verifyAdminLogin,
//     loadAdminDashboard,
//     loadUsers,
//     blockUser,
//     loadCategory,
//     getCategoryDetails,
//     unlistCategory,
//     updateCategory,
//     loadProducts,
//     loadCreateProducts,
//     createProducts,
// 

//! update category ejs
// <%- include('../layout/adminhead.ejs') %>
// <body class="dark">
//     <div class="screen-overlay"></div>
//     <aside class="navbar-aside" id="offcanvas_aside">
//         <div class="aside-top">
//             <a href="index.html" class="brand-wrap">
//                 <img src="assets/imgs/theme/logo.svg" class="logo" alt="Nest Dashboard" />
//             </a>
//             <div>
//                 <button class="btn btn-icon btn-aside-minimize"><i class="text-muted material-icons md-menu_open"></i></button>
//             </div>
//         </div>
//         <nav>
//             <ul class="menu-aside">
//                 <li class="menu-item ">
//                     <a class="menu-link" href="/admin/dashboard">
//                         <i class="icon material-icons md-home"></i>
//                         <span class="text">Dashboard</span>
//                     </a>
//                 </li>
//                 <li class="menu-item ">
//                     <a class="menu-link" href="/admin/users">
//                         <i class="icon material-icons md-person"></i>
//                         <span class="text">Users</span>
//                     </a>
//                 </li>
//                 <li class="menu-item">
//                     <a class="menu-link" href="/admin/orders">
//                         <i class="icon material-icons md-shopping_cart"></i>
//                         <span class="text">Orders</span>
//                     </a>
//                 </li>
//                 <li class="menu-item">
//                     <a class="menu-link" href="/admin/products">
//                         <i class="icon material-icons md-shopping_bag"></i>
//                         <span class="text">Products</span>
//                     </a>
//                 </li>
//                 <li class="menu-item active">
//                     <a class="menu-link" href="/admin/category">
//                         <i class="icon material-icons md-category"></i>
//                         <span class="text">Categories</span>
//                     </a>
//                 </li>
//                 <li class="menu-item">
//                     <a class="menu-link" href="/admin/brands">
//                         <i class="icon material-icons md-business"></i>
//                         <span class="text">Brands</span>
//                     </a>
//                 </li>
//                 <li class="menu-item">
//                     <a class="menu-link" href="/admin/offers">
//                         <i class="icon material-icons md-local_offer"></i>
//                         <span class="text">Offers</span>
//                     </a>
//                 </li>
//                 <li class="menu-item">
//                     <a class="menu-link" href="/admin/coupons">
//                         <i class="icon material-icons md-card_giftcard"></i>
//                         <span class="text">Coupons</span>
//                     </a>
//                 </li>
//             </ul>
//         </nav>
//     </aside>
    
//     <main class="main-wrap">
//         <header class="main-header navbar">
//             <div class="col-search">
//                 <form class="searchform">
//                     <div class="input-group">
//                         <input list="search_terms" type="text" class="form-control" placeholder="Search term" />
//                         <button class="btn btn-light bg" type="button"><i class="material-icons md-search"></i></button>
//                     </div>
//                 </form>
//             </div>
//             <div class="col-nav">
//                 <button class="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside"><i class="material-icons md-apps"></i></button>
//                 <ul class="nav">
//                     <li class="nav-item">
//                         <a class="nav-link btn-icon darkmode" href="#"> <i class="material-icons md-nights_stay"></i> </a>
//                     </li>
//                 </ul>
//             </div>
//         </header>
//         <section class="content-main">
//             <div class="content-header">
//                 <div>
//                     <h2 class="content-title card-title">Edit Categories</h2>
//                     <p>edit category</p>
//                 </div>
//                 <div>
//                     <input type="text" placeholder="Search Categories" class="form-control bg-white" />
//                 </div>
//             </div>
//             <div class="card">
//                 <div class="card-body">
//                     <div class="row">
//                         <div class="col-md-3">
//                             <form id="categoryForm">
//                                 <div class="mb-4">
//                                     <label for="product_name" class="form-label">Name</label>
//                                     <input type="text" placeholder="Type here" class="form-control" id="categoryName" />
//                                 </div>
//                                 <div class="mb-4">
//                                     <label class="form-label">Description</label>
//                                     <textarea placeholder="Type here" class="form-control" id="categoryDescription"></textarea>
//                                 </div>
//                                 <div class="d-grid">
//                                     <div id="errorMessages" class="text-danger"></div>
//                                     <button class="btn btn-primary" id="createCategoryButton">Create category</button>
//                                 </div>
//                             </form>
//                         </div>
//                         <div class="col-md-9">
//                             <div class="table-responsive">
//                                 <table class="table table-hover">
//                                     <thead>
//                                         <tr>
//                                             <th class="col-lg-2">Name</th>
//                                             <th class="col-lg-2">Description</th>
//                                             <th class="col-lg-2">Status</th>
//                                             <th class="col-lg-3 text-center">Action</th>
//                                         </tr>
//                                     </thead>
                                    
//                                 </table>
                                
//                             </div>
//                         </div>
//                         <!-- .col// -->
//                     </div>
//                     <!-- .row // -->
//                 </div>
//                 <!-- card body .// -->
//             </div>
//             <!-- card .// -->
//         </section>
//         <!-- content-main end// -->
//         <footer class="main-footer font-xs">
//             <div class="row pb-30 pt-15">
//                 <div class="col-sm-6">
//                     <script>
//                         document.write(new Date().getFullYear());
//                     </script>
//                     &copy; Nest - HTML Ecommerce Template .
//                 </div>
//                 <div class="col-sm-6">
//                     <div class="text-sm-end">All rights reserved</div>
//                 </div>
//             </div>
//         </footer>
//     </main>
//     <script src="assets/js/vendors/jquery-3.6.0.min.js"></script>
//     <script src="assets/js/vendors/bootstrap.bundle.min.js"></script>
//     <script src="assets/js/vendors/select2.min.js"></script>
//     <script src="assets/js/vendors/perfect-scrollbar.js"></script>
//     <script src="assets/js/vendors/jquery.fullscreen.min.js"></script>
//     <!-- Main Script -->
//     <script src="assets/js/main.js?v=1.1" type="text/javascript"></script>
//     <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

//     <script>
//         function displayError(errorMessage) {
//             document.getElementById('errorMessages').innerHTML = '';
//             const errorDiv = document.getElementById('errorMessages');
//             const errorParagraph = document.createElement('p');
//             errorParagraph.textContent = errorMessage;
//             errorDiv.appendChild(errorParagraph);
//         }

//         document.getElementById('categoryForm').addEventListener('submit',function( event ){
//             event.preventDefault()

//             const categoryName = document.getElementById('categoryName').value.trim()
//             const categoryDescription = document.getElementById('categoryDescription').value.trim()
            
//             const categoryFormDate = {
//                 categoryName: categoryName,
//                 categoryDescription: categoryDescription
//             }

//             axios.post('/admin/category', categoryFormDate)
//             .then(res => {
//                 if(res.data.next == 1){
//                     window.location.reload()
//                 }else if(res.data.next == 100){
//                     displayError("This category already there")
//                 }
//             })
//             .catch(err => {
//                 console.log("Error uploading category info: ", err)
//             })
//         })


//     </script>

// <script>
//     function unlistCategory(categoryId){
//         axios.post(`/admin/unlistcategory/${categoryId}`)
//         .then(res => {
//             if(res.data.success){
//                 let button = document.getElementById(`unlist-button-${categoryId}`);
//                 let status = document.getElementById(`unlist-status-${categoryId}`);
//                 if(button.classList.contains('btn-outline-danger')){
//                     status.classList.remove('badge-soft-success');
//                     status.classList.add('badge-soft-danger');
//                     status.innerHTML = 'Unlisted'; 
//                     button.classList.remove('btn-outline-danger');
//                     button.classList.add('btn-brand');
//                     button.innerHTML = '<i class="fas fa-check"></i> List';
//                 } else {
//                     status.classList.remove('badge-soft-danger');
//                     status.classList.add('badge-soft-success');
//                     status.innerHTML = 'Listed';
//                     button.classList.remove('btn-brand');
//                     button.classList.add('btn-outline-danger');
//                     button.innerHTML = '<i class="fas fa-ban"></i> Unlist';
//                 }
//             }
//         })
//         .catch(err => {
//             console.log("error in sending category id");
//         });
//     }
// </script>

// <script>
//     function editCategory(button) {
//         // Get the data attributes from the button
//         const categoryId = button.getAttribute('data-id');
//         const categoryName = button.getAttribute('data-name');
//         const categoryDescription = button.getAttribute('data-description');

//         // Redirect to the update route with the category data as query parameters
//         window.location.href = `/admin/updatecategory/${categoryId}`
//     }
// </script>



// </body>
// </html>

//! my home products

// <div class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
// <!-- Single Prodect -->
// <div class="product">
//     <span class="badges">
//         <span class="sale">-10%</span>
//         <span class="new">New</span>
//     </span>
//     <div class="thumb">
//         <a href="single-product.html" class="image">
//             <img src="assets/images/product-image/2.webp"
//                 alt="Product" />
//             <img class="hover-image"
//                 src="assets/images/product-image/2.webp"
//                 alt="Product" />
//         </a>
//     </div>
//     <div class="content">
//         <span class="category"><a href="#">Accessories</a></span>
//         <h5 class="title"><a href="single-product.html">Bluetooth
//                 Headphone
//             </a>
//         </h5>
//         <span class="price">
//             <span class="old">$48.50</span>
//             <span class="new">$38.50</span>
//         </span>
//     </div>
//     <div class="actions">
//         <button title="Add To Cart" class="action add-to-cart"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Cart"><i
//                 class="pe-7s-shopbag"></i></button>
//         <button class="action wishlist" title="Wishlist"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Wishlist"><i
//                 class="pe-7s-like"></i></button>
//         <button class="action quickview" data-link-action="quickview"
//             title="Quick view" data-bs-toggle="modal"
//             data-bs-target="#exampleModal"><i
//                 class="pe-7s-look"></i></button>
//         <button class="action compare" title="Compare"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Compare"><i
//                 class="pe-7s-refresh-2"></i></button>
//     </div>
// </div>
// </div>
// <div class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
// <!-- Single Prodect -->
// <div class="product">
//     <span class="badges">
//         <span class="new">Sale</span>
//     </span>
//     <div class="thumb">
//         <a href="single-product.html" class="image">
//             <img src="assets/images/product-image/3.webp"
//                 alt="Product" />
//             <img class="hover-image"
//                 src="assets/images/product-image/3.webp"
//                 alt="Product" />
//         </a>
//     </div>
//     <div class="content">
//         <span class="category"><a href="#">Accessories</a></span>
//         <h5 class="title"><a href="single-product.html">Smart Music Box
//             </a>
//         </h5>
//         <span class="price">
//             <span class="new">$38.50</span>
//         </span>
//     </div>
//     <div class="actions">
//         <button title="Add To Cart" class="action add-to-cart"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Cart"><i
//                 class="pe-7s-shopbag"></i></button>
//         <button class="action wishlist" title="Wishlist"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Wishlist"><i
//                 class="pe-7s-like"></i></button>
//         <button class="action quickview" data-link-action="quickview"
//             title="Quick view" data-bs-toggle="modal"
//             data-bs-target="#exampleModal"><i
//                 class="pe-7s-look"></i></button>
//         <button class="action compare" title="Compare"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Compare"><i
//                 class="pe-7s-refresh-2"></i></button>
//     </div>
// </div>
// </div>
// <div class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
// <!-- Single Prodect -->
// <div class="product">
//     <span class="badges">
//         <span class="new">New</span>
//     </span>
//     <div class="thumb">
//         <a href="single-product.html" class="image">
//             <img src="assets/images/product-image/4.webp"
//                 alt="Product" />
//             <img class="hover-image"
//                 src="assets/images/product-image/1.webp"
//                 alt="Product" />
//         </a>
//     </div>
//     <div class="content">
//         <span class="category"><a href="#">Accessories</a></span>
//         <h5 class="title"><a href="single-product.html">Air Pods 25Hjkl
//                 Black
//             </a>
//         </h5>
//         <span class="price">
//             <span class="new">$38.50</span>
//         </span>
//     </div>
//     <div class="actions">
//         <button title="Add To Cart" class="action add-to-cart"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Cart"><i
//                 class="pe-7s-shopbag"></i></button>
//         <button class="action wishlist" title="Wishlist"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Wishlist"><i
//                 class="pe-7s-like"></i></button>
//         <button class="action quickview" data-link-action="quickview"
//             title="Quick view" data-bs-toggle="modal"
//             data-bs-target="#exampleModal"><i
//                 class="pe-7s-look"></i></button>
//         <button class="action compare" title="Compare"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Compare"><i
//                 class="pe-7s-refresh-2"></i></button>
//     </div>
// </div>
// </div>
// <div class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
// <!-- Single Prodect -->
// <div class="product">
//     <span class="badges">
//     </span>
//     <div class="thumb">
//         <a href="single-product.html" class="image">
//             <img src="assets/images/product-image/5.webp"
//                 alt="Product" />
//             <img class="hover-image"
//                 src="assets/images/product-image/5.webp"
//                 alt="Product" />
//         </a>
//     </div>
//     <div class="content">
//         <span class="category"><a href="#">Accessories</a></span>
//         <h5 class="title"><a href="single-product.html">Smart Hand Watch
//             </a>
//         </h5>
//         <span class="price">
//             <span class="new">$38.50</span>
//         </span>
//     </div>
//     <div class="actions">
//         <button title="Add To Cart" class="action add-to-cart"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Cart"><i
//                 class="pe-7s-shopbag"></i></button>
//         <button class="action wishlist" title="Wishlist"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Wishlist"><i
//                 class="pe-7s-like"></i></button>
//         <button class="action quickview" data-link-action="quickview"
//             title="Quick view" data-bs-toggle="modal"
//             data-bs-target="#exampleModal"><i
//                 class="pe-7s-look"></i></button>
//         <button class="action compare" title="Compare"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Compare"><i
//                 class="pe-7s-refresh-2"></i></button>
//     </div>
// </div>
// </div>
// <div class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
// <!-- Single Prodect -->
// <div class="product">
//     <span class="badges">
//         <span class="sale">-8%</span>
//         <span class="new">Sale</span>
//     </span>
//     <div class="thumb">
//         <a href="single-product.html" class="image">
//             <img src="assets/images/product-image/6.webp"
//                 alt="Product" />
//             <img class="hover-image"
//                 src="assets/images/product-image/6.webp"
//                 alt="Product" />
//         </a>
//     </div>
//     <div class="content">
//         <span class="category"><a href="#">Accessories</a></span>
//         <h5 class="title"><a href="single-product.html">Smart Table
//                 Camera
//             </a>
//         </h5>
//         <span class="price">
//             <span class="old">$138.50</span>
//             <span class="new">$112.50</span>
//         </span>
//     </div>
//     <div class="actions">
//         <button title="Add To Cart" class="action add-to-cart"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Cart"><i
//                 class="pe-7s-shopbag"></i></button>
//         <button class="action wishlist" title="Wishlist"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Wishlist"><i
//                 class="pe-7s-like"></i></button>
//         <button class="action quickview" data-link-action="quickview"
//             title="Quick view" data-bs-toggle="modal"
//             data-bs-target="#exampleModal"><i
//                 class="pe-7s-look"></i></button>
//         <button class="action compare" title="Compare"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Compare"><i
//                 class="pe-7s-refresh-2"></i></button>
//     </div>
// </div>
// </div>
// <div class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
// <!-- Single Prodect -->
// <div class="product">
//     <span class="badges">
//         <span class="new">Sale</span>
//     </span>
//     <div class="thumb">
//         <a href="single-product.html" class="image">
//             <img src="assets/images/product-image/7.webp"
//                 alt="Product" />
//             <img class="hover-image"
//                 src="assets/images/product-image/1.webp"
//                 alt="Product" />
//         </a>
//     </div>
//     <div class="content">
//         <span class="category"><a href="#">Accessories</a></span>
//         <h5 class="title"><a href="single-product.html">Round Pocket
//                 Router
//             </a>
//         </h5>
//         <span class="price">
//             <span class="new">$38.50</span>
//         </span>
//     </div>
//     <div class="actions">
//         <button title="Add To Cart" class="action add-to-cart"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Cart"><i
//                 class="pe-7s-shopbag"></i></button>
//         <button class="action wishlist" title="Wishlist"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Wishlist"><i
//                 class="pe-7s-like"></i></button>
//         <button class="action quickview" data-link-action="quickview"
//             title="Quick view" data-bs-toggle="modal"
//             data-bs-target="#exampleModal"><i
//                 class="pe-7s-look"></i></button>
//         <button class="action compare" title="Compare"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Compare"><i
//                 class="pe-7s-refresh-2"></i></button>
//     </div>
// </div>
// </div>
// <div class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
// <!-- Single Prodect -->
// <div class="product">
//     <span class="badges">
//         <span class="sale">-5%</span>
//     </span>
//     <div class="thumb">
//         <a href="single-product.html" class="image">
//             <img src="assets/images/product-image/8.webp"
//                 alt="Product" />
//             <img class="hover-image"
//                 src="assets/images/product-image/8.webp"
//                 alt="Product" />
//         </a>
//     </div>
//     <div class="content">
//         <span class="category"><a href="#">Accessories</a></span>
//         <h5 class="title"><a href="single-product.html">Power Bank
//                 10000Mhp
//             </a>
//         </h5>
//         <span class="price">
//             <span class="old">$260.00</span>
//             <span class="new">$238.50</span>
//         </span>
//     </div>
//     <div class="actions">
//         <button title="Add To Cart" class="action add-to-cart"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Cart"><i
//                 class="pe-7s-shopbag"></i></button>
//         <button class="action wishlist" title="Wishlist"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Wishlist"><i
//                 class="pe-7s-like"></i></button>
//         <button class="action quickview" data-link-action="quickview"
//             title="Quick view" data-bs-toggle="modal"
//             data-bs-target="#exampleModal"><i
//                 class="pe-7s-look"></i></button>
//         <button class="action compare" title="Compare"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal-Compare"><i
//                 class="pe-7s-refresh-2"></i></button>
//     </div>
// </div>
// </div>

// <% for (let i=0; i < 3; i++) { %>
//     <input class="form-control" type="file" id="image<%= i + 1 %>"
//         name="images" onchange="previewImage(event, 'preview<%= i + 1 %>')">
//     <img id="preview<%= i + 1 %>"
//         src="<%= product.imagePaths[i] ? product.imagePaths[i] : '' %>"
//         style="width: 100px; height: auto; margin-top: 10px;"
//         alt="Image Preview">

//     <% } %>

{/* <div class="product-details-area pt-100px pb-100px">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 col-sm-12 col-xs-12 mb-lm-30px mb-md-30px mb-sm-30px">
                                <!-- Swiper -->
                                <div class="swiper-container zoom-top">
                                    <div class="swiper-wrapper">
                                        <% product.imagePaths.forEach((imagePath, index)=> { %>
                                            <div class="swiper-slide">
                                                <img class="img-responsive m-auto" src="<%= imagePath %>"
                                                    alt="<%= product.productName %> Image <%= index + 1 %>">
                                                <a class="venobox full-preview" data-gall="myGallery"
                                                    href="<%= imagePath %>">
                                                    <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                            <% }); %>
                                    </div>
                                </div>
                                <div class="swiper-container mt-20px zoom-thumbs slider-nav-style-1 small-nav">
                                    <div class="swiper-wrapper">
                                        <% product.imagePaths.forEach(imagePath=> { %>
                                            <div class="swiper-slide">
                                                <img class="img-responsive m-auto" src="<%= imagePath %>"
                                                    alt="<%= product.productName %> Thumbnail">
                                            </div>
                                            <% }); %>
                                    </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-buttons">
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12 col-xs-12" data-aos="fade-up" data-aos-delay="200">
                                <div class="product-details-content quickview-content ml-25px">
                                    <h2>
                                        <%= product.productName %>
                                    </h2>
                                    <div class="pricing-meta">
                                        <ul class="d-flex">
                                            <li class="new-price">$<%= product.price.toFixed(2) %>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="pro-details-rating-wrap">
                                        <div class="rating-product">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <span class="read-review"><a class="reviews" href="#">(5 Customer
                                                Review)</a></span>
                                    </div>
                                    <p class="mt-30px">
                                        <%= product.description %>
                                    </p>
                                    <!-- <div class="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>SKU:</span>
                                        <ul class="d-flex">
                                            <li>
                                                <a href="#">Ch-256xl</a>
                                            </li>
                                        </ul>
                                    </div> -->
                                    <div class="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Categories: </span>
                                        <ul class="d-flex">
                                            <li>
                                                <a href="#">
                                                    <%= product.category %>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- <div class="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Tags: </span>
                                        <ul class="d-flex">
                                            <li>
                                                <a href="#">Smart Device, </a>
                                            </li>
                                            <li>
                                                <a href="#">Phone</a>
                                            </li>
                                        </ul>
                                    </div> -->
                                    <div class="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Stock: </span>
                                        <ul class="d-flex">

                                            <li>
                                                <p>
                                                    <%= product.stock %> units
                                                </p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="pro-details-quality">
                                        <div class="cart-plus-minus">
                                            <input class="cart-plus-minus-box" type="text" name="qtybutton" value="1" />
                                        </div>
                                        <div class="pro-details-cart">
                                            <button class="add-cart"> Add To Cart</button>
                                        </div>
                                        <div class="pro-details-compare-wishlist pro-details-wishlist">
                                            <a href="wishlist.html"><i class="pe-7s-like"></i></a>
                                        </div>
                                        <div class="pro-details-compare-wishlist pro-details-wishlist">
                                            <a href="compare.html"><i class="pe-7s-refresh-2"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <!-- product details description area start -->
                                <div class="description-review-wrapper">
                                    <div class="description-review-topbar nav">
                                        <button data-bs-toggle="tab" data-bs-target="#des-details2">Information</button>
                                        <button class="active" data-bs-toggle="tab"
                                            data-bs-target="#des-details1">Description</button>
                                        <button data-bs-toggle="tab" data-bs-target="#des-details3">Reviews
                                            (02)</button>
                                    </div>
                                    <div class="tab-content description-review-bottom">
                                        <div id="des-details2" class="tab-pane">
                                            <div class="product-anotherinfo-wrapper text-start">
                                                <ul>
                                                    <li><span>Weight</span> 400 g</li>
                                                    <li><span>Dimensions</span> 10 x 10 x 15 cm</li>
                                                    <li><span>Materials</span> 60% cotton, 40% polyester</li>
                                                    <li><span>Other Info</span> American heirloom jean shorts pug seitan
                                                        letterpress</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div id="des-details1" class="tab-pane active">
                                            <div class="product-description-wrapper">
                                                <p>
                                                    <%= product.description %>
                                                </p>
                                            </div>
                                        </div>
                                        <div id="des-details3" class="tab-pane">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="review-wrapper">
                                                        <div class="single-review">
                                                            <div class="review-img">
                                                                <img src="assets/images/review-image/1.png" alt="" />
                                                            </div>
                                                            <div class="review-content">
                                                                <div class="review-top-wrap">
                                                                    <div class="review-left">
                                                                        <div class="review-name">
                                                                            <h4>White Lewis</h4>
                                                                        </div>
                                                                        <div class="rating-product">
                                                                            <i class="fa fa-star"></i>
                                                                            <i class="fa fa-star"></i>
                                                                            <i class="fa fa-star"></i>
                                                                            <i class="fa fa-star"></i>
                                                                            <i class="fa fa-star"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div class="review-left">
                                                                        <a href="#">Reply</a>
                                                                    </div>
                                                                </div>
                                                                <div class="review-bottom">
                                                                    <p>
                                                                        Vestibulum ante ipsum primis aucibus orci
                                                                        luctustrices posuere cubilia Curae Suspendisse
                                                                        viverra ed viverra. Mauris ullarper euismod
                                                                        vehicula. Phasellus quam nisi, congue id nulla.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="single-review child-review">
                                                            <div class="review-img">
                                                                <img src="assets/images/review-image/2.png" alt="" />
                                                            </div>
                                                            <div class="review-content">
                                                                <div class="review-top-wrap">
                                                                    <div class="review-left">
                                                                        <div class="review-name">
                                                                            <h4>White Lewis</h4>
                                                                        </div>
                                                                        <div class="rating-product">
                                                                            <i class="fa fa-star"></i>
                                                                            <i class="fa fa-star"></i>
                                                                            <i class="fa fa-star"></i>
                                                                            <i class="fa fa-star"></i>
                                                                            <i class="fa fa-star"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div class="review-left">
                                                                        <a href="#">Reply</a>
                                                                    </div>
                                                                </div>
                                                                <div class="review-bottom">
                                                                    <p>Vestibulum ante ipsum primis aucibus orci
                                                                        luctustrices posuere cubilia Curae Sus pen disse
                                                                        viverra ed viverra. Mauris ullarper euismod
                                                                        vehicula.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="ratting-form-wrapper pl-50">
                                                        <h3>Add a Review</h3>
                                                        <div class="ratting-form">
                                                            <form action="#">
                                                                <div class="star-box">
                                                                    <span>Your rating:</span>
                                                                    <div class="rating-product">
                                                                        <i class="fa fa-star"></i>
                                                                        <i class="fa fa-star"></i>
                                                                        <i class="fa fa-star"></i>
                                                                        <i class="fa fa-star"></i>
                                                                        <i class="fa fa-star"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="rating-form-style">
                                                                            <input placeholder="Name" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="rating-form-style">
                                                                            <input placeholder="Email" type="email" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-12">
                                                                        <div class="rating-form-style form-submit">
                                                                            <textarea name="Your Review"
                                                                                placeholder="Message"></textarea>
                                                                            <button
                                                                                class="btn btn-primary btn-hover-color-primary"
                                                                                type="submit"
                                                                                value="Submit">Submit</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- product details description area end -->
                            </div>
                        </div>
                    </div>
                </div> */}

//! createProducts
// <%- include('../layout/adminhead.ejs') %>

// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css">

// </head>


//     <body class="dark">
//         <div class="screen-overlay"></div>
//         <aside class="navbar-aside" id="offcanvas_aside">
//             <div class="aside-top">
//                 <a href="index.html" class="brand-wrap">
//                     <img src="assets/imgs/theme/logo.svg" class="logo" alt="Nest Dashboard" />
//                 </a>
//                 <div>
//                     <button class="btn btn-icon btn-aside-minimize"><i
//                             class="text-muted material-icons md-menu_open"></i></button>
//                 </div>
//             </div>
//             <nav>
//                 <ul class="menu-aside">
//                     <li class="menu-item active">
//                         <a class="menu-link" href="/admin/dashboard">
//                             <i class="icon material-icons md-home"></i>
//                             <span class="text">Dashboard</span>
//                         </a>
//                     </li>
//                     <li class="menu-item ">
//                         <a class="menu-link" href="/admin/users">
//                             <i class="icon material-icons md-person"></i>
//                             <span class="text">Users</span>
//                         </a>
//                     </li>
//                     <li class="menu-item">
//                         <a class="menu-link" href="/admin/orders">
//                             <i class="icon material-icons md-shopping_cart"></i>
//                             <span class="text">Orders</span>
//                         </a>
//                     </li>
//                     <li class="menu-item">
//                         <a class="menu-link" href="/admin/products">
//                             <i class="icon material-icons md-shopping_bag"></i>
//                             <span class="text">Products</span>
//                         </a>
//                     </li>
//                     <li class="menu-item">
//                         <a class="menu-link" href="/admin/category">
//                             <i class="icon material-icons md-category"></i>
//                             <span class="text">Categories</span>
//                         </a>
//                     </li>
//                     <li class="menu-item">
//                         <a class="menu-link" href="/admin/brands">
//                             <i class="icon material-icons md-business"></i>
//                             <span class="text">Brands</span>
//                         </a>
//                     </li>
//                     <li class="menu-item">
//                         <a class="menu-link" href="/admin/offers">
//                             <i class="icon material-icons md-local_offer"></i>
//                             <span class="text">Offers</span>
//                         </a>
//                     </li>
//                     <li class="menu-item">
//                         <a class="menu-link" href="/admin/coupons">
//                             <i class="icon material-icons md-card_giftcard"></i>
//                             <span class="text">Coupons</span>
//                         </a>
//                     </li>
//                 </ul>
//             </nav>
//         </aside>
//         <main class="main-wrap">
//             <header class="main-header navbar">
//                 <div class="col-search">
//                     <form class="searchform">
//                         <div class="input-group">
//                             <input list="search_terms" type="text" class="form-control" placeholder="Search term">
//                             <button class="btn btn-light bg" type="button"> <i
//                                     class="material-icons md-search"></i></button>
//                         </div>
//                     </form>
//                 </div>
//                 <div class="col-nav">
//                     <button class="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside"> <i
//                             class="material-icons md-apps"></i> </button>
//                     <ul class="nav">
//                         <li class="nav-item">
//                             <a class="nav-link btn-icon darkmode" href="#"> <i
//                                     class="material-icons md-nights_stay"></i> </a>
//                         </li>
//                     </ul>
//                 </div>
//             </header>
//             <section class="content-main">
//                 <div class="row">
//                     <div class="col-6">
//                         <div class="content-header">
//                             <h2 class="content-title">Add New Product</h2>
//                             <div>
//                                 <button class="btn btn-md rounded font-sm hover-up"
//                                     onclick="getProductDetails()">Add</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="row">
//                     <div class="col-lg-6">
//                         <div class="card mb-4">
//                             <div class="card-body">
//                                 <div class="row">
//                                     <div class="col-md-3">
//                                         <h6>1. General info</h6>
//                                     </div>
//                                     <div class="col-md-9">
//                                         <div class="mb-4">
//                                             <label class="form-label">Product title</label>
//                                             <div id="errorMessagesName" class="text-danger"></div>
//                                             <input type="text" id="productTitle" placeholder="Type here"
//                                                 class="form-control" required>
//                                         </div>
//                                         <div class="mb-4">
//                                             <label class="form-label">Description</label>
//                                             <div id="errorMessagesDescription" class="text-danger"></div>

//                                             <textarea id="productDescription" placeholder="Type here"
//                                                 class="form-control" rows="4" required></textarea>
//                                         </div>
//                                         <div class="mb-4">
//                                             <label class="form-label">Brand name</label>
//                                             <!-- You can uncomment and use this select if needed -->
//                                             <select id="productBrand" class="form-select">
//                                                 <option value="none">None</option>
//                                                 <option>Apple</option>
//                                                 <option>Samsung</option>
//                                                 <option>Oneplus</option>
//                                                 <option>Nothing</option>
//                                                 <option>iqoo</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <hr class="mb-4 mt-0">
//                                 <div class="row">
//                                     <div class="col-md-3">
//                                         <h6>2. Pricing</h6>
//                                     </div>
//                                     <div class="col-md-9">
//                                         <div class="mb-4">
//                                             <label class="form-label">Cost in INR</label>
//                                             <div id="errorMessagesPrice" class="text-danger"></div>

//                                             <input type="text" id="productCost" placeholder="₹00.0" class="form-control"
//                                                 required>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <hr class="mb-4 mt-0">
//                                 <div class="row">
//                                     <div class="col-md-3">
//                                         <h6>3. Category</h6>
//                                     </div>
//                                     <div class="col-md-9">
//                                         <div class="mb-4">
//                                             <% if(categories.length> 0) {%>
//                                                 <% categories.forEach(category=> { %>
//                                                     <label class="mb-2 form-check form-check-inline"
//                                                         style="width: 45%;">
//                                                         <input class="form-check-input" checked name="mycategory"
//                                                             type="radio" value="Clothes">
//                                                         <span class="form-check-label">
//                                                             <%= category.categoryName %>
//                                                         </span>
//                                                     </label>
//                                                     <% }) %>
//                                                         <% }else{ %>
//                                                             <label class="mb-2" style="width: 45%;">

//                                                                 <span class="form-check-label text-danger">*No
//                                                                     categories found</span>
//                                                             </label>
//                                                             <% } %>

//                                         </div>
//                                     </div>
//                                 </div>
//                                 <hr class="mb-4 mt-0">
//                                 <div class="row">

//                                     <div class="col-md-3">
//                                         <h6>4. Stock Information</h6>
//                                     </div>
//                                     <div class="col-md-9">
//                                         <div class="mb-4">
//                                             <label class="form-label">Quantity</label>
//                                             <div id="errorMessagesStock" class="text-danger"></div>

//                                             <input type="number" id="productQuantity" placeholder="Enter quantity"
//                                                 class="form-control" required>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <hr class="mb-4 mt-0">
//                                 <div class="row">
//                                     <div class="col-md-3">
//                                         <h6>5. Media</h6>
//                                     </div>
//                                     <div class="col-md-9">
//                                         <div class="mb-4">
//                                             <label class="form-label">Images</label>
//                                             <div id="errorMessagesImage" class="text-danger"></div>

//                                             <input class="form-control" type="file" id="image1" name="images"
//                                                 onchange="previewImage(event, 'preview1')" required>
//                                             <img id="preview1"
//                                                 style="width: 100px; height: 100px; margin-top: 10px; display: none;"
//                                                 alt="Image Preview" />
//                                             <input class="form-control" type="file" id="image2" name="images"
//                                                 onchange="previewImage(event, 'preview2')">
//                                             <img id="preview2"
//                                                 style="width: 100px; height: 100px; margin-top: 10px; display: none;"
//                                                 alt="Image Preview" />
//                                             <input class="form-control" type="file" id="image3" name="images"
//                                                 onchange="previewImage(event, 'preview3')">
//                                             <img id="preview3"
//                                                 style="width: 100px; height: 100px; margin-top: 10px; display: none;"
//                                                 alt="Image Preview" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <div id="cropModal" style="display:none;">
//                 <img id="cropImage" style="max-width: 100%;">
//                 <button id="cropButton">Crop</button>
//             </div>

//             <footer class="main-footer font-xs">
//                 <div class="row pb-30 pt-15">
//                     <div class="col-sm-6">
//                         <script>
//                             document.write(new Date().getFullYear())
//                         </script> &copy; Nest - HTML Ecommerce Template .
//                     </div>
//                     <div class="col-sm-6">
//                         <div class="text-sm-end">
//                             All rights reserved
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </main>
//         <script src="assets/js/vendors/jquery-3.6.0.min.js"></script>
//         <script src="assets/js/vendors/bootstrap.bundle.min.js"></script>
//         <script src="assets/js/vendors/select2.min.js"></script>
//         <script src="assets/js/vendors/perfect-scrollbar.js"></script>
//         <script src="assets/js/vendors/jquery.fullscreen.min.js"></script>
//         <!-- Main Script -->
//         <script src="assets/js/main.js?v=1.1" type="text/javascript"></script>
//         <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//         <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js"></script>
//         <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//     </body>

//     <script>

//         function validateProductDetails() {
//             let title = document.getElementById('productTitle').value.trim();
//             let description = document.getElementById('productDescription').value.trim();
//             let cost = document.getElementById('productCost').value.trim();
//             let stock = document.getElementById('productQuantity').value.trim();
//             let image_one = document.getElementById('image1').files[0]
//             let image_two = document.getElementById('image2').files[0]
//             let image_three = document.getElementById('image3').files[0]

//             document.getElementById('errorMessagesName').innerHTML = '';
//             document.getElementById('errorMessagesDescription').innerHTML = '';
//             document.getElementById('errorMessagesPrice').innerHTML = '';
//             document.getElementById('errorMessagesStock').innerHTML = '';
//             document.getElementById('errorMessagesImage').innerHTML = '';


//             //product name validation
//             if (title === '') {
//                 displayErrorName('*Product name is required.')
//                 return false;
//             } else if (title.length < 3) {
//                 displayErrorName(`*Product name must be at least 3 characters long.`);
//                 return false;
//             } else if (title.length > 30) {
//                 displayErrorName(`*Product name must be less than 30 characters long.`);
//                 return false;
//             }

//             //product description validation
//             if (description === '') {
//                 displayErrorDescription('*Product description is required.')
//                 return false;
//             }

//             //product price validation
//             var minPrice = 5000;
//             var maxPrice = 200000;

//             if (cost === '') {
//                 displayErrorPrice('*Product price is required.')
//                 return false;
//             } else if (isNaN(cost) || cost <= 0) {
//                 displayErrorPrice('*Product price must be a positive number.')
//                 return false;
//             } else if (cost < minPrice) {
//                 displayErrorPrice(`*Product price must be at least $${minPrice.toFixed(2)}.`)
//                 return false;
//             } else if (cost > maxPrice) {
//                 displayErrorPrice(`*Product price must be less than or equal to $${maxPrice.toFixed(2)}.`)
//                 return false;
//             }

//             //product quantity validation
//             var minQuantity = 1;
//             var maxQuantity = 100

//             if (stock == '') {
//                 displayErrorStock('*Product quantity is required.')
//                 return false
//             } else if (isNaN(stock) || stock <= 0) {
//                 displayErrorStock('*Product quantity must be a positive integer.');
//                 return false;
//             } else if (stock < minQuantity) {
//                 displayErrorStock(`*Product quantity must be at least ${minQuantity}.`);
//                 return false;
//             } else if (stock > maxQuantity) {
//                 displayErrorStock(`*Product quantity must be less than or equal to ${maxQuantity}.`);
//                 return false;
//             }

//             //product image validation
//             if (!image_one) {
//                 displayErrorImage('*Product image is required.')
//                 return false;
//             } else {
//                 // Check file type
//                 var allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//                 if (!allowedTypes.includes(image_one.type)) {
//                     displayErrorImage('*Only JPEG, PNG, and GIF images are allowed.')
//                     return false
//                 } else {
//                     // Check file size (in bytes)
//                     var maxSize = 5 * 1024 * 1024; // 5MB
//                     if (image_one.size > maxSize) {
//                         displayErrorImage('*Maximum file size is 5MB.');
//                         return false;
//                     }
//                 }
//             }

//             if (!image_two) {
//                 displayErrorImage('*Please select 3 images.')
//                 return false;
//             } else {
//                 // Check file type
//                 var allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//                 if (!allowedTypes.includes(image_one.type)) {
//                     displayErrorImage('*Only JPEG, PNG, and GIF images are allowed.')
//                     return false
//                 } else {
//                     // Check file size (in bytes)
//                     var maxSize = 5 * 1024 * 1024; // 5MB
//                     if (image_one.size > maxSize) {
//                         displayErrorImage('*Maximum file size is 5MB.');
//                         return false;
//                     }
//                 }
//             }

//             if (!image_three) {
//                 displayErrorImage('*Please select 3 images.')
//                 return false;
//             } else {
//                 // Check file type
//                 var allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//                 if (!allowedTypes.includes(image_one.type)) {
//                     displayErrorImage('*Only JPEG, PNG, and GIF images are allowed.')
//                     return false
//                 } else {
//                     // Check file size (in bytes)
//                     var maxSize = 5 * 1024 * 1024; // 5MB
//                     if (image_one.size > maxSize) {
//                         displayErrorImage('*Maximum file size is 5MB.');
//                         return false;
//                     }
//                 }
//             }

//             return true
//         }

//         function displayErrorName(errorMessage) {
//             const errorDiv = document.getElementById('errorMessagesName');
//             const errorParagraph = document.createElement('p');
//             errorParagraph.textContent = errorMessage;
//             errorDiv.appendChild(errorParagraph);
//         }

//         function displayErrorDescription(errorMessage) {
//             const errorDiv = document.getElementById('errorMessagesDescription');
//             const errorParagraph = document.createElement('p');
//             errorParagraph.textContent = errorMessage;
//             errorDiv.appendChild(errorParagraph);
//         }

//         function displayErrorPrice(errorMessage) {
//             const errorDiv = document.getElementById('errorMessagesPrice');
//             const errorParagraph = document.createElement('p');
//             errorParagraph.textContent = errorMessage;
//             errorDiv.appendChild(errorParagraph);
//         }

//         function displayErrorStock(errorMessage) {
//             const errorDiv = document.getElementById('errorMessagesStock');
//             const errorParagraph = document.createElement('p');
//             errorParagraph.textContent = errorMessage;
//             errorDiv.appendChild(errorParagraph);
//         }

//         function displayErrorImage(errorMessage) {
//             const errorDiv = document.getElementById('errorMessagesImage');
//             const errorParagraph = document.createElement('p');
//             errorParagraph.textContent = errorMessage;
//             errorDiv.appendChild(errorParagraph);
//         }

//         document.getElementById('productTitle').addEventListener('input', validateProductDetails)
//         document.getElementById('productDescription').addEventListener('input', validateProductDetails)
//         document.getElementById('productCost').addEventListener('input', validateProductDetails)
//         document.getElementById('productQuantity').addEventListener('input', validateProductDetails)
//         document.getElementById('image1').addEventListener('input', validateProductDetails)
//         document.getElementById('image2').addEventListener('input', validateProductDetails)
//         document.getElementById('image3').addEventListener('input', validateProductDetails)



//         function getProductDetails() {

//             if (validateProductDetails()) {
//                 // Get values from the form
//                 let title = document.getElementById('productTitle').value;
//                 let description = document.getElementById('productDescription').value;
//                 let brand = document.getElementById('productBrand').value
//                 let cost = document.getElementById('productCost').value;
//                 let stock = document.getElementById('productQuantity').value;
//                 let category = document.querySelector('input[name="mycategory"]:checked').value;

//                 // Create a FormData object to handle file uploads
//                 let formData = new FormData();
//                 formData.append('title', title);
//                 formData.append('description', description);
//                 formData.append('brand', brand);
//                 formData.append('cost', cost);
//                 formData.append('category', category);
//                 formData.append('stock', stock);
//                 formData.append('images', document.getElementById('image1').files[0]);
//                 formData.append('images', document.getElementById('image2').files[0]);
//                 formData.append('images', document.getElementById('image3').files[0]);

//                 for (let [key, value] of formData.entries()) {
//                     console.log(`Key: ${key}, Value:`, value);
//                 }

//                 // Send the form data using Axios
//                 axios.post('/admin/createproducts', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 })
//                     .then(res => {
//                         if (res.data.success) {
//                             window.location.href = '/admin/products'
//                         } else {
//                             displayErrorName("*Product is already there")
//                         }
//                     })
//                     .catch(err => {
//                         console.log(err);
//                     });
//             }

//         }
//     </script>
//     <script>
//         function previewImage(event, previewId) {
//             const reader = new FileReader();
//             reader.onload = function () {
//                 const output = document.getElementById(previewId);
//                 output.src = reader.result;
//                 output.style.display = 'inline-block'; // Show the preview image after uploading
//             }
//             reader.readAsDataURL(event.target.files[0]);
//         }
//     </script>


//     </html>