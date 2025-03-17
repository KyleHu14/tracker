import PageWrapper from "@/components/PageWrapper"

import { changelog } from "@/changelog-entries"

const typeColors = {
    added: "text-green-500",
    fixed: "text-blue-500",
    removed: "text-red-500",
    changed: "text-amber-500",
}

export default function Changelog() {
    return (
        <PageWrapper>
            <h1 className="text-3xl font-bold">Changelog</h1>
            <p className="text-muted-foreground mt-2 text-lg">
                Newest updates and important announcements.
            </p>

            <div className="mt-8 space-y-8">
                {changelog.map((entry, index) => (
                    <div key={index} className="space-y-4">
                        <div className="flex items-baseline gap-3">
                            <h2 className="text-xl font-semibold">
                                v{entry.version}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                {new Date(
                                    entry.date + "T00:00:00",
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <ul className="space-y-2">
                            {entry.changes.map((change, changeIndex) => (
                                <li
                                    key={changeIndex}
                                    className="flex items-baseline gap-2"
                                >
                                    <span
                                        className={`text-sm font-medium ${typeColors[change.type]}`}
                                    >
                                        {change.type}
                                    </span>
                                    <span>{change.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </PageWrapper>
    )
}
