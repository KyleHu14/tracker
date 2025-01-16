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
            <DialogContent className="max-h-[98%] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add an Application</DialogTitle>
                    <DialogDescription>
                        Track a job application by filling out its information
                        below.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto px-2">
                    <JobAppForm />
                </div>
            </DialogContent>
        </Dialog>
    )
}
