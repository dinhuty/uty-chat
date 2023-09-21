import React, { useContext, useState } from 'react'
import reportIcon from '../../../../../assets/svg/report-svgrepo-com.svg'
import themeIcon from '../../../../../assets/svg/theme-store-svgrepo-com.svg'
import editIcon from '../../../../../assets/svg/edit-svgrepo-com.svg'
import deleteIcon from '../../../../../assets/svg/delete-stop-svgrepo-com.svg'
import userAddIcon from '../../../../../assets/svg/user-add-svgrepo-com.svg'
import leftArrowIcon from '../../../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import bandIcon from '../../../../../assets/svg/gui-ban-svgrepo-com.svg'
import avatar from '../../../../../assets/svg/avatar-boy.svg'
import rightArrowIcon from '../../../../../assets/svg/right-arrow-backup-2-svgrepo-com.svg'
import groupIcon from '../../../../../assets/svg/group-add-svgrepo-com.svg'
import outIcon from '../../../../../assets/svg/sign-out-left-4-svgrepo-com.svg'
import Avatar from '../../../../components/Avatar'
import { CommonContext } from '../../../../../context/CommonContext'
import { ChatContext } from '../../../../../context/ChatContext'
import NameChat from '../../../../common/NameChat'
import { AuthContext } from '../../../../../context/AuthContext'
import ActionPopup from '../../../../components/ActionPopup'


const ChatMenu = () => {
    const { isOpenMenu,
            setIsOpenMenu,
            isPopup,
            setIsPopup } = useContext(CommonContext)
    const { infoChatCurrent } = useContext(ChatContext)
    const { userCurrent } = useContext(AuthContext)
    const [actionOption, setActionOption] = useState(null)

    console.log("xx", infoChatCurrent)
    const options = [
        {
            type: 1,
            icon: themeIcon,
            name: "Chủ đề",
            action: "CUSTOM_THEME"
        },
        {
            type: 3,
            icon: editIcon,
            name: "Sửa tên",
            action: "EDIT_NAME",
        },
        {
            type: 3,
            icon: userAddIcon,
            name: "Thêm thành viên",
            action: "ADD_USER_GROUP",
        },
        {
            type: 2,
            icon: groupIcon,
            name: "Tạo nhóm chat",
            action: "CREATE_GROUP_CHAT",
        },
        {
            type: 3,
            icon: outIcon,
            name: "Rời nhóm",
            action: "OUT_GROUP",
        },
        {
            type: 1,
            icon: reportIcon,
            name: "Thông báo",
            action: "",
        },
        {
            type: 1,
            icon: bandIcon,
            name: "Chặn",
            action: "",
        },
        {
            type: 1,
            icon: deleteIcon,
            name: "Xóa cuộc trò chuyện",
            action: "DELETE_CHAT",
        }
    ]
    const Wraper = ({ item, action }) => {
        return (
            <div className="menu__item" onClick={() => {
                setActionOption(action)
                setIsPopup(true)
            }}>
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
        )
    }
    return (
        <div className='menu-options'>
            <div className={isPopup ? "menu-options__popup active" : "menu-options__popup"}>
                <ActionPopup action={actionOption} />
            </div>
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
                        {infoChatCurrent &&
                            <NameChat chat={infoChatCurrent} userCurrent={userCurrent} />
                        }
                    </div>
                </div>
                <div className="menu-preferences">
                    <div className="title">
                        Preferences
                    </div>
                    {
                        infoChatCurrent && options.map((item, index) => {
                            if (infoChatCurrent.isGroup && item.type === 3) {
                                return (
                                    <Wraper item={item} key={index} action={item.action} />
                                )
                            }
                            if (!infoChatCurrent.isGroup && item.type === 2) {
                                return (
                                    <Wraper item={item} key={index} action={item.action} />
                                )
                            }
                            if (item.type === 1)
                                return (
                                    <Wraper item={item} key={index} action={item.action} />
                                )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatMenu
