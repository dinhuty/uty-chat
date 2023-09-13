const express = require('express')
const { createMessage,
    getMessagesInChat,
    getMessageById, } = require('../controller/messageController')

const router = express.Router()

router.post('/create', createMessage)
router.get('/list/:chatId', getMessagesInChat)
router.get('/info/:messageId', getMessageById)


module.exports = router