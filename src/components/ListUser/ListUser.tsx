'use client'
import React from 'react'
import useGet from '@/hooks/useGetWithAuth'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const ListUser = () => {
    const { mutation } = useGet()

    if(mutation.isPending) return 'Loading user...'

    if(mutation.isSuccess) {
        return (
            <>
                <Card className="w-[350px] mt-8">
                    <CardHeader>
                        <CardTitle>List Users</CardTitle>
                        <CardDescription>Only show when user logged in already.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            {mutation?.data.map((k: any, key: number) => (
                                <li key={key}>{k.name}</li>
                            ))}   
                        </ul>
                    </CardContent>    
                </Card>
            </>
        )
    }
}

export default ListUser