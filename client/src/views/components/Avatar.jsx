import React from 'react'
import av from '../../assets/svg/avatar-boy.svg'

const Avatar = ({ avatar }) => {
    return (
        <div className='app-avatar'>
            <img src={avatar ? avatar : av} alt="Rounded avatar" />
        </div>
    )
}

export default Avatar
