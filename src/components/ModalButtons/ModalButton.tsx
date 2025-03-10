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

import { useToast } from "@/hooks/use-toast"

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
import { createJobApp, updateJobApps } from "@/actions"
import { useState } from "react"
import { SelectJobApp } from "@/db/schema/job-application"

import { Loader } from "lucide-react"
import { Textarea } from "../ui/textarea"

interface Props {
    className?: string
    initialData?: SelectJobApp
    variant: "edit" | "add"
    userId?: string
}

export default function ModalButton({
    className,
    initialData,
    variant,
    userId,
}: Props) {
    const { toast } = useToast()
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const formText = {
        edit: {
            title: "Edit",
            description: "Edit an existing Job Application",
            triggerText: "Edit",
            submitText: "Save Changes",
            toastText: "Changes saved!",
        },
        add: {
            title: "Add a Job Application",
            description:
                "Track a job application by filling out its information below.",
            triggerText: "Add",
            submitText: "Create",
            toastText: "Created a job application!",
        },
    }

    const form = useForm<JobAppFormData>({
        resolver: zodResolver(JobAppFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            company: initialData?.company || "",
            location: initialData?.location || "",
            status: initialData?.status || "pending",
            link: initialData?.link || "",
            date:
                initialData?.date.toLocaleDateString("en-CA") ||
                new Date().toLocaleDateString("en-CA"),
            notes: initialData?.notes || "",
        },
    })

    async function onSubmit(data: JobAppFormData) {
        setLoading(true)
        if (variant === "add" && userId) {
            await createJobApp(data, userId)
        } else if (initialData) {
            await updateJobApps(data, initialData.id, initialData.userId)
        }

        setLoading(false)
        setOpen(false)
        toast({
            // title: "Success!",
            description: formText[variant].toastText,
        })
        form.clearErrors()
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={className} asChild>
                {variant === "add" ? (
                    <Button>{formText[variant].triggerText}</Button>
                ) : (
                    <p className="w-full cursor-pointer">
                        {formText[variant].triggerText}
                    </p>
                )}
            </DialogTrigger>
            <DialogContent
                className="max-h-[98%] sm:max-w-[425px]"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
            >
                <DialogHeader>
                    <DialogTitle>{formText[variant].title}</DialogTitle>
                    <DialogDescription>
                        {formText[variant].description}
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto p-3">
                    <Form {...form}>
                        <form
                            id="add-job-form"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                            autoComplete="off"
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
                                            <FormLabel>
                                                Office Location
                                            </FormLabel>
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

                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Notes, login info, anything!"
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
                        {formText[variant].submitText}
                        {isLoading && (
                            <Loader className="h-12 w-12 animate-spin" />
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
