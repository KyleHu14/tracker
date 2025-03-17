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
import { Card, CardContent } from "../ui/card"

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

    return (
        <Card>
            <CardContent className="p-6">
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* ROW 1 : Title & Status */}
                        <div className="flex justify-between">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="max-w-[250px]">
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
                        </div>

                        {/* ROW 2 : Company */}
                        <div>
                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem className="max-w-[216px]">
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
                        </div>

                        {/* ROW 3 : Locaion & Date & Link */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                        </div>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[150px]"
                                            placeholder="Notes, login info, anything!"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-5 flex justify-end gap-3">
                            <Button
                                variant="destructive"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                Save Changes
                                {isLoading && (
                                    <Loader className="h-12 w-12 animate-spin" />
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
