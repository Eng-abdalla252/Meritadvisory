import { NextResponse } from "next/server"
import { createOdooLead } from "@/lib/odoo"

export async function POST(req: Request) {
    try {
        const data = await req.json()

        // Call Odoo integration
        const result = await createOdooLead(data)

        if (result.success) {
            return NextResponse.json({
                message: "Questionnaire submitted and synced to Odoo CRM",
                id: result.lead_id
            })
        } else {
            // Still return a successful response to the user so they aren't blocked, 
            // but maybe log the error internally.
            console.error("Failed to sync to Odoo:", result.error)
            return NextResponse.json({
                message: "Questionnaire submitted successfully (Odoo sync pending)",
                error: result.error
            }, { status: 200 })
        }
    } catch (error: any) {
        return NextResponse.json({ message: "Error processing submission", error: error.message }, { status: 500 })
    }
}
