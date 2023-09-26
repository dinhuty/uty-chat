import axios from '../../utils/services'


export const getListMessageInChat = async (idChat, page, token) => {
    try {
        const getList = await axios.get(`message/list/${idChat}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                page: page
            }
        })
        return getList.data
    } catch (error) {
        console.log(error)
    }
}
export const sendMessage = async (data, token) => {
    try {
        const sendAMessage = await axios.post("message/create", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return sendAMessage.data
    } catch (error) {
        console.log(error)
    }
}

export const maskAllMessageRead = async (idChat, token) => {
    try {
        const updateRead = await axios.put(`message/update-read/${idChat}`, null,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return updateRead.data
    } catch (error) {
        console.log(error)
    }
}