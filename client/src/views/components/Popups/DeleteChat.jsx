import React, { useContext } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { CommonContext } from '../../../context/CommonContext';
export const DeleteChat = () => {
    const { isPopup,
        setIsPopup,
        setIsOpenMenu,
        addHandle,
        setAddHandle,
    } = useContext(CommonContext)

    const handleDeleteChat = async() => {
 
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
                <button className="btn-cancel" onClick={() => setIsOpenMenu(false)}>
                    Hủy bỏ
                </button>
                <button className="btn-delete" onClick={handleDeleteChat}>
                    Xóa
                </button>
            </div>
        </div>
    )
}
