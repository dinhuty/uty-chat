import axios from 'axios'
// export const baseURL = "http://localhost:3001/api"
export const baseURL = "https://uty-chat-api.vercel.app/api"

const instance = axios.create({
    // baseURL : "http://localhost:3001/api"
    baseURL : "https://uty-chat-api.vercel.app/api/"
})

export default instance
