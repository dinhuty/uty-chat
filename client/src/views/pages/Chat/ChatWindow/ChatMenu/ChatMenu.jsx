import React, { useContext, useState } from 'react'
import reportIcon from '../../../../../assets/svg/report-svgrepo-com.svg'
import themeIcon from '../../../../../assets/svg/theme-store-svgrepo-com.svg'
import editIcon from '../../../../../assets/svg/edit-svgrepo-com.svg'
import deleteIcon from '../../../../../assets/svg/delete-left-svgrepo-com.svg'
import userAddIcon from '../../../../../assets/svg/user-add-svgrepo-com.svg'
import leftArrowIcon from '../../../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import bandIcon from '../../../../../assets/svg/gui-ban-svgrepo-com.svg'
import avatar from '../../../../../assets/svg/avatar-boy.svg'
import rightArrowIcon from '../../../../../assets/svg/right-arrow-backup-2-svgrepo-com.svg'
import Avatar from '../../../../components/Avatar'
import { ProfileContext } from '../../../../../context/ProfileContext'


const ChatMenu = () => {
    const { isOpenMenu, setIsOpenMenu } = useContext(ProfileContext)
    const options = [
        {
            isGroup: false,
            icon: themeIcon,
            name: "Chủ đề",
            action: rightArrowIcon
        },
        {
            isGroup: true,
            icon: editIcon,
            name: "Sửa tên"
        },
        {
            isGroup: true,
            icon: userAddIcon,
            name: "Thêm thành viên"
        },
        {
            isGroup: false,
            icon: reportIcon,
            name: "Thông báo"
        },
        {
            isGroup: false,
            icon: bandIcon,
            name: "Chặn"
        },
        {
            isGroup: false,
            icon: deleteIcon,
            name: "Xóa cuộc trò chuyện"
        }
    ]
    return (
        <div className='menu-options'>
            <div className="menu-options__blur" onClick={() => setIsOpenMenu(false)}>

            </div>
            <div className={isOpenMenu ? "menu-options__main active" : "menu-options__main"}>
                <div className="menu-nav">
                    <img src={leftArrowIcon} alt="" onClick={() => setIsOpenMenu(false)} />
                </div>
                <div className="menu-options__info">
                    <div className="avatar">
                        <Avatar avatar={avatar} />
                    </div>
                    <div className="name">
                        <span>Trần Văn Dinh</span>
                    </div>
                </div>
                <div className="menu-preferences">
                    <div className="title">
                        Preferences
                    </div>
                    {
                        options.map((item, index) => (
                            <div className="menu__item" key={index}>
                                <div className="item__left">
                                    <div className="icon">
                                        <img src={item.icon} alt="" />
                                    </div>
                                    <div className="name">
                                        {item.name}
                                    </div>
                                </div>
                                <div className="item__right">
                                    <img src={rightArrowIcon} alt="" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatMenu
