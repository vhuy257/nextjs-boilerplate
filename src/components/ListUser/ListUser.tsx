'use client'
import React from 'react'
import useUser from '@/hooks/useUser'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/constant/constant'
import { useSession } from 'next-auth/react'
import { Skeleton } from '../ui/skeleton'
import DataTable from '../DataTable/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '../DataTable/data-table-row-actions'
import { DataTableColumnHeader } from '../DataTable/data-table-row-header'

interface User {
    id: string
    name: string
    email: string
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "Id",
        cell: ({row}) => row.index + 1
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ), 
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Id" />
        ), 
    },
    {
        header: "Action",
        cell:  ({ row, table }) => <DataTableRowActions row={row} table={table}/>
    }
]

const ListUser = () => {
    const { getUsers, deleteUser } = useUser()
    const { data:session }: any = useSession()

    const { isLoading, isPending, isError, error, data }: any = useQuery({
        queryKey: ['getUser'],
        queryFn: () => getUsers(API_URL.USER+'`'),
        enabled: !!session?.user?.accessToken
    })

    const removeRow = (id: string) => {
        const url = `${API_URL.USER}/${id}`
        deleteUser.mutate({ url })
    }

    const cardHeader = (
        <CardHeader>
            <CardTitle>
                User List
            </CardTitle>
            <CardDescription>
                Display content exclusively when the user has already logged in.
            </CardDescription>
        </CardHeader>
    )

    if(isLoading) return (
        <Card className='w-[750px] mt-8'>
            {cardHeader}
            <CardContent>
                <Skeleton className="h-4 w-full my-4" />
                <Skeleton className="h-4 w-full my-4" />
                <Skeleton className="h-4 w-full my-4" />
                <Skeleton className="h-4 w-full my-4" />
                <Skeleton className="h-4 w-full my-4" />
            </CardContent>
        </Card>
    )
    
    if (isError) return 'An error has occurred: ' + error.message

    return (
        <div className="w-[750px] mt-8">
            <DataTable columns={columns} data={data} meta={{
                removeRow
            }} searchKey='name'/>
        </div>
    )
}

export default ListUser