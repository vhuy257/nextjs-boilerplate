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
import { 
    Form, 
    FormField, 
    FormItem,
    FormLabel,
    FormDescription,
    FormControl, 
} from "@/components/ui/form"
import { Button } from '../ui/button';
import InputFormField from '../Input/Input'
import { API_URL, INPUT_REQUIRED_MSG } from '@/constant/constant';
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useArticle from '@/hooks/useArticle';
import { useToast } from '../ui/use-toast';
import { PlusIcon } from "@radix-ui/react-icons"

const CreateArticle = () => {
    const { createArticle } = useArticle()
    const [ open, setOpen ] = useState(false)
    const { toast } = useToast()

    const form = useForm({
        defaultValues: {
            name: null,
            email: null,
            password: null,
            published: false
        },
    })

    const onSubmit = (data: any) => {
        createArticle.mutate({
            url: API_URL.ARTICLE, 
            user: data
        })
    }

    useEffect(() => {
        if(createArticle.isSuccess) {
            setOpen(false)
        }

        if(createArticle.isError) {
            toast({
                description: createArticle.error.message,
                variant: 'destructive'
            })
        }
    }, [createArticle.isSuccess, createArticle.isError])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size={'sm'} className='gap-2'>
                    <PlusIcon/> Create Article
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>                    
                    <DialogTitle>Create Article</DialogTitle>                    
                </DialogHeader>
                <div className="create-user">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
                            <InputFormField 
                                form={form} 
                                inputName={'title'} 
                                inputLabel={'Title'} 
                                rules={{
                                    required: INPUT_REQUIRED_MSG,                        
                                }}
                                placeholder='Title'
                            />
                            <InputFormField 
                                form={form} 
                                inputName={'description'} 
                                inputLabel={'Description'} 
                                placeholder='Description'
                                rules={{
                                    required: INPUT_REQUIRED_MSG,                        
                                }}
                            />
                            <InputFormField 
                                form={form} 
                                inputName={'body'} 
                                inputLabel={'Body'}
                                placeholder='Body'
                                rules={{
                                    required: INPUT_REQUIRED_MSG,                        
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="published"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Publish this article</FormLabel>
                                            <FormDescription>
                                            Click to publishing this article
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            aria-readonly
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={createArticle.isPending} size={'sm'}>
                                {createArticle.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateArticle
