import { Resend } from 'resend';
import { NextResponse } from "next/server"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const data = await req.json()

        // 1. Send Email Notification
        if (resend) {
            await resend.emails.send({
                from: 'Merit Advisory <onboarding@resend.dev>',
                to: ['outreach@meritadvisory.so'],
                subject: `New Inquiry from ${data.companyName}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #0f55ba; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Website Inquiry</h2>
                        <p><strong>Company:</strong> ${data.companyName}</p>
                        <p><strong>Contact:</strong> ${data.customerName}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone:</strong> ${data.phoneNumber}</p>
                        <hr style="border: 0; border-top: 1px solid #eee;" />
                        <p><strong>Message:</strong></p>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                            ${data.briefNeed || data.message}
                        </div>
                    </div>
                `,
            });
        }

        // 2. Call Odoo integration
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
