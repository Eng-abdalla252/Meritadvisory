import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "clients.json")

// Helper to read data
const readData = () => {
    try {
        const fileContent = fs.readFileSync(DATA_PATH, "utf8")
        return JSON.parse(fileContent)
    } catch (error) {
        return []
    }
}

// Helper to write data
const writeData = (data: any) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 4), "utf8")
}

export async function GET() {
    const clients = readData()
    return NextResponse.json(clients)
}

export async function POST(request: Request) {
    try {
        const newClient = await request.json()
        const clients = readData()
        clients.push(newClient)
        writeData(clients)
        return NextResponse.json({ message: "Client added successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to add client" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const updatedClient = await request.json()
        const clients = readData()
        const index = clients.findIndex((c: any) => c.name === updatedClient.name)
        if (index !== -1) {
            clients[index] = updatedClient
            writeData(clients)
            return NextResponse.json({ message: "Client updated successfully" })
        }
        return NextResponse.json({ error: "Client not found" }, { status: 404 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update client" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { name } = await request.json()
        const clients = readData()
        const filteredClients = clients.filter((c: any) => c.name !== name)
        writeData(filteredClients)
        return NextResponse.json({ message: "Client deleted successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete client" }, { status: 500 })
    }
}
