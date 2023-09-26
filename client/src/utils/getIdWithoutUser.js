export const getIdWithoutUser = (InfoChat, userCurrent) => {
    const ID = InfoChat?.participants?.filter(user => user._id !== userCurrent._id)
    return ID[0]
}

export const getUserWithoutUserCr = (InfoChat, userCurrent) => {
    const user = InfoChat?.participants?.filter(user => user._id !== userCurrent._id)
    return user[0]
}