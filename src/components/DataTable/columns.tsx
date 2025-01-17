"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SelectJobApp } from "@/db/schema/job-application"
import TableCellActions from "./TableCellActions"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<SelectJobApp>[] = [
    {
        accessorKey: "title",
        header: "Role Title",
        cell: ({ row }) => {
            return <Link href={row.original.link}>{row.original.title}</Link>
        },
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <div>
                    {String(row.original.status).charAt(0).toUpperCase() +
                        String(row.original.status).slice(1)}
                </div>
            )
        },
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            return <div>{row.original.date.toLocaleDateString("en-US")}</div>
        },
    },
    {
        id: "actions",
        cell: () => {
            return <TableCellActions />
        },
    },
]
