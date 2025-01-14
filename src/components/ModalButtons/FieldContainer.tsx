interface Props {
    children: React.ReactNode
}

export default function FieldContainer({ children }: Props) {
    return <div className="flex flex-col gap-3">{children}</div>
}
