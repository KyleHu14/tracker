import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"

import { createClient } from "@/utils/supabase/server"
import { Button } from "./ui/button"
import Image from "next/image"
import SignOutButton from "./signout-button"

export default async function Navbar() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    return (
        <Menubar className="flex justify-between px-[20%] py-7">
            <Link className="text-2xl font-semibold" href="/">
                Tracker
            </Link>

            {data?.user && !error ? (
                <MenubarMenu>
                    <MenubarTrigger>
                        <Image
                            className="rounded-full"
                            src={data.user.user_metadata.avatar_url}
                            alt="User profile icon"
                            width={35}
                            height={35}
                        />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Profile</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <SignOutButton />
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            ) : (
                <Button>Login</Button>
            )}
        </Menubar>
    )
}
