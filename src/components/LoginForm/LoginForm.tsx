'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormDescription } from "@/components/ui/form"
import InputFormField from '../Input/Input'
import { Button } from "@/components/ui/button"
import { INPUT_REQUIRED_MSG } from '@/constant/constant'
import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,   
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useDiaglog } from '@/zustand/useDialog'

const LoginForm = () => {    
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')  

    const open = useDiaglog((state: any) => state.open)
    const setOpen = useDiaglog((state: any) => state.setOpen)
    
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
        setOpen()
        
        if(result?.error) {
            setError(result?.error)
        }
    }    

    return (
        <>
        <Dialog 
            open={open}
            onOpenChange={setOpen}
        >            
            <DialogContent>                
                <DialogHeader>                    
                    <DialogTitle>Login</DialogTitle>                    
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
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
            </DialogContent>
        </Dialog>
        </>
    )
}

export default LoginForm