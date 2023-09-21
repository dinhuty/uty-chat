import React from 'react'

const NameChat = ({ chat, userCurrent }) => {
    return (
        <div className='name-chat'>

            {chat.isGroup ? <div className="desc__name">
                {chat?.participants?.length > 1 ? chat?.participants?.slice(0, 2).map((user) => (
                    <span key={user._id}>{user.lastName},</span>
                ))
                    :
                    chat?.participants?.slice(0, 1).map((user) => (
                        <span key={user._id}>{user.lastName},</span>
                    ))
                }
                <span>{userCurrent.lastName}...</span>
            </div> :
                <div className="desc__name">
                    <span>{chat.participants[0].firstName}</span>
                    <span>{chat.participants[0].lastName}</span>
                </div>
            }
        </div>
    )
}

export default NameChat
