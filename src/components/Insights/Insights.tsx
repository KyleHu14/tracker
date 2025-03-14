import { Clock, FileText, UserRound, XCircle } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"

interface Props {
    totalApps: number
    interviewCount: number
    pendingCount: number
    rejectedAndGhostedCount: number
}

export default function Insights({
    totalApps,
    interviewCount,
    pendingCount,
    rejectedAndGhostedCount,
}: Props) {
    return (
        <div className="mt-5">
            <h2 className="text-2xl">Insights</h2>

            <div className="mt-5 flex gap-5">
                <Card className="dark:bg-card/50 w-full">
                    <CardHeader>
                        <CardDescription>Total Applications</CardDescription>
                        <CardTitle className="text-3xl">{totalApps}</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-muted-foreground flex items-center text-sm">
                            <FileText className="text-primary mr-1 h-4 w-4" />
                            <span>All time applications</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="dark:bg-card/50 w-full">
                    <CardHeader>
                        <CardDescription>Interviews</CardDescription>
                        <CardTitle className="text-3xl">
                            {interviewCount}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-muted-foreground flex items-center text-sm">
                            <UserRound className="mr-1 h-4 w-4 text-green-600 dark:text-green-500" />

                            <span>Active Interviews</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="dark:bg-card/50 w-full">
                    <CardHeader>
                        <CardDescription>Pending</CardDescription>
                        <CardTitle className="text-3xl">
                            {pendingCount}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-muted-foreground flex items-center text-sm">
                            <Clock className="mr-1 h-4 w-4 text-amber-600 dark:text-amber-500" />
                            <span>Awaiting Response</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="dark:bg-card/50 w-full">
                    <CardHeader>
                        <CardDescription>Rejected/Ghosted</CardDescription>
                        <CardTitle className="text-3xl">
                            {rejectedAndGhostedCount}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-muted-foreground flex items-center text-sm">
                            <XCircle className="mr-1 h-4 w-4 text-red-600 dark:text-red-500" />
                            <span>No longer active</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
