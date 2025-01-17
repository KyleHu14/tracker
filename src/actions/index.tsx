"use server"

import { JobAppFormData } from "@/components/ModalButtons/JobAppSchema"

import { revalidatePath } from "next/cache"
import { db } from "@/db"

import {
    InsertJobApp,
    SelectJobApp,
    job_application,
} from "@/db/schema/job-application"
import { eq } from "drizzle-orm"

export async function createJobApp(formData: JobAppFormData, userId: string) {
    const newJobApp: InsertJobApp = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        status: formData.status,
        date: new Date(formData.date),
        link: formData.link,
        userId: userId,
    }
    await db.insert(job_application).values(newJobApp)

    revalidatePath("/dashboard")
}

export async function getUserJobApps(userId: string): Promise<SelectJobApp[]> {
    const data = await db
        .select()
        .from(job_application)
        .where(eq(job_application.userId, userId))

    return data
}
