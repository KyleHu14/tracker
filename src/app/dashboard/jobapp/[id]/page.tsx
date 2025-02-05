import JobappDisplay from "@/components/Jobapp/JobappDisplay"
import PageWrapper from "@/components/PageWrapper"
import { db } from "@/db"
import { job_application } from "@/db/schema/job-application"
import { eq } from "drizzle-orm"

export default async function JobApp({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    const data = await db
        .select()
        .from(job_application)
        .where(eq(job_application.id, id))
        .limit(1)

    return (
        <PageWrapper className="mt-10">
            <JobappDisplay jobApp={data[0]} />
        </PageWrapper>
    )
}
