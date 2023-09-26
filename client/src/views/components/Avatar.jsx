import React from 'react'

const Avatar = ({ avatar }) => {
    return (
        <div className='app-avatar'>
            <img src={avatar} alt="Rounded avatar" />
        </div>
    )
}

export default Avatar
