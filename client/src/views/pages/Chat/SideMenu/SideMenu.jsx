import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons"
import { faUsers, faUserPlus, faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../components/Avatar'
import avatar from '../../../../assets/svg/avatar-boy.svg'
import { CommonContext } from '../../../../context/CommonContext'


const SideMenu = () => {
    const { userCurrent } = useContext(AuthContext);
    const { setIsProfileOpen } = useContext(CommonContext)


    return (
        <div className='side-menu'>
            <div className="side-menu__top" onClick={() => setIsProfileOpen(true)}>
                <Avatar avatar={userCurrent?.avatarURL ? userCurrent?.avatarURL : avatar} />
            </div>
            <div className="side-menu__main">
                <div className="side-menu__item active">
                    <FontAwesomeIcon icon={faEnvelope} />

                </div>
                <div className="side-menu__item" onClick={() => setIsProfileOpen(true)}>
                    <FontAwesomeIcon icon={faUser} />

                </div>
                <div className="side-menu__item" onClick={() => setIsProfileOpen(true)}>
                    <FontAwesomeIcon icon={faUsers} />

                </div>
                <div className="side-menu__item" onClick={() => setIsProfileOpen(true)}>
                    <FontAwesomeIcon icon={faUserPlus} />

                </div>
                <div className="side-menu__item" onClick={() => setIsProfileOpen(true)}>
                    <FontAwesomeIcon icon={faGear} />

                </div>
            </div>
            <div className="side-menu__bottom">
            </div>
        </div>
    )
}

export default SideMenu
