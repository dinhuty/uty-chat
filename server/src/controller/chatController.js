
const ChatModel = require('../models/chatModel')
const MessageModel = require('../models/messageModel')


// Tạo cuộc trò chuyện giữa hai người
const createChatBetweenTwoUsers = async (req, res) => {
    try {
        const { user1Id, user2Id } = req.body;
        const existingChat = await ChatModel.findOne({
            participants: { $all: [user1Id, user2Id] },
        });
        if (existingChat && existingChat.isGroup == false) {

            const chatInfo = await ChatModel.populate(
                chat,
                {
                    path: 'participants',
                    select: 'firstName lastName email'
                }
            );

            return res.status(200).json({ status: 'Chat exists', chat: chatInfo });
        }
        const chat = new ChatModel({
            participants: [user1Id, user2Id],
        });
        const savedChat = await chat.save();

        const chatInfo = await ChatModel.populate(
            chat,
            {
                path: 'participants',
                select: 'firstName lastName email'
            }
        );
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
        });
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

        const chatInfo = await ChatModel.populate(
            chat,
            {
                path: 'participants',
                select: 'firstName lastName email avatarURL address'
            });

        res.status(200).json({ chatInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};
// Thêm thành viên vào cuộc trò chuyện (nhóm chat)
const addParticipantToChat = async (req, res) => {
    try {
        const { chatId, userIds } = req.body;
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ status: 'Chat not found' });
        }
        if (!chat.isGroup) {
            return res.status(500).json({ status: "Not is Group chat" })
        }
        for (const userId of userIds) {
            if (!chat.participants.includes(userId)) {
                chat.participants.push(userId);
            }
        }
        const updatedChat = await chat.save();
        res.status(200).json({ status: 'Success', chat: updatedChat });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
};

// Lấy danh sách cuộc trò chuyện của người dùng
const getChatsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const chats = await ChatModel
            .find({ participants: userId })
            .sort({ updatedAt: -1 })
            .lean();
        const populatedChats = await Promise.all(chats.map(async (chat) => {
            const populatedChat = await ChatModel.populate(
                chat,
                {
                    path: 'participants',
                    select: 'firstName lastName email avatarURL'
                }
            );
            const latestMessage = await MessageModel
                .findOne({ chat: chat._id })
                .sort({ createdAt: -1 })
                .lean()
                .populate({
                    path: 'sender',
                    select: 'firstName lastName isRead',
                });

            populatedChat.messages = [latestMessage];
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

const blockChat = async (req, res) => {
    try {
        const chatId = req.body.chatId;
        const user = req.user
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ status: 'Chat not found' });
        }
        const isUserInChat = chat.participants.includes(user._id);
        if (!isUserInChat) {
            return res.status(403).json({ status: 'Access denied' });
        }
        const updatedChat = await ChatModel.findByIdAndUpdate(
            chatId,
            { avaiable: false },
            { new: true }
        );
        if (!updatedChat) {
            return res.status(404).json({ status: 'Chat not found' });
        }
        res.status(200).json({ status: 'Success', message: 'Blocked' });
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
    getChatById,
    blockChat,

};