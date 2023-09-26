import { faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { formatTime } from '../../utils/formatTime';
import avatar from '../../assets/svg/avatar-boy.svg'
import { MessageContext } from '../../context/MessageContext';
import Avatar from './Avatar';

const Message = ({ message, shouldDisplayAvatar, userCurrent }) => {
    const { setImageOpen } = useContext(MessageContext)
    const conditionAvatar = shouldDisplayAvatar && message?.sender?._id !== userCurrent?._id
    const conditionTimer = shouldDisplayAvatar
    return (
        <div className={message?.sender?._id === userCurrent?._id ? 'chat-message user-chat' : 'chat-message'}>
            {conditionAvatar ?
                <div className='message-avatar'>
                    <Avatar className="message-avatar" avatar={message?.sender?.avatarURL ? message?.sender?.avatarURL : avatar} />
                </div>

                // <img className="message-avatar w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />
                :
                <div className='message-avatar'></div>
            }
            <div className="message-content">
                {message?.content?.length > 0 &&
                    <div className="message-text">
                        <p>{message?.content}</p>
                    </div>
                }
                {message?.attachments?.length > 0 &&
                    <div className="message-media">
                        <img src={message.attachments[0].url} alt="Image" onClick={() => setImageOpen(message.attachments[0].url)} />
                    </div>

                }
                {conditionTimer && <div className='message-time'>
                    <div className="message-time-icon">
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className="message-time-text">
                        {formatTime(message.createdAt)}&nbsp;
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Message
