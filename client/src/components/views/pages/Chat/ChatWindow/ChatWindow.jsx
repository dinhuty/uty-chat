import React, { useContext, useEffect, useRef, useState } from 'react'
import { faList, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import avatar from '../../../../../assets/avatar-boy.svg'
import { ChatContext } from '../../../../Context/ChatContext'
import { AuthContext } from '../../../../Context/AuthContext'
import { MessageContext } from '../../../../Context/MessageContext'
import { formatTime } from '../../../../../utils/formatTime'
import { sendMessage, maskAllMessageRead } from '../../../../../services/Api/message'

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
        // e.preventDefault()
        //     chatId: idChatCurrent
        // const messageData = await sendMessage({
        //     content: contentMessage,
        //     senderId: userCurrent._id,
        // })
        // setContentMessage('')
        // setNewMessage(messageData.message)
        // setListMessageInChat((prev => [...prev, messageData.message]))
        // sentRef.current = !sentRef.current
        // setSent(sentRef.current)

        e.preventDefault()
        const data = {
            content: contentMessage,
            senderId: userCurrent._id,
            chatId: idChatCurrent,
        };
        const now = new Date();
        const formattedDate = now.toISOString();
        setListMessageInChat((prev) => [...prev, {
            chat: idChatCurrent,
            content: contentMessage,
            isRead: true,
            sender: {
                firstName: userCurrent.firstName,
                lastName: userCurrent.lastName,
                _id: userCurrent._id,
            },
            createdAt: formattedDate
        }]);
        setContentMessage('');
        const messageData = await sendMessage(data);
        setNewMessage(messageData.message);
        sentRef.current = !sentRef.current;
        setSent(sentRef.current);
    }

    console.log(listMessageInChat)
    useEffect(() => {
        if (socket === null) return
        const recipientIds = infoChatCurrent?.participants
        socket.emit("sendMessage", { newMessage, recipientIds })
    }, [newMessage])

    // recipient Message
    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", res => {
            if (idChatCurrent === res.chat) {
                setListMessageInChat((prev => [...prev, res]))
                const updateMessRead = async (idChat) => {
                    const result = await maskAllMessageRead(idChat)
                }
                updateMessRead(res.chat)
            }
            sentRef.current = !sentRef.current
            setSent(sentRef.current)
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
                                            {formatTime(message.createdAt)}&nbsp;
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
