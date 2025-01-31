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

function generateDate(dateString: string): Date {
    const dateArray = dateString.split("-")
    const year = parseInt(dateArray[0])
    const month = parseInt(dateArray[1], 10) - 1
    const date = parseInt(dateArray[2])
    const finalDate = new Date(year, month, date)

    return finalDate
}

export async function createJobApp(formData: JobAppFormData, userId: string) {
    const newJobApp: InsertJobApp = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        status: formData.status,
        date: generateDate(formData.date),
        link: formData.link,
        notes: formData.notes,
        userId: userId,
    }

    await db.insert(job_application).values(newJobApp)

    revalidatePath("/dashboard")
}

export async function getJobApp(jobId: string): Promise<SelectJobApp> {
    const data = await db
        .select()
        .from(job_application)
        .where(eq(job_application.id, jobId))
        .limit(1)

    return data[0]
}

export async function deleteJobApp(id: string) {
    await db.delete(job_application).where(eq(job_application.id, id))

    revalidatePath("/dashboard")
}

export async function getUserJobApps(userId: string): Promise<SelectJobApp[]> {
    const data = await db
        .select()
        .from(job_application)
        .where(eq(job_application.userId, userId))

    return data
}

export async function updateJobApps(
    formData: JobAppFormData,
    jobId: string,
    jobUserId: string,
) {
    const updateData: InsertJobApp = {
        userId: jobUserId,
        date: generateDate(formData.date),
        title: formData.title,
        company: formData.company,
        location: formData.location,
        status: formData.status,
        notes: formData.notes,
        link: formData.link,
    }

    await db
        .update(job_application)
        .set(updateData)
        .where(eq(job_application.id, jobId))
    revalidatePath("/dashboard")
}
