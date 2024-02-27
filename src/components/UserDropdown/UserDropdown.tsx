'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useDiaglog } from '@/zustand/useDialog'
import { Skeleton } from '../ui/skeleton'
import useTranslation from 'next-translate/useTranslation'

const UserDropdown = () => {
    const { data: session, status } = useSession()
    const setOpen = useDiaglog((state: any) => state.setOpen)
    const { t } = useTranslation("common")

    if(status === 'loading') return (
        <Skeleton className="h-9 w-60 gap-2" />
    )

    if(status === 'authenticated') return (
        <div className='flex items-center gap-2 text-sm'>
            <h1>{t("title")}, {session?.user?.email}</h1>
            <Button variant={'outline'} onClick={() => signOut({redirect: false})} size={'sm'} className='h-8'>Logout</Button>
        </div>
    )

    return (
        <Button variant={'default'} onClick={setOpen} className="login-dropdown">Login</Button>
    )
}

export default UserDropdown