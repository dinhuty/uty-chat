import React, { useContext } from 'react'
import { CommonContext } from '../../../context/CommonContext';
import { ChatContext } from '../../../context/ChatContext';
import { deleteChat } from '../../../services/Api/chat';
import { PiWarning, PiXBold } from "react-icons/pi";
import { AuthContext } from '../../../context/AuthContext';

export const DeleteChat = () => {
    const { setIsPopup,
        setIsOpenMenu,
        deleteHandle,
        setDeleteHandle,
        setIsChatting
    } = useContext(CommonContext)
    const { idChatCurrent, listChatForUser, setIdChatCurrent } = useContext(ChatContext)
    const { accessToken } = useContext(AuthContext)

    const handleDeleteChat = async () => {
        const deleteAChat = await deleteChat(idChatCurrent, accessToken)
        setIsPopup(false)
        setIsOpenMenu(false)
        setIsChatting(false)
        setDeleteHandle(!deleteHandle)

    }
    return (
        <section className='wrapper-delete__popup'>
            <header>
                <div className="header-top">
                    <div className="icon" onClick={() => {
                        setIsPopup(false)
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
                            Bạn chắc chắn muốn xóa cuộc trò chuyện này
                        </div>
                        <div className="sub-title">
                            Bạn sẽ không thể khôi phục
                        </div>
                    </div>
                </div>

            </header>

            <div className="bottom">
                <button className="btn-cancel" onClick={() => {
                    setIsPopup(false)
                }}
                >
                    Hủy bỏ
                </button>
                <button className="btn-delete" onClick={handleDeleteChat}>
                    Xóa
                </button>
            </div>
        </section>
    )
}
