import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./ChatContext";
import { getListMessageInChat } from "../services/Api/message";

export const MessageContext = createContext()

const MessageProvider = ({ children }) => {
    const [listMessageInChat, setListMessageInChat] = useState(null)
    const { idChatCurrent } = useContext(ChatContext)
    const [newMessage, setNewMessage] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const page = useRef(1)
    const hasMore = useRef(true)

    useEffect(() => {
        page.current = 1
        hasMore.current = true
        const getData = async () => {
            if (!idChatCurrent) return;
            const data = await getListMessageInChat(idChatCurrent, page)
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
            hasMore
        }}>
            {children}
        </MessageContext.Provider>
    )
}
export default MessageProvider;