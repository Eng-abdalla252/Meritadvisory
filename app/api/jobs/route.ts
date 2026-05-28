import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "jobs.json")

const readData = () => {
    try {
        if (!fs.existsSync(DATA_PATH)) return []
        const fileContent = fs.readFileSync(DATA_PATH, "utf8")
        return JSON.parse(fileContent)
    } catch (error) {
        return []
    }
}

const writeData = (data: any) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 4), "utf8")
}

export async function GET() {
    try {
        const jobs = readData()
        return NextResponse.json(jobs)
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const newJob = await request.json()
        const jobs = readData()
        jobs.push({
            ...newJob,
            id: newJob.title.toLowerCase().replace(/\s+/g, '-'),
            createdAt: new Date().toISOString()
        })
        writeData(jobs)
        return NextResponse.json({ message: "Job posted successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to post job" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const updatedJobs = await request.json()
        if (!Array.isArray(updatedJobs)) {
            return NextResponse.json({ error: "Invalid jobs data format" }, { status: 400 })
        }
        writeData(updatedJobs)
        return NextResponse.json({ success: true, message: "Jobs updated successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update jobs list" }, { status: 500 })
    }
}
