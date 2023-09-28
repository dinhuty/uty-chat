import languageIcon from '../assets/svg/language-svgrepo-com.svg'
import passwordIcon from '../assets/svg/password-svgrepo-com.svg'
import settingIcon from '../assets/svg/setting-svgrepo-com.svg'
import nightIcon from '../assets/svg/night-mode-svgrepo-com.svg'
import statusIcon from '../assets/svg/status-1-svgrepo-com.svg'
import notificationIcon from '../assets/svg/notification-unread-lines-svgrepo-com.svg'

export const preferences = [
    {
        icon: settingIcon,
        name: "Chung",
        action: "GENERAL_SETTING",
        setPage: true,
    },
    {
        icon: notificationIcon,
        name: "Thông báo",
        action: "NOTIFICATION__ACTION",
        setPage: false,
    },
    {
        icon: statusIcon,
        name: "Trạng thái hoạt động",
        action: "STATUS_ACTION",
        setPage: false,

    },
    {
        icon: nightIcon,
        name: "Giao diện tối",
        action: "THEME_ACTION",
        setPage: false,
    },
    {
        icon: passwordIcon,
        name: "Đổi mật khẩu",
        action: "CHANGE_PASSWORD",
        setPage: true,
    },
    {
        icon: languageIcon,
        name: "Ngôn ngữ",
        action: "CHAGNE_LANGUAGE",
        setPage: true,
    }
]