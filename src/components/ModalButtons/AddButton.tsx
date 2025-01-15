import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import JobAppForm from "./JobAppForm"

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
                <JobAppForm />
            </DialogContent>
        </Dialog>
    )
}
