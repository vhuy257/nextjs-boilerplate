'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/constant/constant'
import { kyCustom } from '@/helper/auth'
import { Skeleton } from '../ui/skeleton'
import DataTable from '../DataTable/data-table'
import { columns } from '../Columns/Columns'

const ListArticles = () => {
    const { isPending, error, data, isFetching }: any = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            return await kyCustom.get(API_URL.ARTICLE).json()
        },
        refetchOnWindowFocus: false,
    })      
    
    if (isPending || isFetching) return (
        <div className="mt-8">
            <ul className="flex flex-col gap-8">
                {Array.from({length: 5}).map((k: any, key: number) => (
                    <li key={key}>
                        <Skeleton className="w-[450px] h-8"/>
                    </li>
                ))}
            </ul>
        </div>
    )
    
    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="w-[1060px] my-10">
            <DataTable columns={columns} data={data} searchKey='title'/>
        </div>
    )
}

export default ListArticles