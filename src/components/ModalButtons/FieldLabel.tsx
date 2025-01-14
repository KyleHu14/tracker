import { Label } from "../ui/label"

interface Props {
    children: React.ReactNode
    htmlFor: string
}

export default function FieldLabel({ children, htmlFor }: Props) {
    return (
        <Label className="font-semibold" htmlFor={htmlFor}>
            {children}
        </Label>
    )
}
