import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        // Extract form fields
        const salesData = {
            id: `sales_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'sales' as const,
            status: 'new' as const,
            createdAt: new Date().toISOString(),
            name: body.name,
            company: body.company,
            email: body.email,
            phone: body.phone,
            serviceInterested: body.serviceInterested,
            budgetRange: body.budgetRange,
            projectDetails: body.projectDetails,
            timeline: body.timeline,
            teamSize: body.teamSize,
            currentSolution: body.currentSolution,
            goals: body.goals,
            leadSource: 'sales-form'
        }
        
        // Save to leads.json
        const leadsPath = path.join(process.cwd(), 'public', 'data', 'leads.json')
        let leads = []
        
        if (fs.existsSync(leadsPath)) {
            const leadsContent = fs.readFileSync(leadsPath, 'utf8')
            leads = JSON.parse(leadsContent)
        }
        
        leads.unshift(salesData)
        fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 4), 'utf8')
        
        return NextResponse.json({ 
            success: true, 
            message: 'Sales inquiry submitted successfully' 
        })
    } catch (error) {
        console.error('Error submitting sales inquiry:', error)
        return NextResponse.json({ 
            error: 'Failed to submit inquiry' 
        }, { status: 500 })
    }
}
