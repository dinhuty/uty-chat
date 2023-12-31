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
import Avatar from '../../../components/Avatar'
import { getUserWithoutUserCr } from '../../../../utils/getIdWithoutUser'
import SideMenu from '../SideMenu/SideMenu'
import { CommonContext } from '../../../../context/CommonContext'

const ChatSide = () => {
    const sliderRef = useRef(null);
    const [keyword, setKeyword] = useState('')
    const [listNewUser, setListNewUser] = useState([])
    const { listChatForUser,
        setIdChatCurrent,
        onlineUsers,
        setListChatForUser,
    } = useContext(ChatContext);
    const { isChatting, setIsChatting } = useContext(CommonContext)
    const { userCurrent, accessToken } = useContext(AuthContext)
    const { idChatCurrent } = useContext(ChatContext)
    const [findAction, setFindAction] = useState(false)

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
        const createAChat = await createChat(data, accessToken)
        if (createAChat?.status === 200) {
            setIdChatCurrent(createAChat?.data?.chat?._id)
        } else if (createAChat?.status === 201) {
            setIdChatCurrent(createAChat?.data?.chat?._id)
            setListChatForUser((prev => [...prev, createAChat?.data.chat]))
        }
        setKeyword('')
        setFindAction(false)
    }

    return (
        <div className={isChatting ? 'chat-side mobile' : 'chat-side'}>
            <div className="chat-side__top">
                <div className="title">
                    Message
                </div>
                <div className="search-box">
                    <input className={findAction ? 'focus' : ''}
                        type="text"
                        placeholder='Tìm kiếm tin nhắn mới '
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => setFindAction(true)}
                    />
                    {findAction && <button onClick={() => {
                        setFindAction(false)
                        setKeyword('')
                    }}>Đóng</button>}
                </div>
            </div>
            {findAction ?
                <div className="chat-side__list">
                    {listNewUser?.length > 0 ?
                        listNewUser.map((item) => (
                            <div className="search-list__item" key={item._id} onClick={() => {
                                hanldeCreateChat(item._id)
                            }}>
                                <div className="avatar">
                                    <Avatar avatar={item?.avatarURL ? item?.avatarURL : avatar} />
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
                        ))
                        :
                        <div className="chat-list__item empty">
                            Tìm kiếm tin nhắn
                        </div>
                    }
                </div> :
                <div className="chat-side__list">
                    {listChatForUser?.length > 0 ? listChatForUser.map((item, index) => {
                        return (
                            <div className={item._id === idChatCurrent ? "chat-list__item active" : "chat-list__item"}
                                key={item._id}
                                onClick={() => {
                                    setIdChatCurrent(item._id)
                                    setIsChatting(true)
                                }}
                            >
                                <div className="item__left">
                                    <div className="avatar">
                                        <Avatar avatar={getUserWithoutUserCr(item, userCurrent)?.avatarURL ? getUserWithoutUserCr(item, userCurrent)?.avatarURL : avatar} />
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
                        <div className="chat-list__item empty">
                            No Convervation
                        </div>
                    }
                </div>
            }
            <div className="chat-side__bottom">
                <SideMenu />
            </div>
        </div>
    )
}

export default memo(ChatSide)
