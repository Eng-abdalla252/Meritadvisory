import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        
        // Extract form fields
        const supportData: any = {
            id: `support_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'support' as const,
            status: 'new' as const,
            createdAt: new Date().toISOString(),
            name: formData.get('name') as string,
            company: formData.get('company') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            productService: formData.get('productService') as string,
            issueDescription: formData.get('issueDescription') as string,
            priorityLevel: formData.get('priorityLevel') as string,
            stepsToReproduce: formData.get('stepsToReproduce') as string,
            expectedBehavior: formData.get('expectedBehavior') as string,
            environment: formData.get('environment') as string,
            leadSource: 'support-form'
        }
        
        // Handle file upload
        const attachmentFile = formData.get('attachment') as File
        
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'support')
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
        }
        
        // Save attachment
        if (attachmentFile) {
            const attachmentBuffer = Buffer.from(await attachmentFile.arrayBuffer())
            const attachmentFileName = `${supportData.id}_attachment${path.extname(attachmentFile.name)}`
            const attachmentPath = path.join(uploadsDir, attachmentFileName)
            fs.writeFileSync(attachmentPath, attachmentBuffer)
            supportData.attachmentUrl = `/uploads/support/${attachmentFileName}`
        }
        
        // Save to leads.json
        const leadsPath = path.join(process.cwd(), 'public', 'data', 'leads.json')
        const dir = path.dirname(leadsPath)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        let leads = []
        
        if (fs.existsSync(leadsPath)) {
            try {
                const leadsContent = fs.readFileSync(leadsPath, 'utf8')
                leads = JSON.parse(leadsContent)
            } catch (e) { console.error("Error parsing leads.json:", e) }
        }
        
        leads.unshift(supportData)
        fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 4), 'utf8')
        
        return NextResponse.json({ 
            success: true, 
            message: 'Support request submitted successfully' 
        })
    } catch (error) {
        console.error('Error submitting support request:', error)
        return NextResponse.json({ 
            error: 'Failed to submit request' 
        }, { status: 500 })
    }
}
