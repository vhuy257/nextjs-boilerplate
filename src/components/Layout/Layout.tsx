'use client'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"

const Layout = ({ children }: { children: React.ReactNode }) => {    
    return (
        <main>
            {children}
            <Toaster />
        </main> 
    )
}

export default Layout