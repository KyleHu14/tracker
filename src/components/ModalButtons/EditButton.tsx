"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { SelectJobApp } from "@/db/schema/job-application"
import { Button } from "../ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { JobAppFormData, JobAppFormSchema } from "./JobAppSchema"
import { Input } from "../ui/input"
import StatusSelector from "./StatusSelector"

import { updateJobApps } from "@/actions"
interface Props {
    jobData: SelectJobApp
}

export default function EditButton({ jobData }: Props) {
    const form = useForm<JobAppFormData>({
        resolver: zodResolver(JobAppFormSchema),
        defaultValues: {
            title: jobData.title,
            company: jobData.company,
            location: jobData.location,
            status: jobData.status,
            link: jobData.link,
            date: jobData.date.toLocaleDateString("en-CA"),
        },
    })

    function onSubmit(data: JobAppFormData) {
        // console.log(updateData)

        updateJobApps(data, jobData.id, jobData.userId)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className="w-full cursor-pointer">Edit</p>
            </DialogTrigger>
            <DialogContent
                className="max-h-[98%] sm:max-w-[425px]"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
            >
                <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogDescription>
                        Edit an existing Job Application
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto p-3">
                    <Form {...form}>
                        <form
                            id="edit-job-form"
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
                    <DialogClose asChild>
                        <Button form="edit-job-form" type="submit">
                            Edit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
