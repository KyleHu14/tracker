"use client"

import Link from "next/link"

interface Props {
    href: string
}

export default function HomeButton({ href }: Props) {
    return (
        <Link className="text-xl font-semibold" href={href}>
            Tracker
        </Link>
    )
}
