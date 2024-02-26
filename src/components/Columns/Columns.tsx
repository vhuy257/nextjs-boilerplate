"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Switch } from "../ui/switch"
import { DataTableColumnHeader } from "../DataTable/data-table-row-header"
import { DataTableRowActions } from "../DataTable/data-table-row-actions"

export type Article = {
  id: number
  title: number
  description: string
  name: string
  email: string
}

export const columns: ColumnDef<Article>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center space-x-2">
                <Checkbox
                    checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Id" />
        )        
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        )       
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        )       
    },  
    {
        id: "published",
        header: "Published",
        cell: ({ row }) => (
            <div className="flex items-center space-x-2 pointer-events-none">
                <Switch id="airplane-mode" checked={row?.getValue("published")}/>
            </div>
        )
    },
    {
        header: "Action",
        cell:  ({ row }) => <DataTableRowActions row={row} />
    }
]
