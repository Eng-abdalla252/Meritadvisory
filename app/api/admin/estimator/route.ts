import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "estimator-services.json")

export async function GET() {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            return NextResponse.json({ categories: [] })
        }
        const fileContent = fs.readFileSync(DATA_PATH, "utf8")
        return NextResponse.json(JSON.parse(fileContent))
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch estimator services" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 4), "utf8")
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to save estimator services" }, { status: 500 })
    }
}
