const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    isGroup: {
        type: Boolean,
        default: false, 
    },
    avaiable: {
        type: Boolean,
        default: true, 
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
        //     default: false,
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