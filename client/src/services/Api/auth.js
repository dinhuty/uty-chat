import axios from '../../utils/services'

export const login = async (data) => {
    try {
        const res = await axios.post("user/signin", data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}