const express = require('express')
const { signin, signup, userProfile, findUserByEmail,
    findUsersByEmailKeyword } = require('../controller/userController')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/findbyemail/:email', findUserByEmail)
router.get('/findbykeyword', findUsersByEmailKeyword)

router.get('/me', userProfile)


module.exports = router