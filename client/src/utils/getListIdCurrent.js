export const getListIdCurrent = (chats) => {
    const participantIds = chats
        .filter(chat => chat.isGroup === false) // Lọc ra các chat có isGroup: false
        .map(chat => chat.participants.map(participant => participant._id))
        .flat();
        return participantIds
}