import PageWrapper from "@/components/PageWrapper"
import { Button } from "@/components/ui/button"
import { DataTable } from "../../components/DataTable/data-table"
import { columns, JobApplication } from "../../components/DataTable/columns"
import AddButton from "@/components/ModalButtons/AddButton"

export default function Dashboard() {
    const data: JobApplication[] = [
        {
            id: "1",
            title: "Frontend Developer",
            location: "New York, NY",
            status: "pending",
            date: "2025-01-10",
            link: "https://google.com",
        },
        {
            id: "2",
            title: "Backend Engineer",
            location: "San Francisco, CA",
            status: "interview",
            date: "2025-01-05",
            link: "https://google.com",
        },
        {
            id: "3",
            title: "Full Stack Developer",
            location: "Austin, TX",
            status: "offer",
            date: "2025-01-08",
            link: "https://google.com",
        },
        {
            id: "4",
            title: "DevOps Engineer",
            location: "Seattle, WA",
            status: "rejected",
            date: "2024-12-20",
            link: "https://google.com",
        },
        {
            id: "5",
            title: "UI/UX Designer",
            location: "Chicago, IL",
            status: "ghosted",
            date: "2024-12-15",
            link: "https://google.com",
        },
        {
            id: "6",
            title: "Software Engineer",
            location: "Boston, MA",
            status: "pending",
            date: "2025-01-12",
            link: "https://google.com",
        },
        {
            id: "7",
            title: "Data Scientist",
            location: "Denver, CO",
            status: "offer",
            date: "2025-01-06",
            link: "https://google.com",
        },
        {
            id: "8",
            title: "Product Manager",
            location: "Los Angeles, CA",
            status: "rejected",
            date: "2024-12-25",
            link: "https://google.com",
        },
        {
            id: "9",
            title: "Mobile App Developer",
            location: "Miami, FL",
            status: "interview",
            date: "2025-01-11",
            link: "https://google.com",
        },
        {
            id: "10",
            title: "Cloud Architect",
            location: "Portland, OR",
            status: "ghosted",
            date: "2024-12-30",
            link: "https://google.com",
        },
    ]

    return (
        <PageWrapper className="mt-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-semibold">Your Applications</h1>
                <AddButton className="h-8 w-28" />
            </div>

            <DataTable className="mt-8" columns={columns} data={data} />
        </PageWrapper>
    )
}
