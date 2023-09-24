import React from 'react'
import Avatar from '../Avatar'
import avatar from '../../../assets/svg/avatar-boy.svg'

export const EndMessage = () => {
    return (
        <div className='end-message'>
            <Avatar avatar={avatar} />
            <p>Trần Văn Dinh</p>
            <div className="info">
                Giao Thủy - Nam Định
            </div>
        </div>
    )
}
