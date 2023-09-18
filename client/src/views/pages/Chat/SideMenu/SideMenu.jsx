import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons"
import { faUsers, faUserPlus, faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const SideMenu = () => {
    const { setUserCurrent } = useContext(AuthContext);
    const  navigate = useNavigate()
    const hanldeLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        setUserCurrent(null)
        navigate('/login')
    }
    return (
        <div className='side-menu'>
            <div className="side-menu__item active">
                <FontAwesomeIcon icon={faEnvelope} />

            </div>
            <div className="side-menu__item">
                <FontAwesomeIcon icon={faUser} />

            </div>
            <div className="side-menu__item">
                <FontAwesomeIcon icon={faUsers} />

            </div>
            <div className="side-menu__item">
                <FontAwesomeIcon icon={faUserPlus} />

            </div>
            <div className="side-menu__item">
                <FontAwesomeIcon icon={faGear} />

            </div>
            <div className="side-menu__item" onClick={hanldeLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />

            </div>
        </div>
    )
}

export default SideMenu
