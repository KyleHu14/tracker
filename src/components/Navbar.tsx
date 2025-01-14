import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import Image from "next/image"
import SignOutButton from "./SignOutButton"
import SignInButton from "./SignInButton"

export default async function Navbar() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    })

    return (
        <nav className="sticky top-0 flex items-center justify-between border-b border-b-gray-800 px-[20%] py-4">
            <Link className="text-xl font-semibold" href="/">
                Tracker
            </Link>

            {!session ? (
                <SignInButton>Sign In</SignInButton>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        {session.user.image ? (
                            <Image
                                src={session.user.image}
                                alt="User profile picture"
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                        ) : (
                            session.user.name
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                            <SignOutButton className="px-2 py-1.5">
                                Sign Out
                            </SignOutButton>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </nav>
    )
}
