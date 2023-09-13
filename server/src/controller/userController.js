
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// POST /user/signup
const signup = async (req, res, next) => {
    try {
        const email = req.body.email
        //Check oldUser
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(400).send({ error: "User Already Exist" })
        }
        const user = new User(req.body)
        const saveUser = await user.save()

        res.status(200).json(saveUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "account password is incorrect" })
    }
}

// POST /user/signin
const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        const refreshToken = await user.generateRefreshToken()
        const updateUser = await User.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        // mailer(email, `<h1>Hi ${user.name}! Ban vua dang nhap he thong</h1>`)
        res.status(200).json({ user, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Error" })
    }
}
// GET /user/me
const userProfile = async (req, res, next) => {
    try {
        // const user = User.findOne({email})
        res.status(200).json({ success: "Okem" })
    } catch (error) {
        res.status(500).json({ error: "Not find" })
    }
    res.status(200).send(req.user)
}




module.exports = { signin, signup, userProfile }