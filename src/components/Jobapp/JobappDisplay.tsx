"use client"

import { Link as LucideLink, SquarePen } from "lucide-react"
import { SelectJobApp } from "@/db/schema/job-application"
import Link from "next/link"
import { useState } from "react"

interface Props {
    jobApp: SelectJobApp
}

export default function JobappDisplay({ jobApp }: Props) {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <>
            <div className="border-b pb-2">
                <h1 className="flex items-center gap-3 text-3xl font-medium">
                    <p>{jobApp.title}</p>
                    {jobApp.link && (
                        <Link href={jobApp.link}>
                            <LucideLink className="hover:text-blue-700" />
                        </Link>
                    )}
                </h1>
                <h2 className="text-xl text-zinc-700">{jobApp.company}</h2>
            </div>

            <div>
                <h2 className="mt-5 flex items-center gap-3 text-2xl">
                    <p>Job Details</p>

                    <SquarePen
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => setIsEditing(false)}
                    />
                </h2>
                <div className="mt-3 flex gap-5">
                    <div>
                        <h4 className="text-xl">Location</h4>
                        <p className="text-lg">{jobApp.location}</p>
                    </div>
                    <div>
                        <h4 className="text-xl">Status</h4>
                        <p className="text-lg">{jobApp.status}</p>
                    </div>
                </div>

                <div className="mt-3">
                    <h4 className="text-xl">Notes</h4>
                    <p>{jobApp.notes}</p>
                </div>
            </div>
        </>
    )
}
