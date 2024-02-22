'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const UserDropdown = () => {
    const {data: session, status} = useSession()

    if(status === 'loading') return 'Loading...'

    if(status === 'authenticated') return (
        <div className='flex items-center gap-2'>
            <h1>{session?.user?.email}</h1>
            <Button onClick={() => signOut({redirect: false})}>Logout</Button>
        </div>
    )

    return (
        <Button variant={'default'}>Login</Button>
    )
}

export default UserDropdown