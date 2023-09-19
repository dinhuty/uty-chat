import React, { useContext, useEffect, useRef, useState } from 'react'
import avatar from '../../../../assets/svg/avatar-boy.svg'
import { ChatContext } from '../../../../context/ChatContext'
import { AuthContext } from '../../../../context/AuthContext'
import { MessageContext } from '../../../../context/MessageContext'
import { formatTime } from '../../../../utils/formatTime'
import { moveElementToTop } from '../../../../utils/moveElementToTop'
import { sendMessage, maskAllMessageRead } from '../../../../services/Api/message'
import Message from '../../../components/Message'
import { checkOnlineStatus } from '../../../../utils/checkOnlineStatus'
import { IoCallOutline, IoVideocamOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import Avatar from '../../../components/Avatar'
import { LuSendHorizonal } from "react-icons/lu";

const ChatWindow = () => {
    const {
        idChatCurrent,
        setIdChatCurrent,
        infoChatCurrent,
        socket,
        listChatForUser,
        setListChatForUser,
        sentRef,
        sent,
        setSent,
        onlineUsers
    } = useContext(ChatContext)
    const { userCurrent } = useContext(AuthContext)
    const {
        listMessageInChat,
        setListMessageInChat,
        newMessage,
        setNewMessage
    } = useContext(MessageContext)
    const [contentMessage, setContentMessage] = useState('')
    let lastSenderId = null


    const handleSendMessgae = async (e) => {
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

        const lx = moveElementToTop(listChatForUser, idChatCurrent)
        setListChatForUser(lx)
        setContentMessage('');
        const messageData = await sendMessage(data);
        setNewMessage(messageData.message);
        sentRef.current = !sentRef.current;
        setSent(sentRef.current);
    }

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
                            <div className="user-avatar">
                                <Avatar avatar={avatar} />
                                {checkOnlineStatus(onlineUsers, infoChatCurrent?.participants[0]._id) && <div className='user-avatar__status'></div>}
                            </div>
                            {infoChatCurrent && infoChatCurrent?.isGroup ?
                                <div className='user-desc'>
                                    {infoChatCurrent?.participants?.slice(0, 2).map((user) => (
                                        <span key={user._id}>{user.lastName},</span>
                                    ))}
                                    <span>{userCurrent?.lastName}...</span>
                                </div>
                                :
                                <div className='user-desc'>
                                    <div className="user-desc__name">
                                        <span>{infoChatCurrent?.participants[0].firstName}</span>
                                        <span>{infoChatCurrent?.participants[0].lastName}</span>
                                    </div>

                                    {checkOnlineStatus(onlineUsers, infoChatCurrent?.participants[0]._id) && <div className='user-desc__status'>Active</div>}
                                </div>}
                        </div>
                        <div className="header__right">
                            <div className={checkOnlineStatus(onlineUsers, infoChatCurrent?.participants[0]._id) ? "icon__call active" : "icon__call"}>
                                <IoCallOutline />
                                <div className="ripple"></div>
                            </div>
                            <div className="icon__video">
                                <IoVideocamOutline />
                            </div>
                            <div className="icon__list">
                                <IoEllipsisVerticalOutline />
                            </div>
                        </div>
                    </div>
                    {listMessageInChat?.length > 0 ? <div className="chat__display">
                        {listMessageInChat?.slice().reverse().map((message, index) => {
                            const isLastMessageFromSender = lastSenderId !== message?.sender?._id;
                            const shouldDisplayAvatar = isLastMessageFromSender;
                            lastSenderId = message?.sender?._id;

                            return (
                                <Message
                                    key={index}
                                    message={message}
                                    shouldDisplayAvatar={shouldDisplayAvatar}
                                    userCurrent={userCurrent}
                                />
                            )
                        }
                        )}
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
                                <div className="btn-icon-send">
                                    <LuSendHorizonal />
                                </div>
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
