import { SquarePen } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { SelectJobApp } from "@/db/schema/job-application"

interface Props {
    setEdit: Dispatch<SetStateAction<boolean>>
    jobApp: SelectJobApp
}

export default function JobappDetails({ setEdit, jobApp }: Props) {
    return (
        <div>
            <h2 className="mt-5 flex items-center gap-3 text-2xl">
                <p>Job Details</p>

                <SquarePen
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => setEdit(true)}
                />
            </h2>
            <div className="mt-3 flex gap-5">
                <div>
                    <h4 className="text-xl">Location</h4>
                    <p className="text-lg">{jobApp.location}</p>
                </div>
                <div>
                    <h4 className="text-xl">Status</h4>
                    <p className="text-lg">{jobApp.status}</p>
                </div>
            </div>

            <div className="mt-3">
                <h4 className="text-xl">Notes</h4>
                <p>{!jobApp.notes ? "-" : jobApp.notes}</p>
            </div>
        </div>
    )
}
