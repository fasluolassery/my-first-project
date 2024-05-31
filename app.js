const express = require('express');
const path = require('path');
const session = require('express-session')
const flash = require('express-flash')
const passport = require('./config/passport')
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
require('dotenv').config();
// -----------------------------------------------

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/GadgetGalaxy')
.then(() => console.log("Connected to Mongo DB"))
.catch(( error ) => console.log("Error connecting to Mongo DB", error));
// ---------------------------------------------------------------------

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// ------------------------------------------------

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

app.use('/public', express.static('public'));
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

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Admin side at http://localhost:${port}/admin/dashboard`);
});
// --------------------------------------------------------------