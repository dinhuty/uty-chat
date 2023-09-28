import React, { useContext } from 'react'
import { CommonContext } from '../../../context/CommonContext';
import { ChatContext } from '../../../context/ChatContext';
import { blockChat, deleteChat } from '../../../services/Api/chat';
import { PiWarning, PiXBold } from "react-icons/pi";
import { AuthContext } from '../../../context/AuthContext';
import { blockUser } from '../../../services/Api/auth';
import { getIdWithoutUser } from '../../../utils/getIdWithoutUser';

export const BlockUser = () => {
    const { setIsPopup,
        setIsOpenMenu,
        blockHandle,
        setBlockHandle
    } = useContext(CommonContext)
    const { infoChatCurrent, idChatCurrent, socket, setLoading } = useContext(ChatContext)
    const { accessToken, userCurrent, setUserCurrent } = useContext(AuthContext)

    console.log(infoChatCurrent)
    const handleBlockUser = async () => {
        try {
            if (infoChatCurrent?.isGroup) return
            setLoading(true)
            const idBlock = getIdWithoutUser(infoChatCurrent, userCurrent)
            const blockAUser = await blockUser(idBlock, accessToken)
            const blockAChat = await blockChat(idChatCurrent, accessToken)
            if (socket !== null) {
                console.log(idBlock)
                socket.emit('blockChat', { idBlock, idChatCurrent })
            }
            setIsPopup(false)
            setIsOpenMenu(false)
            setBlockHandle(!blockHandle)
            setLoading(false)
        } catch (error) {
            alert("error")
            setLoading(false)
        }

    }
    return (
        <section className='wrapper-block__popup'>
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
                            Bạn chắc chắn muốn chặn người dùng này
                        </div>
                        <div className="sub-title">
                            Bạn sẽ không thể nhận được tin nhắn
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
                <button className="btn-delete" onClick={handleBlockUser}>
                    Chặn
                </button>
            </div>
        </section>
    )
}
