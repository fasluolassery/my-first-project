const express = require('express');
const path = require('path');
const session = require('express-session')
const flash = require('express-flash')
const passport = require('./config/passport')  //? google
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
const errorHandler = require('./middlewares/errorHandler')
const nocache = require('nocache');

require('dotenv').config();
// -----------------------------------------------

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to Mongo DB Hai hello"))
.catch(( error ) => console.log("Error connecting to Mongo DB", error));
// ---------------------------------------------------------------------

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// ------------------------------------------------

app.use(nocache());
// ----------------

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false
}))
// --------------------------

app.use(passport.initialize());
app.use(passport.session());
// -----------------------------

app.use(flash())
// -------------

const port = process.env.PORT || 7777;
// -----------------------------------

//routes
app.use('/public', express.static('public'));
app.use('/login', express.static('public'));
app.use('/cart', express.static('public'));
app.use('/admin/orderdetails', express.static('public'));
app.use('/orderDetails', express.static('public'));
// ------------------------------------------------------

//directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/admin')));
app.use(express.static(path.join(__dirname, 'public/user')));
// -----------------------------------------------------------

// Set the view engine to EJS
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
// --------------------------

// Use the user router
app.use('/', userRoutes);
// ---------------------

// Use the admin router
app.use('/admin', adminRoutes);
// ---------------------------

//error handle page not found
// app.use((req, res) => {
//     res.status(404).render('user/404');
// });

app.use(errorHandler)

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Admin side at http://localhost:${port}/admin/dashboard`);
});
// --------------------------------------------------------------