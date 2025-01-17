"use server"

import { JobAppFormData } from "@/components/ModalButtons/JobAppSchema"

import { revalidatePath } from "next/cache"
import { db } from "@/db"

import { InsertJobApp, job_application } from "@/db/schema/job-application"

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

export async function getJobApps() {
    const data = await db.select().from(insertJobApp)
}
