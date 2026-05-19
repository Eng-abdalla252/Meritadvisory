import { Resend } from 'resend';
import { NextResponse } from "next/server"
import { executeOdoo } from "@/lib/odoo"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const data = await req.json()

        // 1. Send Email Notification
        if (resend) {
            await resend.emails.send({
                from: 'Merit Advisory <onboarding@resend.dev>',
                to: ['outreach@meritadvisory.so'],
                subject: `Support Ticket: ${data.subject || 'New Request'}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #c11e1e; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Support Ticket</h2>
                        <p><strong>Company:</strong> ${data.company}</p>
                        <p><strong>Contact:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <hr style="border: 0; border-top: 1px solid #eee;" />
                        <p><strong>Issue:</strong></p>
                        <div style="background: #fff5f5; padding: 15px; border-radius: 5px; border: 1px solid #fed7d7;">
                            ${data.message}
                        </div>
                    </div>
                `,
            });
        }

        // 2. Create a ticket in Odoo Helpdesk
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
