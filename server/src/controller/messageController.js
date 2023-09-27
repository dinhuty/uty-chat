const messageModel = require('../models/messageModel')
const ChatModel = require('../models/chatModel')
const { cloudinary } = require('../service/cloudinary')

const createMessage = async (req, res) => {
    try {
        const { content, senderId, chatId, attachment } = req.body;

        const chat = await ChatModel.findById(chatId);
        const isUserInChat = chat.participants.includes(senderId);

        if (!isUserInChat) {
            return res.status(404).json({ status: 'User not in GroupChat' });
        }
        const messageData = {
            content,
            sender: senderId,
            chat: chatId,
        };
        if (attachment) {
            const uploadResponse = await cloudinary.uploader.upload(attachment, {
                upload_preset: 'uty_chat'
            })
            messageData.attachments = [{
                type: uploadResponse.resource_type,
                url: uploadResponse.secure_url
            }]
        }

        const message = new messageModel(messageData)
        chat.messages.push(message._id);
        chat.lastUpdated = Date.now();

        await chat.save();
        const savedMessage = await message.save();
        await savedMessage.populate('sender', 'firstName lastName');

        res.status(201).json({ message: savedMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
}
const getMessagesInChat = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 15;
        const chatId = req.params.chatId;
        const totalItems = await messageModel.countDocuments({ chat: chatId });
        const totalPages = Math.ceil(totalItems / limit);

        const messages = await messageModel
            .find({ chat: chatId })
            .populate('sender', 'firstName lastName avatarURL')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({ messages, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
}
const getMessageById = async (req, res) => {
    try {
        const messageId = req.params.messageId;

        const message = await messageModel.findById(messageId).populate('sender', 'firstName lastName');

        if (!message) {
            return res.status(404).json({ status: 'Message not found' });
        }

        res.status(200).json({ status: 'Success', message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error' });
    }
}

const markMessageAsRead = async (req, res) => {
    try {
        const messageId = req.params.messageId; 

        const updatedMessage = await messageModel.findByIdAndUpdate(
            messageId,
            { isRead: true },
        );

        if (!updatedMessage) {
            return res.status(404).json({ error: 'Tin nhắn không tồn tại' });
        }
        return res.status(200).json(updatedMessage);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Lỗi server' });
    }
}

const markAllMessagesAsRead = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const result = await messageModel.updateMany(
            { chat: chatId },
            { $set: { isRead: true } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Không tìm thấy tin nhắn trong phòng' });
        }

        return res.status(200).json({ message: 'Cập nhật trạng thái isRead thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Lỗi server' });
    }
};

module.exports = {
    createMessage,
    getMessagesInChat,
    getMessageById,
    markMessageAsRead,
    markAllMessagesAsRead,
};