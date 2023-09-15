import { createContext, useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { getListMessageInChat } from "../../services/Api/message";

export const MessageContext = createContext()

const MessageProvider = ({ children }) => {
    const [listMessageInChat, setListMessageInChat] = useState(null)
    const { idChatCurrent } = useContext(ChatContext)

    useEffect(() => {
        const getData = async () => {
            if (!idChatCurrent) return;
            const data = await getListMessageInChat(idChatCurrent)
            setListMessageInChat(data.messages)
            console.log(data.messages)
        }
        getData()
    }, [idChatCurrent])
    return (
        <MessageContext.Provider value={{
            listMessageInChat,
            setListMessageInChat
        }}>
            {children}
        </MessageContext.Provider>
    )
}
export default MessageProvider;