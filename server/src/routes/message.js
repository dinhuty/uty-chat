const express = require('express')
const { createMessage,
    getMessagesInChat,
    getMessageById,
    markAllMessagesAsRead
} = require('../controller/messageController')

const router = express.Router()

router.post('/create', createMessage)
router.get('/list/:chatId', getMessagesInChat)
router.get('/info/:messageId', getMessageById)
router.put('/update-read/:chatId', markAllMessagesAsRead)



module.exports = router