import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"

import { Badge } from "../ui/badge"

import { Dispatch, SetStateAction } from "react"
import { SelectJobApp } from "@/db/schema/job-application"
import Link from "next/link"
import {
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    MapPin,
    XCircle,
    Link as ExternalLink,
} from "lucide-react"

interface Props {
    setEdit: Dispatch<SetStateAction<boolean>>
    jobApp: SelectJobApp
}

const statusConfig: Record<
    SelectJobApp["status"],
    { className: string; icon: React.ElementType }
> = {
    interview: {
        className: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
        icon: Calendar,
    },
    pending: {
        className: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
        icon: Clock,
    },
    accepted: {
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        icon: CheckCircle2,
    },
    rejected: {
        className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
        icon: XCircle,
    },
    assessment: {
        className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        icon: Clock,
    },
    ghosted: {
        className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
        icon: XCircle,
    },
    offer: {
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        icon: CheckCircle2,
    },
}

export default function JobappDetails({ jobApp }: Props) {
    const StatusIcon = statusConfig[jobApp.status].icon

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-2xl font-semibold">
                    <span>{jobApp.title}</span>
                    <Badge
                        className={`${statusConfig[jobApp.status].className} rounded-2xl py-1`}
                    >
                        <StatusIcon className="mr-1 size-4" />
                        <span className="font-semibold">
                            {jobApp.status.toUpperCase()}
                        </span>
                    </Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <Building2 className="text-muted-foreground" />
                    <span className="text-xl">{jobApp.company}</span>
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                        <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                            Location
                        </h3>
                        <p className="flex items-center">
                            <MapPin className="text-muted-foreground mr-2 size-4" />
                            {jobApp.location}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                            Applied On
                        </h3>
                        <p className="flex items-center">
                            <Calendar className="text-muted-foreground mr-2 size-4" />
                            {jobApp.date.toLocaleDateString("en-US")}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                            Job Link
                        </h3>
                        {jobApp.link ? (
                            <Link
                                href={jobApp.link}
                                className="text-primary flex items-center hover:underline"
                            >
                                <ExternalLink className="mr-2 size-4" />
                                View Job Posting
                            </Link>
                        ) : (
                            <p className="text-muted-foreground">N/A</p>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-medium">Notes</h3>
                    <div className="bg-muted/50 mt-2 rounded-md border p-3">
                        {!jobApp.notes
                            ? "-"
                            : jobApp.notes.split("\n").map((line, index) => (
                                  <p key={index}>
                                      {line}
                                      <br />
                                  </p>
                              ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
