import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getSettings } from '../../services/apiSettings'

function useSettings() {
    const {data:settings,error,isLoading}=useQuery({
        queryKey:['settings'],
        queryFn:getSettings
    })
    return{settings,error,isLoading}
}

export default useSettings
