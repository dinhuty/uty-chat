import React, { useContext } from 'react'
import { CommonContext } from '../../../context/CommonContext'
import { ChatContext } from '../../../context/ChatContext'
import avatar from '../../../assets/svg/avatar-boy.svg'
import leftArrowIcon from '../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import Avatar from '../Avatar'

export const Participants = () => {

    const { infoChatCurrent } = useContext(ChatContext)
    const { setIsPopup } = useContext(CommonContext)
    console.log(infoChatCurrent)
    return (
        <div className='wapper-view-participants'>
            <header >
                <div className="back" onClick={() => {
                    setIsPopup(false)
                }}>
                    <img src={leftArrowIcon} alt="" />
                </div>
                <span>Thành viên</span>
            </header>
            <div className="list-user">
                {infoChatCurrent && infoChatCurrent.participants.map((user) => (
                    <div className="list-user__item" key={user._id}>
                        <div className="avatar">
                            <Avatar avatar={user?.avatarURL ? user.avatarURL : avatar} />
                        </div>
                        <div className="name">
                            <span>{`${user.firstName} ${user.lastName}`}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
