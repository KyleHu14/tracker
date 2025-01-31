import PageWrapper from "@/components/PageWrapper"
import { DataTable } from "../../components/DataTable/data-table"
import { columns } from "../../components/DataTable/columns"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

import { getUserJobApps } from "@/actions"

import ModalButton from "@/components/ModalButtons/ModalButton"

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    })

    if (session && session.user) {
        const userJobApps = await getUserJobApps(session?.user.id)

        return (
            <PageWrapper className="mt-10">
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-semibold">
                        Your Applications
                    </h1>
                    <ModalButton className="h-8 w-28" variant="add" />
                </div>

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
