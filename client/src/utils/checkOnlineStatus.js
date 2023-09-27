export const checkOnlineStatus = (onlineUsers, InfoChat, userCurrent) => {
    const onlineWithoutSelf = InfoChat?.participants?.filter(user => user._id !== userCurrent._id)
    if (InfoChat?.participants?.length <= 0)
        return false
    if (onlineUsers?.length <= 0 || onlineUsers === null)
        return false
    if (onlineWithoutSelf?.length > 0 && onlineUsers.some(user => user.userId === onlineWithoutSelf[0]?._id))
        return true
    return false
}