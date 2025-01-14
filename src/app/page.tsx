import LoginForm from "@/components/LoginForm"

import Link from "next/link"
import { ClipboardCheck } from "lucide-react"
import PageWrapper from "@/components/PageWrapper"

export default function Home() {
    return (
        <PageWrapper className="mt-[-3.5rem] flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <ClipboardCheck className="size-4" />
                    </div>
                    Tracker
                </Link>
                <LoginForm />
            </div>
        </PageWrapper>
    )
}
