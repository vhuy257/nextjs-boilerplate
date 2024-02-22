'use client';
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { Form } from "@/components/ui/form"
//import { PasswordInput } from "@/components/ui/input-password";
import { Button } from '../ui/button';
import InputFormField from '../Input/Input'
import { API_URL, INPUT_REQUIRED_MSG } from '@/constant/constant';
import { Loader2 } from "lucide-react"
import useCreateUser from '@/hooks/useUser';

const CreateUser = () => {
    const { createUser } = useCreateUser()
    const [ open, setOpen ] = useState(false)

    const form = useForm({
        defaultValues: {
            name: null,
            email: null,
            password: null
        },
    })

    const onSubmit = (data: any) => {
        createUser.mutate({
            url: API_URL.USER, 
            user: data
        })
    }

    useEffect(() => {
        if(createUser.isSuccess) {
            setOpen(false)
        }
    }, [createUser.isSuccess])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>                    
                    <DialogTitle>Create new user</DialogTitle>                    
                </DialogHeader>
                <div className="create-user">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
                            <InputFormField 
                                form={form} 
                                inputName={'name'} 
                                inputLabel={'Name'} 
                                rules={{
                                    required: INPUT_REQUIRED_MSG,                        
                                }}
                            />
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
                            <Button type="submit" disabled={createUser.isPending}>
                                {createUser.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateUser