import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "jobs.json")

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        if (!fs.existsSync(DATA_PATH)) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 })
        }
        
        const fileContent = fs.readFileSync(DATA_PATH, "utf8")
        const jobs = JSON.parse(fileContent)
        const job = jobs.find((j: any) => j.id === id)
        
        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 })
        }
        
        return NextResponse.json(job)
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 })
    }
}
