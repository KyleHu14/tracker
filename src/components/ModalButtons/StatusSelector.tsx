import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    value:
        | "pending"
        | "interview"
        | "rejected"
        | "assessment"
        | "ghosted"
        | "offer"
        | "accepted"
    onChange: (value: string) => void
}

export default function StatusSelector({ value, onChange }: Props) {
    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger>
                <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="ghosted">Ghosted</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
