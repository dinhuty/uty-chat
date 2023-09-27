
import axios from '../axios'


export const createChat = async (data, token) => {
    try {
        const create = await axios.post("chat/create", data)
        return create
    } catch (error) {
        console.log(error)
    }
}
export const createGroupChat = async (data, token) => {
    try {
        const create = await axios.post("chat/create/group", data)
        return create
    } catch (error) {
        console.log(error)
    }
}
export const addUserToGroupChat = async (data, token) => {
    try {
        const create = await axios.post("chat/add/group", data)
        return create
    } catch (error) {
        console.log(error)
    }
}
export const getChatForUser = async (idUser, token) => {
    try {
        const getList = await axios.get(`chat/list/${idUser}`
        )
        return getList.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteChat = async (idChat, token) => {
    try {
        const deleteAChat = await axios.delete(`chat/delete/${idChat}`)
        return deleteAChat.data
    } catch (error) {
        console.log(error)
    }
}
export const leaveChat = async (data, token) => {
    try {
        const leave = await axios.put("chat/leave/group", data)
        return leave.data
    } catch (error) {
        console.log(error)
    }
}
export const getInfoChat = async (idChat, idUser, token) => {
    try {
        const getInfo = await axios.get(`chat/info/${idChat}/${idUser}`)
        return getInfo.data
    } catch (error) {
        console.log(error)
    }
}

export const blockChat = async (chatId, token) => {
    try {
        const res = await axios.patch("chat/block", { chatId })
        return res
    } catch (error) {
        return error.response
    }
}