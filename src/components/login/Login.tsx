'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Form, FormDescription } from "@/components/ui/form"
import InputFormField from '../input/Input'
import { INPUT_REQUIRED_MSG } from '@/constant/constant'
import { signIn, signOut, useSession } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { Loader2 } from "lucide-react"

const LoginForm = () => {
    const {data: session, status} = useSession()
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState('')

    const form = useForm({
        defaultValues: {
          email: null,
          password: null
        },
    })

    const callbackUrl = useSearchParams() ?? "/";

    const onSubmit = async (data: any) => {
        setLoading(true)

        const result = await signIn("loginCustom", {
            ...data,
            redirect: false,
            callbackUrl: callbackUrl
        })
        
        setLoading(false)

        if(result?.error) {
            setError(result?.error)
        }
    }

    if(status === 'loading') return 'Loading...'

    if(status === 'authenticated') return (
        <div className='flex items-center gap-2'>
            <h1>{session?.user?.email}</h1>
            <Button onClick={() => signOut({redirect: false})}>Logout</Button>
        </div>
    )

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <InputFormField 
                    form={form} 
                    inputName={'email'} 
                    inputLabel={'Email'} 
                    rules={{
                        required: INPUT_REQUIRED_MSG,                        
                    }}
                />
                <InputFormField 
                    form={form} 
                    inputName={'password'} 
                    inputLabel={'Password'} 
                    type="password"
                    rules={{
                        required: INPUT_REQUIRED_MSG,                        
                    }}
                />
                <FormDescription className='text-red-500'>{error}</FormDescription>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm