import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { user } from "./auth"

export const job_application = pgTable("job_application", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    company: text("company").notNull(),
    location: text("location").notNull(),
    status: text("status", {
        enum: [
            "pending",
            "interview",
            "rejected",
            "assessment",
            "ghosted",
            "offer",
            "accepted",
        ],
    }).notNull(),
    link: text("link").notNull(),
    date: timestamp("date").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
})
export type InsertJobApp = typeof job_application.$inferInsert
export type SelectJobApp = typeof job_application.$inferSelect
