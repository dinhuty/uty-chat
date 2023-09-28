const express = require('express')
const { createChatBetweenTwoUsers,
    getChatsForUser,
    createGroupChat,
    addParticipantToChat,
    deleteChat,
    getChatById,
    leaveGroupChat,
    blockChat,
    renameGroup
} = require('../controller/chatController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/create', auth, createChatBetweenTwoUsers)
router.post('/create/group', auth, createGroupChat)
router.post('/add/group', auth, addParticipantToChat)
router.put('/leave/group', auth, leaveGroupChat)
router.delete('/delete/:chatId', auth, deleteChat)
router.get('/list/:userId', auth, getChatsForUser)
router.get('/info/:chatId/:userId', auth, getChatById)
router.patch('/block', auth, blockChat)
router.patch('/rename-group', auth, renameGroup)

module.exports = router