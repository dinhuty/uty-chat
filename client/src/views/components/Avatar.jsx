import React from 'react'

const Avatar = ({avatar}) => {
    return (
        <>
            <img className="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />
        </>
    )
}

export default Avatar
