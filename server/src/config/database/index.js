const mongoose = require('mongoose')
module.exports = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/uty-chat');
        console.log("Connect successfully")
    } catch (error) {
        console.log('error')
    }
}