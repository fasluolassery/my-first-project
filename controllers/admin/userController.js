const User = require('../../models/userModel');
const bcrypt = require('bcrypt')

const loadUsers = async (req, res) => {
    try {
        const allUsers = await User.find()

        res.render('admin/users', { users: allUsers })
    } catch (error) {
        console.log("Error loading users", error.message)
    }
}

const loadCreateUser = async (req, res) => {
    try {
        res.render('admin/createuser')
    } catch (error) {
        console.log("Error loading createUser", error.message)
    }
}

const blockUser = async (req, res) => {
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
        console.log("Error in block user", error.message)
    }
}

const createUser = async (req, res) => {
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
        console.log(error.message)
    }
}

module.exports = {
    loadUsers,
    blockUser,
    loadCreateUser,
    createUser,
}