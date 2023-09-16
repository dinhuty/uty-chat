import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getChatForUser, getInfoChat } from "../../services/Api/chat";
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
    const [sent,setSent] = useState(true)

    useEffect(() => {
        const getData = async () => {
            console.log("CHatProVider", sentRef.current)
            if (!userCurrent) return
            const data = await getChatForUser(userCurrent?._id)
            setListChatForUser(data?.chats?.sort(compareByLastUpdatedDesc))
            console.log("BỐ mày đã gọi 2")
        }
        getData()
    }, [sent])

    useEffect(() => {
        const getData = async () => {
            if (!userCurrent) return
            const data = await getChatForUser(userCurrent?._id)
            setListChatForUser(data?.chats)
            const resData = data?.chats?.sort(compareByLastUpdatedDesc)
            if (resData?.length > 0) {
                setIdChatCurrent(resData[0]?._id)
            }
            console.log("id@", idChatCurrent)
        }
        getData()
    }, [userCurrent])

    //GetInfo ChatCurrent
    useEffect(() => {
        const getData = async () => {
            if (!idChatCurrent) return
            const data = await getInfoChat(idChatCurrent, userCurrent?._id)
            setInfoChatCurrent(data?.chatInfo)
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
    }, [socket])

    console.log(idChatCurrent)
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