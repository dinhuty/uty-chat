import React, { useContext, useEffect, useRef, useState } from 'react'
import { faList, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import avatar from '../../../../../assets/avatar-boy.svg'
import { ChatContext } from '../../../../Context/ChatContext'
import { AuthContext } from '../../../../Context/AuthContext'
import { MessageContext } from '../../../../Context/MessageContext'
import { sendMessage } from '../../../../../services/Api/message'

const ChatWindow = () => {
    const { idChatCurrent,
        setIdChatCurrent,
        infoChatCurrent,
        socket,
        listChatForUser,
        setListChatForUser,
        sentRef,
        sent,
        setSent
    } = useContext(ChatContext)
    const { userCurrent } = useContext(AuthContext)
    const { listMessageInChat,
        setListMessageInChat,
        newMessage,
        setNewMessage
    } = useContext(MessageContext)
    const [contentMessage, setContentMessage] = useState('')
    let lastSenderId = null;


    const handleSendMessgae = async (e) => {
        e.preventDefault()
        const messageData = await sendMessage({
            content: contentMessage,
            senderId: userCurrent._id,
            chatId: idChatCurrent
        })
        setContentMessage('')
        setNewMessage(messageData.message)
        setListMessageInChat((prev => [...prev, messageData.message]))
        sentRef.current = !sentRef.current
        setSent(sentRef.current)
    }

    console.log(infoChatCurrent)
    useEffect(() => {
        if (socket === null) return
        const recipientIds = infoChatCurrent?.participants
        socket.emit("sendMessage", { newMessage, recipientIds })
    }, [newMessage])

    // recipient Message
    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", res => {
            // if (idChatCurrent !== res.chat) {
            //     return
            // }
            // console.log(res)
            // setListMessageInChat((prev => [...prev, res]))
            // setSent(!sent)
            console.log("1@", idChatCurrent)
            console.log("2@", res.chat)
            if (idChatCurrent === res.chat) {
                setListMessageInChat((prev => [...prev, res]))

            } else {
                console.log("Bố mày vẫn phải gọi")
            }
            sentRef.current = !sentRef.current
            setSent(sentRef.current)
            console.log("windowSend", sent)
            console.log("windowRef", sentRef.current)
        })
        return () => {
            socket.off("getMessage")
        }
    }, [socket, idChatCurrent])

    return (
        <div className='chat-window'>
            {idChatCurrent ?
                <>
                    <div className="header" >
                        <div className="header__left">
                            <img src={avatar} alt="Avatar" />
                            {infoChatCurrent && infoChatCurrent?.isGroup ?
                                <div className='user-name'>
                                    {infoChatCurrent?.participants?.slice(0, 2).map((user) => (
                                        <span key={user._id}>{user.lastName},</span>
                                    ))}
                                    <span>{userCurrent?.lastName}...</span>
                                </div>
                                :
                                <div className='user-name'>
                                    <span>{infoChatCurrent?.participants[0].firstName}</span>
                                    <span>{infoChatCurrent?.participants[0].lastName}</span>
                                </div>}
                        </div>
                        <div className="header__right">
                            <div className="icon__call">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className="icon__list">
                                <FontAwesomeIcon icon={faList} />
                            </div>
                        </div>
                    </div>
                    {listMessageInChat?.length > 0 ? <div className="chat__display">
                        {listMessageInChat?.slice().reverse().map((message, index) => {
                            const isLastMessageFromSender = lastSenderId !== message?.sender?._id;
                            const shouldDisplayAvatar = isLastMessageFromSender;
                            lastSenderId = message?.sender?._id;

                            return (
                                <div className={message?.sender?._id === userCurrent?._id ? 'chat-message user-chat' : 'chat-message'} key={index}>
                                    {shouldDisplayAvatar && message?.sender?._id !== userCurrent?._id &&
                                        <img className="message-avatar w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />
                                    }
                                    <div className="message-content">
                                        <p>{message?.content}</p>
                                        <span>
                                            <FontAwesomeIcon icon={faClock} />
                                            1 phút trước
                                        </span>
                                    </div>
                                </div>
                            )

                        })}
                    </div> :
                        <div className="chat__display blank">
                            Bắt đầu với tin nhắn mới
                        </div>

                    }

                    <div className="chat__bottom">
                        <form className="bottom-box" onSubmit={handleSendMessgae}>
                            <input
                                type="text"
                                placeholder='Nhập tin nhắn'
                                value={contentMessage}
                                onChange={(e) => setContentMessage(e.target.value)}
                            />
                            <button type="submit" >
                                Gửi
                            </button>
                        </form>
                    </div>
                </>
                :
                <div className='chat-window__blank'>
                    Chọn 1 cuộc trò chuyện
                </div>
            }
        </div >
    )
}

export default ChatWindow
