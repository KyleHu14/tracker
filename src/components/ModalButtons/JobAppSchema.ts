import { z } from "zod"

export const JobAppFormSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Title must be at least 2 characters." })
        .nonempty({ message: "Title is required." }),
    company: z
        .string()
        .min(2, { message: "Company name must be at least 2 characters." })
        .nonempty({ message: "Company is required." }),
    location: z
        .string()
        .min(2, { message: "Location must be at least 2 characters." })
        .nonempty({ message: "Location is required." }),
    status: z.enum([
        "pending",
        "interview",
        "rejected",
        "assessment",
        "ghosted",
        "offer",
        "accepted",
    ]),
    link: z
        .string()
        .url({ message: "Link must be a valid URL." })
        .or(z.literal("")),
    date: z.string().date().nonempty({ message: "Must have a date" }),
})
export type JobAppFormData = z.infer<typeof JobAppFormSchema>
