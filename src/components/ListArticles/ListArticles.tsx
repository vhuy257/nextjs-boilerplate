'use client'
import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { API_URL } from '@/constant/constant'
import { kyCustom, queryClient } from '@/helper/auth'
import { Skeleton } from '../ui/skeleton'
import DataTable from '../DataTable/data-table'
import { columns } from '../Columns/Columns'

const ListArticles = () => {
    const { isPending, isError, error, data, isFetching }: any = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            return await kyCustom.get(API_URL.ARTICLE).json()
        },
        refetchOnWindowFocus: false,
    })      
    
    const mutation  = useMutation({
        mutationKey: ['articlesRemove'],
        mutationFn: async({ url }: { url: string }) => {
            const res = await kyCustom.delete(url);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(
                {
                  queryKey: ['articles'],
                  refetchType: 'active',
                },
            )
        }
    })

    const removeRow = (id: string) => {
        const url = `${API_URL.ARTICLE}/${id}`
        mutation.mutate({ url })
    }

    if (isFetching || isPending || mutation.isPending) return (
        <div className='w-[1060px] my-10'>
            <Skeleton className="min-h-[380px]" />
        </div>
    )    
    
    if (isError) return 'An error has occurred: ' + error.message

    return (
        <div className="w-[1060px] my-10">            
            <DataTable columns={columns} data={data} searchKey='title' meta={{removeRow}}/>
        </div>
    )
}

export default ListArticles