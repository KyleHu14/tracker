"use client"

import { ArrowLeft, Edit2, Trash2 } from "lucide-react"
import { SelectJobApp } from "@/db/schema/job-application"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { deleteJobApp } from "@/actions"

import JobappDetails from "./JobappDetails"
import JobappForm from "./JobappForm"

import { Button } from "../ui/button"

interface Props {
    jobApp: SelectJobApp
}

export default function JobappDisplay({ jobApp }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    async function handleDelete() {
        try {
            setIsDeleting(true)
            await deleteJobApp(jobApp.id)
            toast({
                title: "Job application deleted successfully",
                description: "Redirecting to dashboard..",
            })
            router.push("/dashboard")
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    variant: "destructive",
                    description: `Something went wrong. ${error.message}`,
                })
            } else {
                toast({
                    variant: "destructive",
                    description: "Something went wrong. Please try again.",
                })
            }
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="mx-auto max-w-[800px]">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="size-4" />
                            <span className="sr-only">
                                Back to applications
                            </span>
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Application Details</h1>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {!isEditing ? (
                            <>
                                <Edit2 className="size-4" />
                                Edit
                            </>
                        ) : (
                            <>Cancel edit</>
                        )}
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        <Trash2 className="size-4" />
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>

            {isEditing ? (
                <JobappForm jobApp={jobApp} setEdit={setIsEditing} />
            ) : (
                <JobappDetails jobApp={jobApp} setEdit={setIsEditing} />
            )}
        </div>
    )
}
