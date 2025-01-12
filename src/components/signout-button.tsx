"use client"

import { Button } from "./ui/button"
import { signOut } from "@/app/actions"

export default function SignOutButton() {
    return <Button onClick={async () => signOut()}>Sign Out</Button>
}
