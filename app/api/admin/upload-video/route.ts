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

        // Validate file type
        const acceptedTypes = ["video/mp4", "video/mov", "video/webm", "video/quicktime"]
        if (!acceptedTypes.includes(file.type) && !file.name.endsWith(".mov")) {
            return NextResponse.json({ error: "Invalid file type. Use MP4, MOV, or WebM." }, { status: 400 })
        }

        // Validate file size (max 50MB)
        const MAX_SIZE = 50 * 1024 * 1024
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "File too large. Max size is 50MB." }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/ /g, "-")}`
        const uploadDir = path.join(process.cwd(), "public", "uploads", "videos")
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const filePath = path.join(uploadDir, filename)
        fs.writeFileSync(filePath, buffer)

        return NextResponse.json({ 
            url: `/uploads/videos/${filename}`,
            message: "Video uploaded successfully" 
        })
    } catch (error) {
        console.error("Video upload error:", error)
        return NextResponse.json({ error: "Failed to upload video" }, { status: 500 })
    }
}
