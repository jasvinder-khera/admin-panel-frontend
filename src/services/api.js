import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const login = ({email,password}) =>{
   return api.post('/login/',{email,password})
}

