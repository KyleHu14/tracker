"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"

import { SelectJobApp } from "@/db/schema/job-application"

import { deleteJobApp } from "@/actions"

import EditButton from "../ModalButtons/EditButton"

interface Props {
    jobData: SelectJobApp
}

export default function TableCellActions({ jobData }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <EditButton jobData={jobData} />
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <button
                        className="h-full w-full text-left"
                        onClick={() => deleteJobApp(jobData.id)}
                    >
                        Delete
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
