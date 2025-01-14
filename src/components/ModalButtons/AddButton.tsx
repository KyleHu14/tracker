import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FieldContainer from "./FieldContainer"
import FieldLabel from "./FieldLabel"

interface Props {
    className?: string
}

export default function AddButton({ className }: Props) {
    return (
        <Dialog>
            <DialogTrigger className={className} asChild>
                <Button>Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-h-[75%] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add an Application</DialogTitle>
                    <DialogDescription>
                        Track a job application by filling out its information
                        below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FieldContainer>
                        <FieldLabel htmlFor="title">Title</FieldLabel>

                        <Input
                            id="title"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <Input
                            id="location"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </FieldContainer>
                </div>
                <DialogFooter>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
