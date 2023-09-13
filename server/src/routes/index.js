const userRouter = require('./user')
const chatRouter = require('./chat')
const messageRouter = require('./message')


module.exports = (app) => {

    app.use('/api/user', userRouter)
    app.use('/api/chat', chatRouter)
    app.use('/api/message', messageRouter)
    app.use('/api/', userRouter)
    
}

