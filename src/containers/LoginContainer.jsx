import useLogin from '@/hooks/useLogin'
import { SignIn } from '@/pages/auth'
import React from 'react'

export default function LoginContainer() {
    const{handleSubmit,error,isLoading} = useLogin()
  return (
    <SignIn submitHandler={handleSubmit} error={error} isLoading={isLoading} />
  )
}
