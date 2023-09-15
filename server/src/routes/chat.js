const express = require('express')
const { createChatBetweenTwoUsers,
    getChatsForUser,
    createGroupChat,
    addParticipantToChat,
    deleteChat,
    getChatById,
    leaveGroupChat } = require('../controller/chatController')

const router = express.Router()

router.post('/create', createChatBetweenTwoUsers)
router.post('/create/group', createGroupChat)
router.post('/add/group', addParticipantToChat)
router.post('/leave/group', leaveGroupChat)
router.get('/list/:userId', getChatsForUser)
router.get('/info/:chatId/:userId', getChatById)

module.exports = router