import { Input } from "@/components/ui/input"
import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const InputFormField = ({ form, inputName, inputLabel, rules, type }: any) => {
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
                        <Input placeholder="shadcn" type={type || "text"} {...field} />
                    </FormControl>            
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default InputFormField