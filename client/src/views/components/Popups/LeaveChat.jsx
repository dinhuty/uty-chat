import React, { useContext } from 'react'
import { CommonContext } from '../../../context/CommonContext'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { leaveChat } from '../../../services/Api/chat'
import { ChatContext } from '../../../context/ChatContext'
import { AuthContext } from '../../../context/AuthContext'
import { PiWarning, PiXBold } from 'react-icons/pi'

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
        <section className='wrapper-delete__popup'>
            <header>
                <div className="header-top">
                    <div className="icon" onClick={() => {
                        setIsPopup(false)
                        setIsOpenMenu(false)
                    }}>
                        <PiXBold />
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="icon">
                        <PiWarning />
                    </div>
                    <div className="main">
                        <div className="title">
                            Bạn chắc chắn muốn rời khỏi nhóm
                        </div>
                        <div className="sub-title">
                            Bạn sẽ không thể nhận thông báo về nhóm này
                        </div>
                    </div>
                </div>

            </header>

            <div className="bottom">
                <button className="btn-cancel" onClick={() => {
                    setIsOpenMenu(false)
                    setIsPopup(false)
                }}
                >
                    Hủy bỏ
                </button>
                <button className="btn-delete" onClick={handleLeaveGroupChat}>
                    Rời
                </button>
            </div>
        </section>
        // <div className='wrapper-leave__popup'>
        //     <div className="top">
        //         <span>
        //             Rời cuộc trò chuyện
        //         </span>
        //     </div>
        //     <div className="icon">
        //         <MdOutlineDeleteForever />
        //     </div>
        //     <div className="bottom">
        //         <button className="btn-cancel" onClick={() => {
        //             setIsOpenMenu(false)
        //             setIsPopup(false)
        //         }}>
        //             Hủy bỏ
        //         </button>
        //         <button className="btn-delete" onClick={handleLeaveGroupChat}>
        //             Rời
        //         </button>
        //     </div>
        // </div>
    )
}
