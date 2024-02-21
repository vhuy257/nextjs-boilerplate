'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { baseKy } from '@/helper/auth'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status }: any = useSession();
    
    useEffect(() => {
        if(status === 'authenticated') {
            baseKy.extend({
                hooks: {
                    beforeRequest: [
                        request => {
                            request.headers.set('Authorization', `Bearer ${session?.user?.accessToken}`)
                        }
                    ]
                }
            })
        }
    }, [status, session])

    return (
        <main>
            {children}
        </main>
    )
}

export default Layout