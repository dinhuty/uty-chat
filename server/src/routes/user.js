const express = require('express')
const {signin, signup, userProfile} = require('../controller/userController')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin',signin)
router.get('/me', userProfile)


module.exports = router