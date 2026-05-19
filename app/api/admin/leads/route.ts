import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "public", "data", "leads.json")

export async function GET() {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            return NextResponse.json([])
        }
        const fileContent = fs.readFileSync(DATA_PATH, "utf8")
        return NextResponse.json(JSON.parse(fileContent))
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const newLead = await request.json()
        
        // Add timestamp and ID
        const leadWithMeta = {
            ...newLead,
            id: `lead-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: "new"
        }

        let currentLeads = []
        if (fs.existsSync(DATA_PATH)) {
            const fileContent = fs.readFileSync(DATA_PATH, "utf8")
            currentLeads = JSON.parse(fileContent)
        }

        currentLeads.unshift(leadWithMeta)
        fs.writeFileSync(DATA_PATH, JSON.stringify(currentLeads, null, 2))

        return NextResponse.json({ success: true, lead: leadWithMeta })
    } catch (error) {
        console.error("Failed to save lead:", error)
        return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
    }
}

// For updating lead status (e.g. marking as read/handled)
export async function PUT(request: Request) {
    try {
        const { id, status } = await request.json()
        
        if (!fs.existsSync(DATA_PATH)) {
            return NextResponse.json({ error: "No leads found" }, { status: 404 })
        }

        const fileContent = fs.readFileSync(DATA_PATH, "utf8")
        let currentLeads = JSON.parse(fileContent)
        
        currentLeads = currentLeads.map((l: any) => 
            l.id === id ? { ...l, status } : l
        )

        fs.writeFileSync(DATA_PATH, JSON.stringify(currentLeads, null, 2))
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id || !fs.existsSync(DATA_PATH)) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 })
        }

        const fileContent = fs.readFileSync(DATA_PATH, "utf8")
        let currentLeads = JSON.parse(fileContent)
        
        currentLeads = currentLeads.filter((l: any) => l.id !== id)

        fs.writeFileSync(DATA_PATH, JSON.stringify(currentLeads, null, 2))
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 })
    }
}
