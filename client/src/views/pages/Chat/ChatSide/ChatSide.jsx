import React, { useContext, useEffect, useRef, useState, memo } from 'react'
import { searchUser } from '../../../../services/Api/search'
import { createChat } from '../../../../services/Api/chat'
import avatar from "../../../../assets/svg/avatar-boy.svg"
import { ChatContext } from '../../../../context/ChatContext'
import { AuthContext } from '../../../../context/AuthContext'
import { formatTime } from '../../../../utils/formatTime'
import HorizontalSlider from '../../../components/HorizontalSlider'
import { checkOnlineStatus } from '../../../../utils/checkOnlineStatus'
import { MessageContext } from '../../../../context/MessageContext'
import { maskAllMessageRead } from '../../../../services/Api/message'
import NameChat from '../../../common/NameChat'
import { getListIdCurrent } from '../../../../utils/getListIdCurrent'

const ChatSide = () => {
    const sliderRef = useRef(null);
    const [keyword, setKeyword] = useState('')
    const [listNewUser, setListNewUser] = useState(null)
    const { listChatForUser,
        setIdChatCurrent,
        onlineUsers,
        setListChatForUser,
    } = useContext(ChatContext);
    const { userCurrent } = useContext(AuthContext)
    const { idChatCurrent } = useContext(ChatContext)
    const { listMessageInChat } = useContext(MessageContext)

    useEffect(() => {
        if (!keyword.trim()) {
            setListNewUser([])
            return
        }
        const getData = setTimeout(async () => {
            const list = await searchUser(keyword, [userCurrent._id, ...getListIdCurrent(listChatForUser)]);
            setListNewUser(list)
        }, 500)
        return () => clearTimeout(getData)
    }, [keyword])

    const hanldeCreateChat = async (id) => {
        const data = {
            user1Id: userCurrent._id,
            user2Id: id
        }
        const createAChat = await createChat(data)
        if (createAChat?.status === 200) {
            setIdChatCurrent(createAChat?.data?.chat?._id)
        } else if (createAChat?.status === 201) {
            setIdChatCurrent(createAChat?.data?.chat?._id)
            setListChatForUser((prev => [...prev, createAChat?.data.chat]))
        }
        setKeyword('')
    }

    return (
        <div className='chat-side'>
            <div className="chat-side__top">
                <div className="title">
                    Chat
                </div>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder='Tìm kiếm tin nhắn '
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {listNewUser !== null && (
                        listNewUser?.length > 0 && (
                            <div className='search-list'>
                                {listNewUser.map((item) => (
                                    <div className="search-list__item" key={item._id} onClick={() => hanldeCreateChat(item._id)}>
                                        <div className="avatar">
                                            <img className="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />
                                            <div className="avatar-status"></div>
                                        </div>
                                        <div className="desc">
                                            <div className="desc__name">
                                                <span>{item.lastName}</span>
                                                <span>{item.firstName}</span>
                                            </div>
                                            <div className="desc__email">
                                                <p>{item.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                </div>
                {/* <HorizontalSlider /> */}
            </div>

            <div className="chat-side__list">
                {listChatForUser?.length > 0 ? listChatForUser.map((item, index) => {
                    return (
                        <div className={item._id === idChatCurrent ? "chat-list__item active" : "chat-list__item"}
                            key={item._id}
                            onClick={() => setIdChatCurrent(item._id)}
                        >
                            <div className="item__left">
                                <div className="avatar">
                                    <img className="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />
                                    {checkOnlineStatus(onlineUsers, item, userCurrent) && <div className="avatar-status">
                                    </div>}
                                </div>
                                <div className="desc">
                                    <NameChat
                                        chat={item}
                                        userCurrent={userCurrent}
                                        onlineUsers={onlineUsers}
                                    />
                                    <div className={item.messages.length > 0 && item?.messages[0]?.isRead === true ? "desc-message--recent" : "desc-message--recent unread"}>
                                        {item.messages.length > 0
                                            && (item?.messages[0]?.sender?._id === userCurrent._id ? <span>Bạn:</span>
                                                :
                                                <span>{item?.messages[0]?.sender?.lastName}:</span>)
                                        }
                                        <span>{item?.messages[0]?.content}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item__right">
                                <div>
                                    {item.messages.length > 0 && <>{formatTime(item?.messages[0]?.createdAt)}</>}
                                </div>
                                <div className={item.messages.length > 0 && item?.messages[0]?.isRead ? 'item__right-icon' : 'item__right-icon active'}>

                                </div>
                            </div>
                        </div>
                    )
                })
                    :
                    <div className="chat-list__item">
                        No Convervation
                    </div>
                }
            </div>
        </div>
    )
}

export default memo(ChatSide)
