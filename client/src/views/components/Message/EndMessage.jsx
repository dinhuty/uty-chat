import React from 'react'
import Avatar from '../Avatar'
import avatar from '../../../assets/svg/avatar-boy.svg'
import NameChat from '../../common/NameChat'
import { getUserWithoutUserCr } from '../../../utils/getIdWithoutUser'

export const EndMessage = ({ chat, userCurrent }) => {
    console.log(getUserWithoutUserCr(chat, userCurrent))
    return (
        <section className='end-message'>
            <Avatar avatar={getUserWithoutUserCr(chat, userCurrent) ? getUserWithoutUserCr(chat, userCurrent)?.avatarURL : avatar} />
            <div className='name'><NameChat chat={chat}
                userCurrent={userCurrent}
            /></div>
            {
                getUserWithoutUserCr(chat, userCurrent).address ?
                    <div className="info">
                        {getUserWithoutUserCr(chat, userCurrent).address}
                    </div>
                    :
                    <div className="info">
                        No address
                    </div>
            }
        </section>
    )
}
