import React, { useContext } from 'react'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import Avatar from './Avatar'
import avatar from '../../assets/svg/avatar-boy.svg'
import settingIcon from '../../assets/svg/setting-svgrepo-com.svg'
import nightIcon from '../../assets/svg/night-mode-svgrepo-com.svg'
import statusIcon from '../../assets/svg/status-1-svgrepo-com.svg'
import notificationIcon from '../../assets/svg/notification-unread-lines-svgrepo-com.svg'
import rightArrowIcon from '../../assets/svg/right-arrow-backup-2-svgrepo-com.svg'
import languageIcon from '../../assets/svg/language-svgrepo-com.svg'
import passwordIcon from '../../assets/svg/password-svgrepo-com.svg'
import homeIcon from '../../assets/svg/home-page-svgrepo-com.svg'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { CommonContext } from '../../context/CommonContext'

const Profile = () => {
    const { isProfileOpen, setIsProfileOpen, darkMode, setDarkMode } = useContext(CommonContext)
    const { userCurrent, setUserCurrent } = useContext(AuthContext)
    const navigate = useNavigate()

    const hanldeCloseProfilePopup = () => {
        setIsProfileOpen(false)
    }
    const hanldeLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        setUserCurrent(null)
        setIsProfileOpen(false)
        navigate('/login')
    }
    const preferences = [
        {
            icon: settingIcon,
            name: "Chung",
            action: ""
        },
        {
            icon: notificationIcon,
            name: "Thông báo",
            action: ""
        },
        {
            icon: statusIcon,
            name: "Trạng thái hoạt động",
            action: ""
        },
        {
            icon: nightIcon,
            name: "Giao diện tối",
            action: "darkmode"
        },
        {
            icon: passwordIcon,
            name: "Đổi mật khẩu",
            action: ""
        },
        {
            icon: languageIcon,
            name: "Ngôn ngữ",
            action: ""
        }
    ]
    console.log("isProfileOpen", isProfileOpen)
    return (
        <div className='app-profile'>
            <div className="profile-blur" onClick={() => setIsProfileOpen(false)}>

            </div>
            <div className="profile-main">
                <div className="profile-header">
                    <div className="profile__back" onClick={() => setIsProfileOpen(false)}>
                        <img src={homeIcon} alt="" />
                    </div>
                    <div className="profile__title">
                        <span>
                            Profile
                        </span>
                    </div>
                    <div className="profile__submenu">
                        <IoEllipsisVerticalOutline />
                    </div>
                </div>
                <div className="profile-user">
                    <div className="user-avatar">
                        <Avatar avatar={avatar} />
                    </div>
                    <div className="user-name">
                        <span>
                            {userCurrent.firstName}
                        </span>
                        <span>
                            {userCurrent.lastName}
                        </span>
                    </div>
                </div>
                <div className="profile-preferences">
                    <div className="title" >
                        Preferences
                    </div>
                    <div className="preferences">
                        {
                            preferences.map((item, index) => (
                                <div className="preferences-item" key={index}>
                                    <div className="name">
                                        <div className="icon">
                                            <img src={item.icon} alt="" />
                                        </div>
                                        <div className="text">
                                            {item.name}
                                        </div>
                                    </div>
                                    {item.action === 'darkmode' ?
                                        <div className="action" >
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        :
                                        <div className="action">
                                            <img src={rightArrowIcon} alt="" />
                                        </div>
                                    }

                                </div>
                            ))
                        }
                        <div className="preferences-item">
                            <div className="name" onClick={hanldeLogout}>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                </div>
                                <div className="text">
                                    Đăng xuất
                                </div>
                            </div>
                            <div className="action">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
