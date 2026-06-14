import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { verifyAuth } from "@/lib/auth"

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: Request) {
    // Verify authentication
    const auth = await verifyAuth(request)
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get("file") as File
        
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, GIF, and SVG are allowed." }, { status: 400 })
        }

        // Validate file size
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Sanitize filename
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '')
        const filename = `${Date.now()}-${safeName}`
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
