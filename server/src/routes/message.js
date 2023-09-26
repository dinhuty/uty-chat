const express = require('express')
const auth = require('../middleware/auth')
const { createMessage,
    getMessagesInChat,
    getMessageById,
    markAllMessagesAsRead
} = require('../controller/messageController')

const router = express.Router()

router.post('/create', auth, createMessage)
router.get('/list/:chatId',auth, getMessagesInChat)
router.get('/info/:messageId',auth, getMessageById)
router.put('/update-read/:chatId', auth, markAllMessagesAsRead)

module.exports = router