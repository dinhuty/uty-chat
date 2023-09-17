import axios from 'axios'
export const baseURL = "https://uty-chat-api.vercel.app/api"

const instance = axios.create({
    baseURL : "https://uty-chat-api.vercel.app/api/"
})

export default instance
