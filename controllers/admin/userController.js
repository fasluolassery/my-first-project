const User = require('../../models/userModel');
const bcrypt = require('bcrypt')

const loadUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page, default to 1
        const limit = 5; // Number of users per page
        const skip = (page - 1) * limit; // Calculate number of users to skip

        const users = await User.find().sort({createdAt: 1}).limit(limit).skip(skip); // Fetch users for current page
        const totalUsers = await User.countDocuments(); // Total number of users
        const totalPages = Math.ceil(totalUsers / limit); // Total number of pages

        res.render('admin/users', { 
            users, 
            currentPage: page, 
            totalPages 
        });
    } catch (error) {
        next(error);
    }
}


const loadCreateUser = async (req, res, next) => {
    try {
        res.render('admin/createuser')
    } catch (error) {
        next(error)
    }
}

const blockUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({ _id: userId })
        if (user) {
            user.isBlock = !user.isBlock
            const update = await user.save()
            console.log(`${user.username}'s status changed to  : ${user.isBlock}`) //! to remove
            res.send({ success: true })
        } else {
            console.log("user id not found to block or unblock")
            res.send({ success: false })
        }
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        const { userName, userEmail, userPhone, userPassword } = req.body

        const existingUser = await User.findOne({ email: userEmail })

        if (existingUser) {
            res.send({ status: "Email is already registered" })
            return console.log("Email is already registered")
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10)

        const user = new User({
            username: userName,
            email: userEmail,
            phone: userPhone,
            password: hashedPassword
        })

        const saving = await user.save()
        if (saving) {
            req.session.user = userEmail
            res.send({ status: "success" })

        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    loadUsers,
    blockUser,
    loadCreateUser,
    createUser,
}