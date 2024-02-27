import { Input } from "@/components/ui/input"
import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

interface FormProps {
    form: any
    inputName: string
    rules: any
    inputLabel: string
    type?: string
    placeholder?: string
}

const InputFormField = ({ form, inputName, inputLabel, rules, type, placeholder }: FormProps) => {
    return (
        <FormField
            control={form.control}
            name={ inputName }
            rules={rules}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {inputLabel}
                    </FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder ?? ""} type={type || "text"} {...field} />
                    </FormControl>            
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default InputFormField