import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./ChatContext";
import { getListMessageInChat, maskAllMessageRead } from "../services/Api/message";
import { CommonContext } from "./CommonContext";
import { AuthContext } from "./AuthContext";

export const MessageContext = createContext()

const MessageProvider = ({ children }) => {
    const [listMessageInChat, setListMessageInChat] = useState(null)
    const { idChatCurrent } = useContext(ChatContext)
    const { accessToken, userCurrent } = useContext(AuthContext)
    const [newMessage, setNewMessage] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const page = useRef(1)
    const hasMore = useRef(true)
    const [imageOpen, setImageOpen] = useState('')
    useEffect(() => {
        page.current = 1
        hasMore.current = true
        const getData = async () => {
            if (!idChatCurrent) return;
            const data = await getListMessageInChat(idChatCurrent, page, accessToken)
            console.log(data?.messages[0]?.sender._id)
            if (data?.messages[0]?.sender._id !== userCurrent?._id) {
                const result = await maskAllMessageRead(idChatCurrent, accessToken)
            }
            setListMessageInChat(data.messages)
            setTotalPages(data.totalPages)
        }
        getData()
    }, [idChatCurrent])

    return (
        <MessageContext.Provider value={{
            listMessageInChat,
            setListMessageInChat,
            newMessage,
            setNewMessage,
            totalPages,
            page,
            hasMore,
            imageOpen,
            setImageOpen
        }}>
            {children}
        </MessageContext.Provider>
    )
}
export default MessageProvider;