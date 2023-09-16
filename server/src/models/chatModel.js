const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    isGroup: {
        type: Boolean,
        default: false, // Giá trị mặc định là false
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
},

    { timestamps: true }
)

module.exports = mongoose.model('Chat', chatSchema)