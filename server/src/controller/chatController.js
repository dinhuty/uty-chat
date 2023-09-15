
const ChatModel = require('../models/chatModel')


// Tạo cuộc trò chuyện giữa hai người
const createChatBetweenTwoUsers = async (req, res) => {
    try {
        const { user1Id, user2Id } = req.body;
        const existingChat = await ChatModel.findOne({
            participants: { $all: [user1Id, user2Id] },
        });
        if (existingChat) {
            const participantsWithoutSelf = existingChat.participants.filter(participant => participant.toString() !== user1Id);
            const chatInfo = await ChatModel.populate(existingChat, { path: 'participants', select: 'firstName lastName email', match: { _id: { $in: participantsWithoutSelf } } });
            return res.status(200).json({ status: 'Chat exists', chat: chatInfo });
        }
        const chat = new ChatModel({
            participants: [user1Id, user2Id],
            lastUpdated: Date.now()
        });
        const savedChat = await chat.save();
        const participantsWithoutSelf = savedChat.participants.filter(participant => participant.toString() !== user1Id);
        const chatInfo = await ChatModel.populate(savedChat, { path: 'participants', select: 'firstName lastName email', match: { _id: { $in: participantsWithoutSelf } } });
        res.status(201).json({ status: 'Success', chat: chatInfo });
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
            isGroup: true,
            lastUpdated: Date.now()
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
        const chatId = req.params.chatId;
        const userId = req.params.userId;

        const chat = await ChatModel.findById(chatId).lean();

        if (!chat) {
            return res.status(404).json({ status: 'Chat not found' });
        }
        const participantsWithoutSelf = chat.participants.filter(participant => participant.toString() !== userId);
        const chatInfo = await ChatModel.populate(chat, { path: 'participants', select: 'firstName lastName email', match: { _id: { $in: participantsWithoutSelf } } });

        res.status(200).json({ chatInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
    // try {
    //     const chatId = req.params.chatId;

    //     const chat = await ChatModel.findById(chatId).populate('participants', 'firstName lastName email');

    //     if (!chat) {
    //         return res.status(404).json({ status: 'Chat not found' });
    //     }

    //     res.status(200).json({ status: 'Success', chat });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ status: 'Error' });
    // }
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
            return res.status(500).json({ status: "Not is Group chat" })
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
        const chats = await ChatModel.find({ participants: userId }).lean(); // Sử dụng .lean() để chuyển kết quả thành một đối tượng JavaScript thay vì Mongoose Document
        const populatedChats = await Promise.all(chats.map(async (chat) => {
            const participantsWithoutSelf = chat.participants.filter(participant => participant.toString() !== userId);
            const populatedChat = await ChatModel.populate(chat, { path: 'participants', select: 'firstName lastName email', match: { _id: { $in: participantsWithoutSelf } } });
            return populatedChat;
        }));
        res.status(200).json({ chats: populatedChats });
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