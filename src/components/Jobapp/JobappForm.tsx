import { SelectJobApp } from "@/db/schema/job-application"
import { useToast } from "@/hooks/use-toast"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { JobAppFormData, JobAppFormSchema } from "../ModalButtons/JobAppSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateJobApps } from "@/actions"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import StatusSelector from "../ModalButtons/StatusSelector"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"

interface Props {
    jobApp: SelectJobApp
    setEdit: Dispatch<SetStateAction<boolean>>
}

export default function JobappForm({ jobApp, setEdit }: Props) {
    const { toast } = useToast()
    const [isLoading, setLoading] = useState(false)

    const form = useForm<JobAppFormData>({
        resolver: zodResolver(JobAppFormSchema),
        defaultValues: {
            title: jobApp?.title || "",
            company: jobApp?.company || "",
            location: jobApp?.location || "",
            status: jobApp?.status || "pending",
            link: jobApp?.link || "",
            date:
                jobApp?.date.toLocaleDateString("en-CA") ||
                new Date().toLocaleDateString("en-CA"),
            notes: jobApp?.notes || "",
        },
    })

    async function onSubmit(data: JobAppFormData) {
        // console.log(data)
        await form.trigger()
        if (form.formState.isValid) {
            // prettier-ignore
            setLoading(true)

            await updateJobApps(data, jobApp.id, jobApp.userId)

            setLoading(false)
            toast({
                // title: "Success!",
                description: "Edit Success!",
            })
            form.clearErrors()
            form.reset()
            setEdit(false)
        }
    }

    return (
        <Form {...form}>
            <h3 className="mb-3 mt-5 text-xl font-semibold">
                Edit Job Application
            </h3>
            <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
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
                            <FormItem className="flex-1">
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
                            <FormItem className="flex-1">
                                <FormLabel>Office Location</FormLabel>
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
                                <Input required type="date" {...field} />
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
                <div className="mt-5 flex gap-3">
                    <Button onClick={() => setEdit(false)}>Cancel</Button>
                    <Button type="submit">
                        Edit
                        {isLoading && (
                            <Loader className="h-12 w-12 animate-spin" />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
