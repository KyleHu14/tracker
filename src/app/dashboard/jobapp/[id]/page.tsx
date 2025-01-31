import { getJobApp } from "@/actions"
import JobappDisplay from "@/components/Jobapp/JobappDisplay"
import PageWrapper from "@/components/PageWrapper"

export default async function JobApp({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    const jobData = await getJobApp(id)

    return (
        <PageWrapper className="mt-10">
            <JobappDisplay jobApp={jobData} />
        </PageWrapper>
    )
}
