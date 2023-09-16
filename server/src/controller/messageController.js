const messageModel = require('../models/messageModel')
const ChatModel = require('../models/chatModel')


const createMessage = async (req, res) => {
    try {
        const { content, senderId, chatId } = req.body;

        const chat = await ChatModel.findById(chatId);
        const isUserInChat = chat.participants.includes(senderId);

        if (!isUserInChat) {
            return res.status(404).json({ status: 'User not in GroupChat' });
        }

        const message = new messageModel({
            content,
            sender: senderId,
            chat: chatId,
        });
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
        const chatId = req.params.chatId;

        const messages = await messageModel.find({ chat: chatId }).populate('sender', 'firstName lastName');

        res.status(200).json({ messages });
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

module.exports = {
    createMessage,
    getMessagesInChat,
    getMessageById,
};