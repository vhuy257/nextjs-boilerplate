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
import DataTable from '../DataTable/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'

interface User {
    id: string
    name: string
    email: string
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        header: "Action",
        cell:  ({ row }: any) => (
            <div className="flex items-center space-x-2">
                <Button onClick={() => {
                    console.log('test')
                }}>Remove</Button>
            </div>
        )
    }
]

const ListUser = () => {
    const { getUsers, deleteUser } = useUser()
    const { data:session }: any = useSession()

    const { isLoading, isPending, isSuccess, data }: any = useQuery({
        queryKey: ['getUser'],
        queryFn: () => getUsers(API_URL.USER),
        enabled: !!session?.user?.accessToken
    })

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

    if(isPending || isLoading) return (
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

    if(isSuccess) {
        return (
            <div className="w-[750px] mt-8">
                <DataTable columns={columns} data={data} />
            </div>
        )
    }
}

export default ListUser