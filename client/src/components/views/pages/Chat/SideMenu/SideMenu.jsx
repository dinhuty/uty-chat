import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons"
import { faUsers, faUserPlus, faGear } from "@fortawesome/free-solid-svg-icons"


const SideMenu = () => {
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
        </div>
    )
}

export default SideMenu
