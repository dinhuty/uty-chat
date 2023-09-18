import axios from 'axios'
export const baseURL = "http://localhost:3001/api"

const instance = axios.create({
    baseURL : "http://localhost:3001/api"
})

export default instance
