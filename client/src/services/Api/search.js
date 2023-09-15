import axios from "../../utils/services"

export const searchUser = async (keyword) => {
    try {
        const res = await axios.get("user/findbykeyword", {
            params: {
                keyword: keyword
            }
        })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

