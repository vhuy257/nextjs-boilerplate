'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/constant/constant'
import { kyCustom } from '@/helper/auth'

const ListArticles = () => {
    const { isPending, error, data, isFetching }: any = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            return await kyCustom.get(API_URL.ARTICLE).json()
        },
        refetchOnWindowFocus: false,
    })      
    
    if (isPending) return (
        <div className="mt-8">
            Loading...
        </div>
    )
    
    if (isFetching) return 'Fetching...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <ul>
            {
                data?.map((k: any, key: number) => {
                    const { title, description, body, publish } = k;
                    return (
                        <li key={key} className="my-8">
                            title: {title} <br />
                            description: { description } <br />
                            body: { body } <br />
                            publish: { publish ? 'true' : 'false' }
                        </li>
                    )
                }) 
            }
        </ul>
    )
}

export default ListArticles