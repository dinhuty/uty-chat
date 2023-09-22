import React from 'react'
import { checkOnlineStatus } from '../../utils/checkOnlineStatus'

const NameChat = ({ chat, userCurrent, viewStatus, onlineUsers }) => {
    const chatName = chat?.participants?.filter(user => user._id !== userCurrent._id)
    return (
        <div className='name-chat'>
            {chat?.isGroup ? <div className="user-desc group">
                {chatName?.length > 1 ? chatName?.slice(0, 2).map((user) => (
                    <span key={user._id}>{user.lastName},</span>
                ))
                    :
                    chatName?.slice(0, 1).map((user) => (
                        <span key={user._id}>{user.lastName},</span>
                    ))
                }
                <span>{userCurrent.lastName}...</span>
            </div> :

                <div className="user-desc">
                    <div className="user-desc__name">
                        <span>{chatName[0]?.firstName}</span>
                        <span>{chatName[0]?.lastName}</span>
                    </div>

                    {viewStatus && checkOnlineStatus(onlineUsers, chat, userCurrent) && <div className='user-desc__status'>Active</div>}

                </div>
            }
        </div>
    )
}

export default NameChat
