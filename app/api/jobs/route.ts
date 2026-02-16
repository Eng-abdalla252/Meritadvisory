import { NextResponse } from "next/server"
import { executeOdoo } from "@/lib/odoo"

export async function GET() {
    try {
        // Fetch jobs from hr.job model where state is 'published'
        // Note: Depends on Odoo configuration, sometimes 'website_published' is the field
        const jobs = await executeOdoo(
            "hr.job",
            "search_read",
            [[["state", "=", "recruit"]]], // 'recruit' is common for open positions
            {
                fields: ["name", "description", "no_of_recruitment", "address_id", "department_id"],
            }
        )

        return NextResponse.json(jobs)
    } catch (error: any) {
        console.error("Failed to fetch jobs from Odoo:", error.message)
        // Return empty array if Odoo is not connected yet so the UI doesn't crash
        return NextResponse.json([])
    }
}
