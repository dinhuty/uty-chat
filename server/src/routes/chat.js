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
router.put('/leave/group', leaveGroupChat)
router.delete('/delete/:chatId', deleteChat)
router.get('/list/:userId', getChatsForUser)
router.get('/info/:chatId/:userId', getChatById)

module.exports = router