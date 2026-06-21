import { Resend } from 'resend';
import { createOdooLead } from "@/lib/odoo";
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const data = await req.json()

        // Store questionnaire submission with blueprint data
        const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const submissionData = {
            id: submissionId,
            ...data,
            submittedAt: new Date().toISOString(),
            blueprintData: data.blueprintData || null
        }

        // Save to questionnaire submissions file
        const submissionsPath = path.join(process.cwd(), "public", "data", "questionnaire-submissions.json")
        let submissions = []
        
        if (fs.existsSync(submissionsPath)) {
            try {
                const fileContent = fs.readFileSync(submissionsPath, "utf8")
                submissions = JSON.parse(fileContent)
            } catch (e) {
                console.error("Error parsing questionnaire submissions:", e)
            }
        }

        submissions.unshift(submissionData)
        fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 4), "utf8")

        // Create Sales Lead in leads.json for Sales Module integration
        const salesLeadData = {
            id: `sales_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'sales' as const,
            status: 'new' as const,
            createdAt: new Date().toISOString(),
            name: data.customerName,
            company: data.companyName,
            email: data.email || '',
            phone: data.phoneNumber,
            serviceInterested: data.blueprintData?.name || data.interest || 'Project Questionnaire',
            budgetRange: data.blueprintData ? `${data.blueprintData.currency} ${data.blueprintData.price.toLocaleString()}` : 'Not specified',
            projectDetails: data.briefNeed,
            timeline: 'Not specified',
            teamSize: data.numEmployees,
            currentSolution: data.currentSystem,
            goals: data.interest,
            leadSource: 'questionnaire',
            questionnaireId: submissionId,
            blueprintData: data.blueprintData || null
        }
        
        // Save to leads.json
        const leadsPath = path.join(process.cwd(), 'public', 'data', 'leads.json')
        let leads = []
        
        if (fs.existsSync(leadsPath)) {
            try {
                const leadsContent = fs.readFileSync(leadsPath, 'utf8')
                leads = JSON.parse(leadsContent)
            } catch (e) { console.error("Error parsing leads.json:", e) }
        }
        
        leads.unshift(salesLeadData)
        fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 4), 'utf8')

        // 1. Send Email Notification with blueprint pricing
        if (resend) {
            const blueprintInfo = data.blueprintData 
                ? `<p><strong>Selected Blueprint:</strong> ${data.blueprintData.name}</p>
                   <p><strong>Blueprint Price:</strong> ${data.blueprintData.currency} ${data.blueprintData.price.toLocaleString()}</p>
                   <p><strong>Category:</strong> ${data.blueprintData.category}</p>`
                : ''

            await resend.emails.send({
                from: 'Merit Advisory <onboarding@resend.dev>',
                to: ['outreach@meritadvisory.so'],
                subject: `New Project Questionnaire from ${data.companyName} - ${data.blueprintData?.name || 'No Blueprint'}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #b22222; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Project Questionnaire Submission</h2>
                        ${blueprintInfo}
                        <p><strong>Company:</strong> ${data.companyName}</p>
                        <p><strong>Contact:</strong> ${data.customerName}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone:</strong> ${data.phoneNumber}</p>
                        <p><strong>Employees:</strong> ${data.numEmployees}</p>
                        <p><strong>Branches:</strong> ${data.numBranches}</p>
                        <p><strong>Locations:</strong> ${data.cities}</p>
                        <p><strong>Interest:</strong> ${data.interest}</p>
                        <hr style="border: 0; border-top: 1px solid #eee;" />
                        <p><strong>Brief Need:</strong></p>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                            ${data.briefNeed}
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
                id: submissionId,
                salesLeadId: salesLeadData.id,
                odooLeadId: result.lead_id
            })
        } else {
            // Still return a successful response to the user so they aren't blocked, 
            // but maybe log the error internally.
            console.error("Failed to sync to Odoo:", result.error)
            return NextResponse.json({
                message: "Questionnaire submitted successfully (Odoo sync pending)",
                id: submissionId,
                salesLeadId: salesLeadData.id,
                error: result.error
            }, { status: 200 })
        }
    } catch (error: any) {
        return NextResponse.json({ message: "Error processing submission", error: error.message }, { status: 500 })
    }
}
