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
import { useMutation, useQuery } from '@tanstack/react-query'
import { API_URL } from '@/constant/constant'
import { useSession } from 'next-auth/react'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'

const ListUser = () => {
    const { getUsers, deleteUser } = useUser()
    const { data:session }: any = useSession()

    const { isLoading, isPending, isSuccess, data }: any = useQuery({
        queryKey: ['getUser'],
        queryFn: () => getUsers(API_URL.USER),
        enabled: !!session?.user?.accessToken
    })

    if(isPending || isLoading) return (
        <Card className='w-[350px] mt-8'>
            <CardHeader>
                <CardTitle>
                    List Users
                </CardTitle>
                <CardDescription>
                    Only show when user logged in already.
                </CardDescription>
            </CardHeader>
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
            <>
                <Card className="w-[450px] mt-8">
                    <CardHeader>
                        <CardTitle>
                            User List
                        </CardTitle>
                        <CardDescription>
                            Display content exclusively when the user has already logged in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className='space-y-4'>
                            {data.map((k: any, key: number) => (
                                <li key={key}>
                                    {k.name}
                                    <Button 
                                        variant={'link'} 
                                        className="ml-4 text-xs" 
                                        onClick={() => deleteUser.mutate({url: `${API_URL.USER}/${k.id}`})}>
                                        {deleteUser.isPending ? 'Deleting...' : 'Remove'}
                                    </Button>
                                </li>
                            ))}   
                        </ul>
                    </CardContent>    
                </Card>
            </>
        )
    }
}

export default ListUser