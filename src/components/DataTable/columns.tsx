"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SelectJobApp } from "@/db/schema/job-application"
import TableCellActions from "./TableCellActions"
import Link from "next/link"
import Text from "./Text"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<SelectJobApp>[] = [
    {
        accessorKey: "title",
        header: "Role Title",
        cell: ({ row }) => {
            return (
                <Link href={row.original.link}>
                    <Text>{row.original.title}</Text>
                </Link>
            )
        },
    },
    {
        accessorKey: "company",
        header: "Company",
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            return <Text>{row.original.location}</Text>
        },
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div>{row.original.date.toLocaleDateString("en-US")}</div>
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <TableCellActions jobData={row.original} />
        },
    },
]
