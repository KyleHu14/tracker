import PageWrapper from "@/components/PageWrapper"
import { DataTable } from "../../components/DataTable/data-table"
import { columns } from "../../components/DataTable/columns"
import AddButton from "@/components/ModalButtons/AddButton"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

import { getUserJobApps } from "@/actions"

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
                    <AddButton className="h-8 w-28" />
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
