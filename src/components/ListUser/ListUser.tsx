'use client'
import React from 'react'
import useGet from '@/hooks/useGetWithAuth'

const ListUser = () => {
    const { mutation } = useGet()

    if(mutation.isPending) return 'Loading user...'

    if(mutation.isSuccess) {
        return (
            <>
                <h1>List User</h1>   
                <h4>This component only load when user was signed in</h4>  
                <ul>
                    {mutation?.data.map((k: any, key: number) => (
                        <li key={key}>{k.name}</li>
                    ))}   
                </ul>
            </>
        )
    }
}

export default ListUser