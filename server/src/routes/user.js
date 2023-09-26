const express = require('express')
const {
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
    blockUser
} = require('../controller/userController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/findbyemail/:email', findUserByEmail)
router.get('/findbykeyword', findUsersByEmailKeyword)
router.patch('/updatePassword', auth, updatePassword)
router.post('/forgotPassword', forgotPassword)
router.get('/resetpassword/:id/:token', resetPasswordForm)
router.post('/resetpassword/:id/:token', resetPassword)
router.patch('/changeAvatar', auth, changeAvatar)
router.patch('/block', auth, blockUser)
router.get('/me', userProfile)


module.exports = router