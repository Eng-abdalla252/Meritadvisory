import { NextResponse } from "next/server"
import { executeOdoo } from "@/lib/odoo"

export async function POST(req: Request) {
    try {
        const data = await req.json()

        // Create a ticket in Odoo Helpdesk (helpdesk.ticket)
        // Field names might vary by Odoo version, common ones: 
        // name, partner_name, partner_email, description
        const ticketId = await executeOdoo("helpdesk.ticket", "create", [[{
            name: `${data.subject || 'Support Request'} - ${data.company}`,
            partner_name: data.name,
            partner_email: data.email,
            description: `
Client Support Request:
-----------------------
Company: ${data.company}
Category: ${data.category || 'General'}
Priority: ${data.priority || 'Normal'}

Issue Description:
${data.message}
      `.trim(),
            // Setting defaults for Helpdesk
            team_id: false, // Could be specialized helpdesk team
            priority: '1',  // 0, 1, 2, 3 usually
        }]])

        return NextResponse.json({ success: true, id: ticketId })
    } catch (error: any) {
        console.error("Odoo Helpdesk Error:", error.message)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
