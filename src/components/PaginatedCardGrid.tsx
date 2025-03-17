"use client"

import { SelectJobApp } from "@/db/schema/job-application"
import { useState } from "react"
import JobCard from "./JobCard"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginatedCardGridProps {
    jobs: SelectJobApp[]
    itemsPerPage?: number
}

export default function PaginatedCardGrid({
    jobs,
    itemsPerPage = 6, // Default to 6 items per page
}: PaginatedCardGridProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(jobs.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentJobs = jobs.slice(startIndex, endIndex)

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    const previousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    return (
        <div className="mt-10 space-y-4 lg:hidden">
            <div className="grid grid-cols-1 gap-4">
                {currentJobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-2 flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={previousPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="text-muted-foreground text-sm">
                        {currentPage} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}
