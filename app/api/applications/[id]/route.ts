import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "applications.json")

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

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const { status } = await request.json()
        
        const apps = readData()
        const index = apps.findIndex((a: any) => a.id === id)
        
        if (index === -1) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 })
        }
        
        apps[index].status = status
        apps[index].updatedAt = new Date().toISOString()
        
        writeData(apps)
        
        return NextResponse.json({ message: "Status updated successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const apps = readData()
        const filteredApps = apps.filter((a: any) => a.id !== id)
        writeData(filteredApps)
        return NextResponse.json({ message: "Application deleted successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete application" }, { status: 500 })
    }
}
