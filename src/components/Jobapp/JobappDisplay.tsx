"use client"

import { Link as LucideLink } from "lucide-react"
import { SelectJobApp } from "@/db/schema/job-application"
import Link from "next/link"
import { useState } from "react"

import JobappDetails from "./JobappDetails"
import JobappForm from "./JobappForm"

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
                <h2 className="text-xl text-zinc-400">
                    {jobApp.company} | Applied :{" "}
                    {jobApp.date.toLocaleDateString("en-US")}
                </h2>
            </div>

            {isEditing ? (
                <JobappForm jobApp={jobApp} setEdit={setIsEditing} />
            ) : (
                <JobappDetails jobApp={jobApp} setEdit={setIsEditing} />
            )}
        </>
    )
}
