import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import Image from "next/image"
import SignOutButton from "./SignOutButton"
import SignInButton from "./SignInButton"
import HomeButton from "./HomeButton"
import Link from "next/link"

export default async function Navbar() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    })

    return (
        <nav className="bg-background sticky top-0 flex items-center justify-between border-b border-b-zinc-300 px-[8%] py-4 md:px-[17%] dark:border-b-zinc-800">
            <div className="flex items-center gap-5">
                <HomeButton href={session ? "/dashboard" : "/"} />
                <Link className="hover:text-blue-400" href="/changelog">
                    Changelog
                </Link>
            </div>

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
                            <SignOutButton className="cursor-pointer px-2 py-1.5">
                                Sign Out
                            </SignOutButton>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </nav>
    )
}
