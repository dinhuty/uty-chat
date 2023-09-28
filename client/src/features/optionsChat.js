import reportIcon from '../assets/svg/report-svgrepo-com.svg'
import themeIcon from '../assets/svg/theme-store-svgrepo-com.svg'
import editIcon from '../assets/svg/edit-svgrepo-com.svg'
import deleteIcon from '../assets/svg/delete-stop-svgrepo-com.svg'
import userAddIcon from '../assets/svg/user-add-svgrepo-com.svg'
import bandIcon from '../assets/svg/gui-ban-svgrepo-com.svg'
import groupIcon from '../assets/svg/group-add-svgrepo-com.svg'
import outIcon from '../assets/svg/sign-out-left-4-svgrepo-com.svg'
import listUser from '../assets/svg/users-svgrepo-com.svg'

export const options = [
    {
        type: 1,
        icon: themeIcon,
        name: "Chủ đề",
        action: "CUSTOM_THEME"
    },
    {
        type: 3,
        icon: listUser,
        name: "Xem thành viên",
        action: "VIEW_PARTICIPANTS",
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
        action: "NOTIFICATION",
    },
    {
        type: 2,
        icon: bandIcon,
        name: "Chặn",
        action: "BLOCK_USER",
    },
    {
        type: 1,
        icon: deleteIcon,
        name: "Xóa cuộc trò chuyện",
        action: "DELETE_CHAT",
    }
]