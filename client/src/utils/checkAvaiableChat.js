import { getIdWithoutUser } from "./getIdWithoutUser"

export const checkAvaiableChat = (InfoChat, userCurrent) => {
    if (InfoChat.isGroup) return true
    const idFriend = getIdWithoutUser(InfoChat, userCurrent)
    const check = userCurrent.blockedUsers.filter((id) => id === idFriend._id)
    if (check.length > 0)
        return false
    return true
}