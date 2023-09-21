import React, { useContext } from 'react'
import { CommonContext } from '../../../context/CommonContext'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { leaveChat } from '../../../services/Api/chat'
import { ChatContext } from '../../../context/ChatContext'
import { AuthContext } from '../../../context/AuthContext'

export const LeaveChat = () => {
    const { isPopup,
        setIsPopup,
        setIsOpenMenu,
        leaveGroupHandle,
        setLeaveGroupHandle
    } = useContext(CommonContext)
    const { idChatCurrent } = useContext(ChatContext)
    const { userCurrent } = useContext(AuthContext)
    const handleLeaveGroupChat = async () => {
        const leaveAction = await leaveChat({
            chatId: idChatCurrent,
            userId: userCurrent._id
        })
        setIsPopup(false)
        setIsOpenMenu(false)
        setLeaveGroupHandle(!leaveGroupHandle)
    }
    return (
        <div className='wrapper-leave__popup'>
            <div className="top">
                <span>
                    Rời cuộc trò chuyện
                </span>
            </div>
            <div className="icon">
                <MdOutlineDeleteForever />
            </div>
            <div className="bottom">
                <button className="btn-cancel" onClick={() => setIsOpenMenu(false)}>
                    Hủy bỏ
                </button>
                <button className="btn-delete" onClick={handleLeaveGroupChat}>
                    Rời
                </button>
            </div>
        </div>
    )
}
