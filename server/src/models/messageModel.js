const mongoose = require('mongoose')

const messageModel = mongoose.Schema({
    content: {
        type: String,
        require: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
},

    { timestamps: true }
)

module.exports = mongoose.model('Message', messageModel)