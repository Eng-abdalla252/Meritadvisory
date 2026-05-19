import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "public", "data", "settings.json")

export async function GET() {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            return NextResponse.json({})
        }
        const fileContent = fs.readFileSync(DATA_PATH, "utf8")
        return NextResponse.json(JSON.parse(fileContent))
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const settings = await request.json()
        fs.writeFileSync(DATA_PATH, JSON.stringify(settings, null, 2))
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
    }
}
