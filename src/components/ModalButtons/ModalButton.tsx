"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import StatusSelector from "./StatusSelector"
import { JobAppFormData, JobAppFormSchema } from "./JobAppSchema"
import { createJobApp } from "@/actions"
import { useSession } from "@/lib/auth-client"
import { useState } from "react"
import { SelectJobApp } from "@/db/schema/job-application"

interface Props {
    className?: string
    initialData: SelectJobApp
    variant: "edit" | "add"
}

export default function ModalButton({
    className,
    initialData,
    // variant,
}: Props) {
    const [open, setOpen] = useState(false)

    // const formText = {"edit" : {}, }

    const session = useSession()

    const form = useForm<JobAppFormData>({
        resolver: zodResolver(JobAppFormSchema),
        defaultValues: {
            title: initialData.title,
            company: initialData.company,
            location: initialData.location,
            status: initialData.status,
            link: initialData.link,
            date: initialData.date.toLocaleDateString("en-CA"),
        },
    })

    async function onSubmit(data: JobAppFormData) {
        await form.trigger()
        if (session.data && form.formState.isValid) {
            createJobApp(data, session.data?.user.id)
            setOpen(false)
            form.clearErrors()
            form.reset()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                <div className="overflow-y-auto p-3">
                    <Form {...form}>
                        <form
                            id="add-job-form"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="SE Intern"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company</FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder="Amazon"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder="California"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <StatusSelector
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                type="date"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="jobboard.com"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button form="add-job-form" type="submit">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
