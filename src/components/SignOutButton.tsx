"use client"

import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

interface Props {
    children: React.ReactNode
    className?: string
}

export default function SignOutButton({ children, className }: Props) {
    const router = useRouter()
    return (
        <button
            className={`w-full text-left ${className}`}
            onClick={async () => {
                await signOut({
                    fetchOptions: {
                        onSuccess() {
                            router.push("/")
                            router.refresh()
                        },
                    },
                })
            }}
        >
            {children}
        </button>
    )
}
