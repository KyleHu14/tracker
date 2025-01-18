import React from "react"

interface Props {
    children: React.ReactNode
}

export default function Text({ children }: Props) {
    return (
        <p className="max-w-[22ch] overflow-hidden text-ellipsis whitespace-nowrap">
            {children}
        </p>
    )
}
