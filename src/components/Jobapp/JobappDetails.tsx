import { SquarePen } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { SelectJobApp } from "@/db/schema/job-application"
import Link from "next/link"

interface Props {
    setEdit: Dispatch<SetStateAction<boolean>>
    jobApp: SelectJobApp
}

export default function JobappDetails({ setEdit, jobApp }: Props) {
    return (
        <>
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
                <div>
                    <h4 className="text-xl">Link</h4>
                    <Link
                        href={jobApp.link}
                        className="text-lg hover:text-blue-600"
                    >
                        {jobApp.link ? "Job Posting Link" : "N/A"}
                    </Link>
                </div>
            </div>

            <div className="mt-3">
                <h4 className="text-xl">Notes</h4>
                <div>
                    {!jobApp.notes
                        ? "-"
                        : jobApp.notes.split("\n").map((line, index) => (
                              <p key={index}>
                                  {line}
                                  <br />
                              </p>
                          ))}
                </div>
            </div>
        </>
    )
}
