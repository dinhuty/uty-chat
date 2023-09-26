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
    avaiable: {
        type: Boolean,
        default: true, // Giá trị mặc định là false
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        // },
        // left: {
        //     type: Boolean,
        //     default: false, // Mặc định là false (chưa rời)
        // },
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
},

    { timestamps: true }
)

module.exports = mongoose.model('Chat', chatSchema)