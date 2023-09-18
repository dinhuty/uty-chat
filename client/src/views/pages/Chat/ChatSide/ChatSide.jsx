import React, { useContext, useEffect, useRef, useState } from 'react'
import { searchUser } from '../../../../services/Api/search'
import { createChat } from '../../../../services/Api/chat'
import avatar from "../../../../assets/svg/avatar-boy.svg"
import { compareByLastUpdatedDesc } from '../../../../utils/compare'
import { ChatContext } from '../../../../context/ChatContext'
import { AuthContext } from '../../../../context/AuthContext'
import { formatTime } from '../../../../utils/formatTime'
import HorizontalSlider from '../../../components/HorizontalSlider'

const ChatSide = () => {
    const sliderRef = useRef(null);
    const [keyword, setKeyword] = useState('')
    const [listNewUser, setListNewUser] = useState(null)
    const { listChatForUser, setIdChatCurrent, onlineUsers, setListChatForUser } = useContext(ChatContext);
    const { userCurrent } = useContext(AuthContext)
    const { idChatCurrent } = useContext(ChatContext)

    useEffect(() => {
        if (!keyword.trim()) {
            setListNewUser([])
            return
        }
        const getData = setTimeout(async () => {
            const list = await searchUser(keyword);
            setListNewUser(list)
        }, 500)
        return () => clearTimeout(getData)
    }, [keyword])

    const checkOnlineStatus = (id) => {
        if (onlineUsers?.length <= 0 || onlineUsers === null) return false
        if (onlineUsers.some(user => user.userId === id))
            return true
        return false
    }
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
    console.log(listChatForUser)
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
                <HorizontalSlider />
                <div className="chat-side__title">
                    Gần đây
                </div>
            </div>

            <div className="chat-side__list">
                {listChatForUser.length > 0 ? listChatForUser.sort(compareByLastUpdatedDesc).map((item, index) => {
                    return (
                        <div className={item._id === idChatCurrent ? "chat-list__item active" : "chat-list__item"}
                            key={item._id}
                            onClick={() => setIdChatCurrent(item._id)}
                        >
                            <div className="item__left">
                                <div className="avatar">
                                    <img className="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />

                                    {checkOnlineStatus(item.participants[0]._id) && <div className="avatar-status">

                                    </div>}
                                </div>
                                <div className="desc">
                                    {item.isGroup ? <div className="desc__name">
                                        {item.participants.slice(0, 2).map((user) => (
                                            <span key={user._id}>{user.lastName},</span>
                                        ))}
                                        <span>{userCurrent.lastName}...</span>
                                    </div> :
                                        <div className="desc__name">
                                            <span>{item.participants[0].firstName}</span>
                                            <span>{item.participants[0].lastName}</span>
                                        </div>
                                    }
                                    <div className={item.messages.length > 0 && item.messages[item.messages.length - 1].isRead === true ? "desc-message--recent" : "desc-message--recent unread"}>
                                        {item.messages.length > 0 && <span>{item?.messages[item.messages.length - 1].sender.firstName}:</span>}<span>{item?.messages[item.messages.length - 1]?.content}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item__right">
                                <div>
                                    {item.messages.length > 0 && <>{formatTime(item?.messages[item.messages.length - 1].createdAt)}</>}
                                </div>
                                <div className={item.messages.length > 0 && item?.messages[item.messages.length - 1].isRead ? 'item__right-icon' : 'item__right-icon active'}>

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

export default ChatSide