import axios from "axios"

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const login = async(email,password)=>{
    try {
        const res = await api.post('login/',{email,password}).then(res=>res.json())
    return res.data
    } catch (error) {
        throw err.response?.data
    }
}

export default api;