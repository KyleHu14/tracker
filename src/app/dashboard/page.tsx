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
            <PageWrapper className="pt-10">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <h1 className="text-3xl font-semibold">
                        Your Applications
                    </h1>
                    <ModalButton
                        className="!hidden h-8 w-28 md:block"
                        variant="add"
                        userId={session.user.id}
                    />
                </div>

                <Insights
                    totalApps={userJobApps.length}
                    interviewCount={interviewCount.length}
                    pendingCount={pendingCount.length}
                    rejectedAndGhostedCount={rejectedAndGhostedCount.length}
                />

                <DataTable
                    className="mt-8"
                    columns={columns}
                    data={userJobApps}
                />
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <h1>An Authentication Error has Occured</h1>
        </PageWrapper>
    )
}
