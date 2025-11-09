import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import {login as loginApi} from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function useLogin() {
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const {mutate:login,isPending:isLogin}=useMutation({
        mutationFn:({email,password})=>loginApi({email,password}),
        onSuccess:(user)=>{
            queryClient.setQueryData(['user'],user.user)
            toast.success("login successfully");
            navigate('/')
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })
    return {login,isLogin}
}

export default useLogin
