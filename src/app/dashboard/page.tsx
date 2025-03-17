import PageWrapper from "@/components/PageWrapper"
import { DataTable } from "../../components/DataTable/data-table"
import { columns } from "../../components/DataTable/columns"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

import ModalButton from "@/components/ModalButtons/ModalButton"
import { eq, or, and } from "drizzle-orm"
import { db } from "@/db"
import { job_application } from "@/db/schema/job-application"

import Insights from "@/components/Insights/Insights"
import PaginatedCardGrid from "@/components/PaginatedCardGrid"

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    })

    if (session && session?.user) {
        const userJobApps = await db
            .select()
            .from(job_application)
            .where(eq(job_application.userId, session.user.id))

        const interviewCount = await db
            .select()
            .from(job_application)
            .where(
                and(
                    eq(job_application.userId, session.user.id),
                    eq(job_application.status, "interview"),
                ),
            )

        const pendingCount = await db
            .select()
            .from(job_application)
            .where(
                and(
                    eq(job_application.userId, session.user.id),
                    eq(job_application.status, "pending"),
                ),
            )

        const rejectedAndGhostedCount = await db
            .select()
            .from(job_application)
            .where(
                and(
                    eq(job_application.userId, session.user.id),
                    or(
                        eq(job_application.status, "rejected"),
                        eq(job_application.status, "ghosted"),
                    ),
                ),
            )

        return (
            <PageWrapper>
                <h1 className="text-3xl font-semibold">Your Dashboard</h1>

                <Insights
                    totalApps={userJobApps.length}
                    interviewCount={interviewCount.length}
                    pendingCount={pendingCount.length}
                    rejectedAndGhostedCount={rejectedAndGhostedCount.length}
                />

                <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-0">
                    <h2 className="text-2xl">Job Applications</h2>
                    <ModalButton
                        className="flex h-8 w-28"
                        variant="add"
                        userId={session.user.id}
                    />
                </div>

                <DataTable
                    className="mt-8 hidden lg:block"
                    columns={columns}
                    data={userJobApps}
                />

                <PaginatedCardGrid jobs={userJobApps} itemsPerPage={5} />
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <h1>An Authentication Error has Occured</h1>
        </PageWrapper>
    )
}
