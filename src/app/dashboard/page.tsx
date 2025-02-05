import PageWrapper from "@/components/PageWrapper"
import { DataTable } from "../../components/DataTable/data-table"
import { columns } from "../../components/DataTable/columns"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

import ModalButton from "@/components/ModalButtons/ModalButton"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { job_application } from "@/db/schema/job-application"

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    })

    if (session && session?.user) {
        const data = await db
            .select()
            .from(job_application)
            .where(eq(job_application.userId, session.user.id))

        return (
            <PageWrapper className="mt-10">
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-semibold">
                        Your Applications
                    </h1>
                    <ModalButton
                        className="h-8 w-28"
                        variant="add"
                        userId={session.user.id}
                    />
                </div>

                <DataTable className="mt-8" columns={columns} data={data} />
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <h1>An Authentication Error has Occured</h1>
        </PageWrapper>
    )
}
