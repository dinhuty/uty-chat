import React, { useContext, useEffect, useRef, useState } from 'react'
import avatar from '../../../../assets/svg/avatar-boy.svg'
import { ChatContext } from '../../../../context/ChatContext'
import { AuthContext } from '../../../../context/AuthContext'
import { MessageContext } from '../../../../context/MessageContext'
import { sendMessage, maskAllMessageRead, getListMessageInChat } from '../../../../services/Api/message'
import Message from '../../../components/Message'
import { checkOnlineStatus } from '../../../../utils/checkOnlineStatus'
import { IoCallOutline, IoVideocamOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import Avatar from '../../../components/Avatar'
import { LuSendHorizonal } from "react-icons/lu";
import { CommonContext } from '../../../../context/CommonContext'
import NameChat from '../../../common/NameChat'
import InfiniteScroll from "react-infinite-scroll-component"
import { LoadMoreMessages } from '../../Loading/LoadMoreMessages'
import { EndMessage } from '../../../components/Message/EndMessage'

const ChatWindow = () => {
    const {
        idChatCurrent,
        infoChatCurrent,
        socket,
        sentRef,
        setSent,
        onlineUsers
    } = useContext(ChatContext)
    const { userCurrent } = useContext(AuthContext)
    const {
        listMessageInChat,
        setListMessageInChat,
        newMessage,
        setNewMessage,
        totalPages,
        page,
        hasMore
    } = useContext(MessageContext)
    const { setIsOpenMenu } = useContext(CommonContext)
    const [contentMessage, setContentMessage] = useState('')
    const [loading, setLoading] = useState(true)
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
        setListMessageInChat((prev) => [{
            chat: idChatCurrent,
            content: contentMessage,
            isRead: true,
            sender: {
                firstName: userCurrent.firstName,
                lastName: userCurrent.lastName,
                _id: userCurrent._id,
            },
            createdAt: formattedDate
        }, ...prev]);

        setContentMessage('');
        const messageData = await sendMessage(data);
        setNewMessage(messageData.message);
        sentRef.current = !sentRef.current;
        setSent(sentRef.current);
    }

    useEffect(() => {
        if (socket === null) return
        const recipientIds = infoChatCurrent?.participants.filter((user) => user._id !== userCurrent._id)
        socket.emit("sendMessage", { newMessage, recipientIds })
    }, [newMessage])
    console.log("PAGE", page)
    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", res => {
            if (idChatCurrent === res.chat) {
                setListMessageInChat((prev => [res, ...prev]))
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

    const fetchData = async () => {
        page.current += 1;
        setLoading(true)
        const data = await getListMessageInChat(idChatCurrent, page.current)
        setListMessageInChat(prevMessages => [...prevMessages, ...data.messages]);

    };
    console.log(infoChatCurrent)
    return (
        <div className='chat-window'>
            {idChatCurrent ?
                <div className='chat-window__main'>
                    <div className="header" >
                        <div className="header__left">
                            <div className="user-avatar">
                                <Avatar avatar={avatar} />
                                {checkOnlineStatus(onlineUsers, infoChatCurrent, userCurrent) && <div className='user-avatar__status'></div>}
                            </div>
                            {infoChatCurrent &&
                                <NameChat chat={infoChatCurrent}
                                    userCurrent={userCurrent}
                                    viewStatus={true}
                                    onlineUsers={onlineUsers}
                                />
                            }
                        </div>
                        <div className="header__right">
                            <div onClick={() => setPage(page + 1)} className={checkOnlineStatus(onlineUsers, infoChatCurrent, userCurrent) ? "icon__call active" : "icon__call"}>
                                <IoCallOutline />
                                <div className="ripple"></div>
                            </div>
                            <div className="icon__video">
                                <IoVideocamOutline />
                            </div>
                            <div className="icon__list" onClick={() => setIsOpenMenu(true)}>
                                <IoEllipsisVerticalOutline />
                            </div>
                        </div>
                    </div>
                    {listMessageInChat?.length > 0 ?
                        <div id="scrollableDiv">
                            <InfiniteScroll
                                dataLength={page.current * 12}
                                next={fetchData}
                                hasMore={page.current <= totalPages}
                                inverse={true}
                                className='chat__display'
                                scrollableTarget="scrollableDiv"
                                loader={<LoadMoreMessages />}
                                endMessage={<EndMessage />}
                            >
                                {
                                    listMessageInChat?.slice().map((message, index) => {
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
                                    )
                                }
                            </InfiniteScroll>
                        </div>
                        :
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
                </div>
                :
                <div className='chat-window__blank'>
                    Chọn 1 cuộc trò chuyện
                </div>
            }
        </div >
    )
}

export default ChatWindow
