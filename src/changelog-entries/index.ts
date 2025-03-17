interface ChangelogEntry {
    date: string
    version: string
    changes: {
        type: "added" | "fixed" | "removed" | "changed"
        description: string
    }[]
}

export const changelog: ChangelogEntry[] = [
    {
        date: "2025-03-17",
        version: "1.1",
        changes: [
            {
                type: "added",
                description:
                    "Dashboard insights. The dashboard now shows total applications, interviews, offers, and rejections.",
            },
            {
                type: "added",
                description:
                    "Dark / Light adjustments. Dark and light mode have an adjusted color scheme.",
            },
            {
                type: "added",
                description:
                    "Changelog page. This changelog page now shows the latest updates and important announcements.",
            },
            {
                type: "added",
                description:
                    "Dedicated job application page. When you click on a job application in the dashboard, you will be redirected to a dedicated page for that application.",
            },
            {
                type: "added",
                description:
                    "Mobile UI. The application now has a mobile UI for smaller screens. The mobile version is not fully finalized.",
            },
            {
                type: "changed",
                description:
                    "Add Button. Add button doesn't have autofill suggestions anymore.",
            },
        ],
    },
    {
        date: "2025-01-22",
        version: "1.0",
        changes: [
            {
                type: "added",
                description:
                    "Basic job application tracking with CRUD operations.",
            },
            {
                type: "added",
                description: "Authentication with google oauth.",
            },
        ],
    },
]
