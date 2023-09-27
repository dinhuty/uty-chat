import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getChatForUser, getInfoChat } from "../services/Api/chat";
import { io } from "socket.io-client"
import { CommonContext } from "./CommonContext";
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [listChatForUser, setListChatForUser] = useState([])
    const [idChatCurrent, setIdChatCurrent] = useState(null)
    const { userCurrent, accessToken } = useContext(AuthContext)
    const sentRef = useRef(true)
    const [infoChatCurrent, setInfoChatCurrent] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    const [sent, setSent] = useState(true)
    const [loading, setLoading] = useState(false)
    const { addHandle, deleteHandle, leaveGroupHandle, blockHandle } = useContext(CommonContext)

    useEffect(() => {
        const getData = async () => {
            if (!userCurrent) return
            const data = await getChatForUser(userCurrent?._id, accessToken)
            setListChatForUser(data?.chats)
            console.log(data?.chats)
        }
        getData()
    }, [sent, idChatCurrent])

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            if (!userCurrent) return
            const data = await getChatForUser(userCurrent?._id, accessToken)
            setListChatForUser(data?.chats)
            if (data?.chats.length > 0) {
                setIdChatCurrent(data?.chats[0]?._id)
            }else{
                setIdChatCurrent(null)
            }
            setLoading(false)
        }
        getData()
    }, [userCurrent,
        deleteHandle,
        leaveGroupHandle])

    //GetInfo ChatCurrent
    useEffect(() => {
        if (!userCurrent) return
        const getData = async () => {
            if (!idChatCurrent) return
            const data = await getInfoChat(idChatCurrent, userCurrent?._id, accessToken)
            setInfoChatCurrent(data?.chatInfo)
        }
        getData()
    }, [idChatCurrent,
        addHandle,
        leaveGroupHandle,
        blockHandle])


    //initial socket
    useEffect(() => {
        // const newSocket = io("http://localhost:3001/")
        const newSocket = io("https://socket-server-production-f499.up.railway.app/")
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
            setOnlineUsers,
            sentRef,
            sent,
            setSent,
            loading,
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;