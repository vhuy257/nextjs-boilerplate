'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useGet from '@/hooks/useGet'
import { API_URL } from '@/constant/constant'

const ListUser = () => {
    const {kyGetData} = useGet()

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => kyGetData(API_URL.LIST_USER)          
    })      
    
    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const { name, description, subscribers_count, stargazers_count, forks_count }: any = data;

    return (
        <>
            <h1>{name}</h1>
            <p>{description}</p>
            <strong>👀 {subscribers_count}</strong>{' '}
            <strong>✨ {stargazers_count}</strong>{' '}
            <strong>🍴 {forks_count}</strong>
            <div>{isFetching ? 'Updating...' : ''}</div>
        </>
    )
}

export default ListUser