import React, { useContext, useState } from 'react'
import leftArrowIcon from '../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import { ChatContext } from '../../../context/ChatContext'
import { renameGroup } from '../../../services/Api/chat'
import { CommonContext } from '../../../context/CommonContext'

export const EditNameGroup = () => {

    const [newName, setNewName] = useState('')
    const { setIsPopup,
        setIsOpenMenu } = useContext(CommonContext)
    const { loading, setLoading, infoChatCurrent, setInfoChatCurrent } = useContext(ChatContext)

    const handleRenameGroup = async (e) => {
        e.preventDefault()
        try {
            if (!newName || !infoChatCurrent?.isGroup) return
            setLoading(true)
            const update = await renameGroup(infoChatCurrent?._id, newName)
            setInfoChatCurrent(update.data.populatedChat)
            setLoading(false)
            setIsPopup(false)

        } catch (error) {
            setLoading(false)
            setIsPopup(false)
        }

    }
    return (
        <div className='wrapper-edit-name'>
            <header >
                <div className="back" onClick={() => {
                    setIsPopup(false)
                }}>
                    <img src={leftArrowIcon} alt="" />
                </div>
                <span>Đổi  tên nhóm</span>
            </header>
            <div className="text-box">
                <form action="" onSubmit={handleRenameGroup}>
                    <input
                        className='text'
                        type="text"
                        placeholder='Nhập tên nhóm'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input className='btn' type="submit" />
                </form>

            </div>
        </div>
    )
}
