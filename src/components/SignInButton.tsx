"use client"

import { signIn } from "@/lib/auth-client"
import { Button } from "./ui/button"

interface Props {
    children: React.ReactNode
    className?: string
}

export default function SignInButton({ children, className }: Props) {
    const signInGoogle = async () => {
        const data = await signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        })
    }

    return (
        <Button
            variant="outline"
            className={`${className}`}
            onClick={async () => {
                await signInGoogle()
            }}
        >
            {children}
        </Button>
    )
}
