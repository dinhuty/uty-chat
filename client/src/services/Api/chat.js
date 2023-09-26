
import axios from '../../utils/services'


export const createChat = async (data, token) => {
    try {
        const create = await axios.post("chat/create", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return create
    } catch (error) {
        console.log(error)
    }
}
export const createGroupChat = async (data, token) => {
    try {
        const create = await axios.post("chat/create/group", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return create
    } catch (error) {
        console.log(error)
    }
}
export const addUserToGroupChat = async (data, token) => {
    try {
        const create = await axios.post("chat/add/group", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return create
    } catch (error) {
        console.log(error)
    }
}
export const getChatForUser = async (idUser, token) => {
    try {
        const getList = await axios.get(`chat/list/${idUser}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return getList.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteChat = async (idChat, token) => {
    try {
        console.log(idChat)
        console.log(token)
        const deleteAChat = await axios.delete(`chat/delete/${idChat}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return deleteAChat.data
    } catch (error) {
        console.log(error)
    }
}
export const leaveChat = async (data, token) => {
    try {
        const leave = await axios.put("chat/leave/group", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return leave.data
    } catch (error) {
        console.log(error)
    }
}
export const getInfoChat = async (idChat, idUser, token) => {
    try {
        const getInfo = await axios.get(`chat/info/${idChat}/${idUser}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return getInfo.data
    } catch (error) {
        console.log(error)
    }
}

export const blockChat = async (chatId, token) => {
    try {
        const res = await axios.patch("chat/block", { chatId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        return res
    } catch (error) {
        return error.response
    }
}