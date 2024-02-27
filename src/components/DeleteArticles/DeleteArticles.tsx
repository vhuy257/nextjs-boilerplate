import React from 'react'
import { Button } from '../ui/button'
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}
  
export default function DeleteArticles<TData> ({
    table,
}: DataTablePaginationProps<TData>) {
    return (
        <Button variant={'destructive'} size={'sm'}>
            Remove ({table.getFilteredSelectedRowModel().rows.length})
        </Button>
    )
}