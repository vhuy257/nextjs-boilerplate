'use client'
import React, { useEffect } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {    
    return (
        <main>
            {children}
        </main>
    )
}

export default Layout