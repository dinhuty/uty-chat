const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarURL: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        required: true,
    },
    blockedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    refreshToken: {
        type: String
    }
},

    { timestamps: true }
)
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_KEY,
        {
            expiresIn: "2h",
        }
    )
    return token
}
userSchema.methods.generateRefreshToken = async function () {

    const user = this
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_KEY,
        {
            expiresIn: "3d",
        }
    )
    return token
}
userSchema.methods.createPasswordResetToken = async function () {

    const user = this
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_KEY,
        {
            expiresIn: "3d",
            // expiresIn: '300s',
        }
    )
    return token
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) {
        throw new Error('Tai khoan chua duoc dang ky')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Mat khau khong chinh xac')
    }
    return user
}
module.exports = mongoose.model('User', userSchema)