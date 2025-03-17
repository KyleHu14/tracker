import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SelectJobApp } from "@/db/schema/job-application"
import Link from "next/link"

interface JobCardProps {
    className?: string
    job: SelectJobApp
}

export default function JobCard({ job, className }: JobCardProps) {
    return (
        <Link href={`/dashboard/jobapp/${job.id}`}>
            <Card className={className}>
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}
