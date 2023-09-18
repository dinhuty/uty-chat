import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getChatForUser, getInfoChat } from "../../services/Api/chat";
import { maskAllMessageRead } from "../../services/Api/message";
import { io } from "socket.io-client"
import { MessageContext } from "./MessageContext";
import { compareByLastUpdatedDesc } from '../../utils/compare'
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [listChatForUser, setListChatForUser] = useState([])
    const [idChatCurrent, setIdChatCurrent] = useState(null)
    const { userCurrent } = useContext(AuthContext)
    const sentRef = useRef(true)
    const [infoChatCurrent, setInfoChatCurrent] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    const [sent, setSent] = useState(true)

    useEffect(() => {
        const getData = async () => {
            if (!userCurrent) return
            const data = await getChatForUser(userCurrent?._id)
            setListChatForUser(data?.chats?.sort(compareByLastUpdatedDesc))
        }
        getData()
    }, [sent, idChatCurrent])

    useEffect(() => {
        const getData = async () => {
            if (!userCurrent) return
            const data = await getChatForUser(userCurrent?._id)
            setListChatForUser(data?.chats)
            const resData = data?.chats?.sort(compareByLastUpdatedDesc)
            if (resData?.length > 0) {
                setIdChatCurrent(resData[0]?._id)
            }
        }
        getData()
    }, [userCurrent])

    //GetInfo ChatCurrent
    useEffect(() => {
        if (!userCurrent) return
        const getData = async () => {
            if (!idChatCurrent) return
            const data = await getInfoChat(idChatCurrent, userCurrent?._id)
            setInfoChatCurrent(data?.chatInfo)
        }
        getData()
        const updateMessage = async (idChat) => {
            const result = await maskAllMessageRead(idChat)
        }
        updateMessage(idChatCurrent)

    }, [idChatCurrent])


    //initial socket
    useEffect(() => {
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
            setSent
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;