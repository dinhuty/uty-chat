const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:3000" });
let onlineUsers = []
io.on("connection", (socket) => {
    console.log("new connection", socket.id)
    //   listen to a new connection 
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some(user => userId === user.userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        console.log("localUser",onlineUsers)


        io.emit("getOnlineUsers", onlineUsers)
    })
    socket.on("sendMessage",  (message) => {

        const user =  onlineUsers.find(user => user.userId === message.recipientId)
        console.log("Reading")
        console.log("Reading Recept", message.recipientId)
        console.log("userReaddingOnline",onlineUsers)
        console.log("userReadding",user)

        if (user) {
            io.to(user.socketId).emit("getMessage", message)
            console.log("done")
        }
    })
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        io.emit("getOnlineUsers", onlineUsers)
    })
});

io.listen(3003);

module.exports = io;