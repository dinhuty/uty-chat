const mongoose = require('mongoose')
module.exports = async () => {
    try {
        // await mongoose.connect('mongodb://127.0.0.1/uty-chat');
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connect successfully")
    } catch (error) {
        console.log('error')
    }
}