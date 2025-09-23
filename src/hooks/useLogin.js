import { login } from '@/services/api'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setTokens } from '@/context';
import { useMaterialTailwindController } from '@/context';

export default function useLogin() {
     const [, dispatch] = useMaterialTailwindController();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")

        if(!email || !password){
            setError("Please fill out all Details")
            setIsLoading(false)
            return 
        }

        try {
            const res = await login({email,password})
            // console.log("RES:",res.data)
            // console.log("token:",res.data.access)
            // console.log("token:",res.data.refresh)
            // const refreshToken = localStorage.setItem("refreshToken", res?.data.refresh)
            // const accessToken = localStorage.setItem("accessToken", res?.data.access)

             setTokens(dispatch, {
          accessToken: res?.data.access,
          refreshToken: res?.data.refresh,
        });
            toast.success("Logged in successfully")
            navigate('/dashboard/home', { replace: true })

        } catch (error) {
            console.log(error)
            setError(error)
            toast.error(error.message)
        }

    }
  return {handleSubmit, error, isLoading, setIsLoading}
}
