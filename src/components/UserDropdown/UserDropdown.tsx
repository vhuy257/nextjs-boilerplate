'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useDiaglog } from '@/zustand/useDialog'
import { Skeleton } from '../ui/skeleton'

const UserDropdown = () => {
    const { data: session, status } = useSession()
    const setOpen = useDiaglog((state: any) => state.setOpen)

    if(status === 'loading') return (
        <Skeleton className="h-8 w-60" />
    )

    if(status === 'authenticated') return (
        <div className='flex items-center gap-2'>
            <h1>{session?.user?.email}</h1>
            <Button onClick={() => signOut({redirect: false})}>Logout</Button>
        </div>
    )

    return (
        <Button variant={'default'} onClick={setOpen} className="login-dropdown">Login</Button>
    )
}

export default UserDropdown