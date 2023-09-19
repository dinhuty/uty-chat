export const checkOnlineStatus = (onlineUsers,id) => {
    if (onlineUsers?.length <= 0 || onlineUsers === null) return false
    if (onlineUsers.some(user => user.userId === id))
        return true
    return false
}