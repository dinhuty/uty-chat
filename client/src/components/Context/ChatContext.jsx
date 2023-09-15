import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getChatForUser, getInfoChat } from "../../services/Api/chat";
import { io } from "socket.io-client"
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [listChatForUser, setListChatForUser] = useState([])
    const [idChatCurrent, setIdChatCurrent] = useState(null)
    const { userCurrent } = useContext(AuthContext)
    const [infoChatCurrent, setInfoChatCurrent] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)

    //getListChatUser
    useEffect(() => {
        const getData = async () => {
            if (!userCurrent) return
            const data = await getChatForUser(userCurrent?._id)
            setListChatForUser(data?.chats)
        }
        getData()
    }, [userCurrent])

    //GetInfo ChatCurrent
    useEffect(() => {
        const getData = async () => {
            if (!idChatCurrent) return
            const data = await getInfoChat(idChatCurrent, userCurrent?._id)
            setInfoChatCurrent(data?.chatInfo)
            console.log(data?.chatInfo)
        }
        getData()
    }, [idChatCurrent])

    //initial socket
    useEffect(() => {
        const newSocket = io("http://localhost:3003")
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        }
    }, [userCurrent])

    //addUserOnline
    useEffect(() => {
        if (socket === null) return
        socket.emit("addNewUser", userCurrent?._id)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })
        console.log(userCurrent?._id)
    }, [socket])
    return (
        <ChatContext.Provider value={{
            listChatForUser,
            setListChatForUser,
            idChatCurrent,
            setIdChatCurrent,
            infoChatCurrent,
            setInfoChatCurrent,
            socket,
            setSocket,
            onlineUsers,
            setOnlineUsers
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;