interface Props {
    children: React.ReactNode
    className?: string
}

export default function PageWrapper({ children, className }: Props) {
    return (
        <main
            className={`mx-[8%] pt-10 pb-10 md:mx-[17%] 2xl:pt-20 ${className}`}
        >
            {children}
        </main>
    )
}
