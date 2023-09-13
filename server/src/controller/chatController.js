
const ChatModel = require('../models/chatModel')


// Tạo cuộc trò chuyện giữa hai người
const createChatBetweenTwoUsers = async (req, res) => {
    try {
        const { user1Id, user2Id } = req.body;
        const chat = new ChatModel({
            participants: [user1Id, user2Id],
        });
        const savedChat = await chat.save();
        res.status(201).json({ status: 'Success', chat: savedChat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};

// Tạo nhóm chat riêng
const createGroupChat = async (req, res) => {
    try {
        const { name, participantIds } = req.body;
        const chat = new ChatModel({
            name,
            participants: participantIds,
            isGroup: true
        });
        console.log(participantIds)
        const savedChat = await chat.save();
        res.status(201).json({ status: 'Success', chat: savedChat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};
const getChatById = async (req, res) => {
    try {
        const chatId = req.params.chatId; // Lấy chatId từ đường dẫn URL

        // Sử dụng phương thức findById để lấy thông tin chat
        const chat = await ChatModel.findById(chatId).populate('participants', 'firstName lastName email');

        if (!chat) {
            return res.status(404).json({ status: 'Chat not found' });
        }

        res.status(200).json({ status: 'Success', chat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};
// Thêm thành viên vào cuộc trò chuyện (nhóm chat)
const addParticipantToChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ status: 'Chat not found' });
        }
        if (!chat.isGroup) {
            return res.status(500).json({ status: "Not iss Group chat" })
        }
        if (!chat.participants.includes(userId)) {
            chat.participants.push(userId);
            const updatedChat = await chat.save();
            res.status(200).json({ status: 'Success', chat: updatedChat });
        } else {
            res.status(400).json({ status: 'User is already a participant' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};

// Lấy danh sách cuộc trò chuyện của người dùng
const getChatsForUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Hoặc lấy thông tin người dùng từ JWT token
        const chats = await ChatModel.find({ participants: userId }).populate('participants', 'firstName lastName email');
        res.status(200).json({ status: 'Success', chats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};// Rời nhóm chat
const leaveGroupChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ status: 'Chat not found' });
        }
        if (chat.participants.includes(userId)) {
            
            chat.participants = chat.participants.filter(participantId => participantId.toString() !== userId.toString());
            const updatedChat = await chat.save();
            res.status(200).json({ status: 'Success', chat: updatedChat });
        } else {
            res.status(400).json({ status: 'User is not a participant' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};

// Xóa cuộc trò chuyện
const deleteChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const chat = await ChatModel.findByIdAndRemove(chatId);
        if (!chat) {
            return res.status(404).json({ status: 'Chat not found' });
        }
        res.status(200).json({ status: 'Success', message: 'Chat deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};




module.exports = {
    createChatBetweenTwoUsers,
    getChatsForUser,
    createGroupChat,
    addParticipantToChat,
    deleteChat,
    leaveGroupChat,
    getChatById
};