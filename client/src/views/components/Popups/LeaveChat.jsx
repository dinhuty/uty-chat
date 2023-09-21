import React, { useContext } from 'react'
import { CommonContext } from '../../../context/CommonContext'
import { MdOutlineDeleteForever } from 'react-icons/md'

export const LeaveChat = () => {
    const { isPopup,
        setIsPopup,
        setIsOpenMenu,
        addHandle,
        setAddHandle,
    } = useContext(CommonContext)
    const handleLeaveGroupChat = async () => {

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
