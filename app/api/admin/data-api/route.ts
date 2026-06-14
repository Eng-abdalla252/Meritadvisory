import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { verifyAuth } from "@/lib/auth"

// Always dynamically rendered — never cached by Next.js
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    // Verify authentication
    const auth = await verifyAuth(request)
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (!type) return NextResponse.json({ error: "Type is required" }, { status: 400 })

    // Sanitize type to prevent path traversal
    const safeType = type.replace(/[^a-zA-Z0-9-_]/g, '')
    if (safeType !== type) {
        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "public", "data", `${safeType}.json`)
    
    try {
        console.log("Attempting to read file:", filePath)
        if (!fs.existsSync(filePath)) {
            console.log("File does not exist:", filePath)
            return NextResponse.json([], { 
                headers: { "Cache-Control": "no-store, max-age=0" }
            })
        }
        let fileContents = fs.readFileSync(filePath, "utf8")
        // Remove BOM if present
        if (fileContents.charCodeAt(0) === 0xFEFF) {
            fileContents = fileContents.slice(1)
        }
        console.log("File read successfully, parsing JSON...")
        return NextResponse.json(JSON.parse(fileContents), {
            headers: { "Cache-Control": "no-store, max-age=0" }
        })
    } catch (error) {
        console.error("Error reading data file:", error)
        return NextResponse.json({ error: "Failed to read data", details: String(error) }, { status: 500 })
    }
}

export async function POST(request: Request) {
    // Verify authentication
    const auth = await verifyAuth(request)
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const data = await request.json()

    if (!type) return NextResponse.json({ error: "Type is required" }, { status: 400 })

    // Sanitize type to prevent path traversal
    const safeType = type.replace(/[^a-zA-Z0-9-_]/g, '')
    if (safeType !== type) {
        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "public", "data", `${safeType}.json`)

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error writing file:", error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
