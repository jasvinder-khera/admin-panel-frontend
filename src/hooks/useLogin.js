import api, { login } from "@/services/api";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    const[error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (formData)=>{
        setError(null)
        setIsLoading(true)
        console.log(error)
        
        if(!formData.email || !formData.password){
            setError("Please fill all the details first")
            setIsLoading(false)
            return
        }
        try {
            let res = await login(formData.email,formData.password)
            console.log("API response:", res.data)
            setIsLoading(false)
        } catch (error) {
            setError(error.message)
        }finally{
            setIsLoading(false)
            return
        }
        
    }
  return {handleSubmit, error, isLoading}
}
