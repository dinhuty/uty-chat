import axios from '../../utils/services'

export const createChat = async (data) => {
    try {
        const create = await axios.post("chat/create", data)
        return create
    } catch (error) {
        console.log(error)
    }
}
export const getChatForUser = async (idUser) => {
    try {
        const getList = await axios.get(`chat/list/${idUser}`)
        return getList.data
    } catch (error) {
        console.log(error)
    }
}

export const getInfoChat = async (idChat, idUser) => {
    try {
        const getInfo = await axios.get(`chat/info/${idChat}/${idUser}`)
        return getInfo.data
    } catch (error) {
        console.log(error)
    }
}