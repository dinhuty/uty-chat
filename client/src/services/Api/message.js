import axios from '../../utils/services'

export const getListMessageInChat = async (idChat) => {
    try {
        const getList = await axios.get(`message/list/${idChat}`)
        return getList.data
    } catch (error) {
        console.log(error)
    }
}
export const sendMessage = async (data) => {
    try {
        const sendAMessage = await axios.post("message/create", data)
        return sendAMessage.data
    } catch (error) {
        console.log(error)
    }
}