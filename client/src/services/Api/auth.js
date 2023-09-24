import axios from '../../utils/services'

export const login = async (data) => {
    try {
        const res = await axios.post("user/signin", data)
        return res
    } catch (error) {
        return error.response
    }
}

export const register = async (data) => {
    try {
        const res = await axios.post("user/signup", data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const changePassword = async (data, token) => {
    try {
        const res = await axios.put("user/updatePassword", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error.response
    }
}


export const forgotPassword = async (email) => {
    try {
        const res = await axios.post("user/forgotPassword", { email })
        return res
    } catch (error) {
        return error.response
    }
}