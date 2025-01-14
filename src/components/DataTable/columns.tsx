"use client"

import { ColumnDef } from "@tanstack/react-table"
import TableCellActions from "./TableCellActions"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type JobApplication = {
    id: string
    title: string
    location: string
    status: "pending" | "interview" | "offer" | "rejected" | "ghosted"
    date: string
    link: string
}

export const columns: ColumnDef<JobApplication>[] = [
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
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <TableCellActions />
        },
    },
]
