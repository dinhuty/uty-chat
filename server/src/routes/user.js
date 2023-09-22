const express = require('express')
const {
    signin,
    signup,
    userProfile,
    findUserByEmail,
    findUsersByEmailKeyword,
    updatePassword
} = require('../controller/userController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/findbyemail/:email', findUserByEmail)
router.get('/findbykeyword', findUsersByEmailKeyword)
router.put('/updatePassword',auth, updatePassword)
router.get('/me', userProfile)


module.exports = router