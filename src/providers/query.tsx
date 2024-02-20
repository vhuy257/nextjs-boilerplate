'use client'

import React from 'react'
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) => {
            if (error?.request?.status === 401) {
                alert(error + 'error')
            }
        }
    })
})

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}
