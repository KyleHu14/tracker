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

import ModalButton from "../ModalButtons/ModalButton"

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

                <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
                    <ModalButton
                        className="hover:bg-accent"
                        variant="edit"
                        initialData={jobData}
                    />
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <button
                        className="h-full w-full cursor-pointer text-left"
                        onClick={() => deleteJobApp(jobData.id)}
                    >
                        Delete
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
