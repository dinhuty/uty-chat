import axios from "../../utils/services"

export const searchUser = async (keyword,excludedIds) => {
    try {
        const res = await axios.get("user/findbykeyword", {
            params: {
                keyword: keyword,
                excludedIds: excludedIds
            }
        })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

