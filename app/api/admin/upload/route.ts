import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File
        
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/ /g, "-")}`
        const uploadDir = path.join(process.cwd(), "public", "uploads")
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const filePath = path.join(uploadDir, filename)
        fs.writeFileSync(filePath, buffer)

        return NextResponse.json({ 
            url: `/uploads/${filename}`,
            message: "File uploaded successfully" 
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }
}
