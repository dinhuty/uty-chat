
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mailer = require('../service/mailer')
const { cloudinary } = require('../service/cloudinary')


// POST /user/signup
const signup = async (req, res, next) => {
    try {
        const email = req.body.email
        //Check oldUser
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(200).json({ error: "User Already Exist" })
        }
        const user = new User(req.body)
        const saveUser = await user.save()

        res.status(201).json(saveUser)
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
        }, { new: true })
        await updateUser.save()
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        // mailer(email, `<h1>Hi ${user.name}! Ban vua dang nhap he thong</h1>`)
        res.status(200).json({ user: updateUser, token })
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

const findUserByEmail = async (req, res, next) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi không xác định" });
    }
};

const findUsersByEmailKeyword = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;
        const excludedUserIds = req.query.excludedIds || [];
        const users = await User.find({
            email: { $regex: keyword, $options: 'i' },
            _id: { $nin: excludedUserIds }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi không xác định" });
    }
};
// PUT /user/updatepassword
const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body
        const user = req.user

        const passwordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ error: "Mat khau khong chính xác" })
        }
        if (newPassword !== confirmPassword) throw new Error("Mat khau khong khop")

        user.password = newPassword
        const saveNewPassword = await user.save()
        res.status(200).json({ success: "Doi mk thanh cong" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
// Pathc /user/change-avatar
const changeAvatar = async (req, res, next) => {
    try {
        const { newAvatar } = req.body
        const user = req.user
        if (newAvatar) {
            console.log("newAvatar", newAvatar)
            const responseUpload = await cloudinary.uploader.upload(newAvatar, {
                upload_preset: 'uty_chat'
            })
            console.log(responseUpload)
            user.avatarURL = responseUpload.secure_url

        } else {
            throw new Error("Lỗi thay đổi avatar")
        }
        const saveAvatar = await user.save()
        res.status(200).json({ user })

    } catch (error) {
        res.status(500).json({ error: "Lỗi thay đổi avatar" })
    }
}
//POST /user/forgotPassword
const forgotPassword = async (req, res, next) => {
    try {

        const email = req.body.email
        console.log(email)
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("Email chua duoc dang ky")
        }
        const token = await user.createPasswordResetToken();
        const resetURL = `<h1>Ban co 5phut de thay doi mat khau <a href="https://uty-chat-api.vercel.app/api/user/resetpassword/${user._id}/${token}">Tao mat khau moi</a></h1>`
        mailer(email, resetURL)
        res.status(200).json({ success: "Kiem tra email" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
// GET /user/resetpassword/:id/:token
const resetPasswordForm = async (req, res, next) => {
    try {
        const { id, token } = req.params
        const user = await User.findOne({ _id: id })
        if (!user) throw new Error("Da xay ra loi")
        const data = jwt.verify(token, process.env.JWT_KEY)
        res.render('index', { id, token })
    } catch (error) {
        res.render('error')
    }
}
// post /user/resetpassword/:id/:token
const resetPassword = async (req, res, next) => {
    try {
        const { id, token } = req.params
        const user = await User.findOne({ _id: id })
        if (!user) throw new Error("Da xay ra loi")
        const data = jwt.verify(token, process.env.JWT_KEY)
        const { password } = await req.body
        console.log(req.body)
        user.password = password
        const saveNewPassword = await user.save()
        res.status(200).json({ success: "đổi mk thành công" })
    } catch (error) {
        res.status(500).json({ error: "đổi mk ko thành công" })
    }
}

const blockUser = async (req, res, next) => {
    try {
        const { idUserBlock } = req.body
        const user = req.user
        user.blockedUsers.push(idUserBlock)
        const save = await user.save()
        res.status(200).json({ succes: "Blocked" })
    } catch (error) {
        res.status(500).json({ error: "Lỗi server" })
    }
}
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        console.log(refreshToken)
        // const cookie = req.cookies
        // if (!cookie?.refreshToken) throw new Error('No Refesh Token in Cookie')
        // const refreshToken = cookie.refreshToken
        const user = await User.findOne({ refreshToken })
        if (!user) throw new Error('No RefresToken present in db or no match')
        const data = jwt.verify(refreshToken, process.env.JWT_KEY)
        const accessToken = await user.generateAuthToken()

        res.status(200).json({ accessToken })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = {
    signin,
    signup,
    userProfile,
    findUserByEmail,
    findUsersByEmailKeyword,
    updatePassword,
    forgotPassword,
    resetPasswordForm,
    resetPassword,
    changeAvatar,
    blockUser,
    refreshToken
}