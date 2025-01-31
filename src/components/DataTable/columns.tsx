"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SelectJobApp } from "@/db/schema/job-application"
import TableCellActions from "./TableCellActions"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

const baseUrl = "/dashboard/jobapp/"

export const columns: ColumnDef<SelectJobApp>[] = [
    {
        accessorKey: "title",
        header: "Role Title",
        cell: ({ row }) => {
            return (
                <Link
                    href={`${baseUrl}${row.original.id}`}
                    className="-mx-4 -my-4 block px-4 py-4"
                >
                    {row.original.title}
                </Link>
            )
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => {
            return (
                <Link
                    href={`${baseUrl}${row.original.id}`}
                    className="-mx-4 -my-4 block px-4 py-4"
                >
                    {row.original.company}
                </Link>
            )
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            return (
                <Link
                    href={`${baseUrl}${row.original.id}`}
                    className="-mx-4 -my-4 block px-4 py-4"
                >
                    {row.original.location}
                </Link>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <Link
                    href={`${baseUrl}${row.original.id}`}
                    className="-mx-4 -my-4 block px-4 py-4"
                >
                    {String(row.original.status).charAt(0).toUpperCase() +
                        String(row.original.status).slice(1)}
                </Link>
            )
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    className="m-0 p-0 py-0 text-left"
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
            return (
                <Link
                    href={`${baseUrl}${row.original.id}`}
                    className="-mx-4 -my-4 block px-4 py-4"
                >
                    {row.original.date.toLocaleDateString("en-US")}
                </Link>
            )
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
