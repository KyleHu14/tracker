interface Props {
    children: React.ReactNode
    className?: string
}

export default function PageWrapper({ children, className }: Props) {
    return <main className={`mx-[17%] ${className}`}>{children}</main>
}
