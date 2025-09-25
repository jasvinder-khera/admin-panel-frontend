import { login } from '@/services/api'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setTokens } from '@/context';

export default function useLogin() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
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
            const res = await login({email, password})
           
            // Use the updated setTokens function (no need to pass dispatch)
            setTokens({
                accessToken: res?.data.access,
                refreshToken: res?.data.refresh,
            });
            
            toast.success("Logged in successfully")
            navigate('/dashboard/home', { replace: true })

        } catch (error) {
            console.log(error)
            // Extract error message from response if available
            const errorMessage = error.response?.data?.message || error.message || "Login failed"
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return { handleSubmit, error, isLoading, setIsLoading }
}