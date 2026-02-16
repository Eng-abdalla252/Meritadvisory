import { NextResponse } from "next/server"
import { executeOdoo } from "@/lib/odoo"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Create an application in hr.applicant
    const applicantId = await executeOdoo("hr.applicant", "create", [[{
      name: `${data.firstName} ${data.lastName} - ${data.jobName}`,
      partner_name: `${data.firstName} ${data.lastName}`,
      email_from: data.email,
      partner_mobile: data.phone,
      description: `Cover Letter/Note: ${data.message}`,
      job_id: data.jobId,
      // If we had a resume upload, we would handle attachments here
    }]])

    return NextResponse.json({ success: true, id: applicantId })
  } catch (error: any) {
    console.error("Odoo Application Error:", error.message)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
