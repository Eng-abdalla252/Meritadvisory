import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (!type) return NextResponse.json({ error: "Type is required" }, { status: 400 })

    const filePath = path.join(process.cwd(), "public", "data", `${type}.json`)
    
    try {
        if (!fs.existsSync(filePath)) {
            // Return empty array if file does not exist to avoid breaking clients
            return NextResponse.json([])
        }
        const fileContents = fs.readFileSync(filePath, "utf8")
        return NextResponse.json(JSON.parse(fileContents))
    } catch (error) {
        return NextResponse.json({ error: "Failed to read data" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const data = await request.json()

    if (!type) return NextResponse.json({ error: "Type is required" }, { status: 400 })

    const filePath = path.join(process.cwd(), "public", "data", `${type}.json`)

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error writing file:", error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
