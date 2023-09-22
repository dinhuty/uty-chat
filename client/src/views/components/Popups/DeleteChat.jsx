import React, { useContext } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { CommonContext } from '../../../context/CommonContext';
import { ChatContext } from '../../../context/ChatContext';
import { deleteChat } from '../../../services/Api/chat';
export const DeleteChat = () => {
    const { setIsPopup,
        setIsOpenMenu,
        deleteHandle,
        setDeleteHandle
    } = useContext(CommonContext)
    const { idChatCurrent } = useContext(ChatContext)

    const handleDeleteChat = async () => {
        const deleteAChat = await deleteChat(idChatCurrent)
        setIsPopup(false)
        setIsOpenMenu(false)
        setDeleteHandle(!deleteHandle)

    }
    return (
        <div className='wrapper-delete__popup'>
            <div className="top">
                <span>
                    Xóa cuộc trò chuyện
                </span>
            </div>
            <div className="icon">
                <MdOutlineDeleteForever />
            </div>
            <div className="bottom">
                <button className="btn-cancel" onClick={() => {
                    setIsPopup(false)
                    setIsOpenMenu(false)
                }}
                >
                    Hủy bỏ
                </button>
                <button className="btn-delete" onClick={handleDeleteChat}>
                    Xóa
                </button>
            </div>
        </div>
    )
}
