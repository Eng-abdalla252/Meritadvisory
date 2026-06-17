import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const formId = formData.get('formId') as string
        
        if (!formId) {
            return NextResponse.json({ error: 'Form ID is required' }, { status: 400 })
        }
        
        // Get form configuration
        const formsPath = path.join(process.cwd(), 'public', 'data', 'dynamic-forms.json')
        let forms = []
        
        if (fs.existsSync(formsPath)) {
            const formsContent = fs.readFileSync(formsPath, 'utf8')
            forms = JSON.parse(formsContent)
        }
        
        const form = forms.find((f: any) => f.id === formId)
        
        if (!form) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 })
        }
        
        // Extract form submission data
        const submissionData: any = {
            id: `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            formId: formId,
            formName: form.name,
            formCategory: form.category,
            type: 'dynamic-form' as const,
            status: 'new' as const,
            createdAt: new Date().toISOString(),
            leadSource: 'dynamic-form'
        }
        
        // Extract all form fields
        for (const [key, value] of formData.entries()) {
            if (key !== 'formId' && value instanceof File) {
                // Handle file uploads
                const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'dynamic-forms')
                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true })
                }
                
                const fileBuffer = Buffer.from(await value.arrayBuffer())
                const fileName = `${submissionData.id}_${key}${path.extname(value.name)}`
                const filePath = path.join(uploadsDir, fileName)
                fs.writeFileSync(filePath, fileBuffer)
                submissionData[key] = `/uploads/dynamic-forms/${fileName}`
            } else if (key !== 'formId') {
                submissionData[key] = value
            }
        }
        
        // Save to leads.json
        const leadsPath = path.join(process.cwd(), 'public', 'data', 'leads.json')
        let leads = []
        
        if (fs.existsSync(leadsPath)) {
            const leadsContent = fs.readFileSync(leadsPath, 'utf8')
            leads = JSON.parse(leadsContent)
        }
        
        leads.unshift(submissionData)
        fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 4), 'utf8')
        
        return NextResponse.json({ 
            success: true, 
            message: 'Form submitted successfully' 
        })
    } catch (error) {
        console.error('Error submitting dynamic form:', error)
        return NextResponse.json({ 
            error: 'Failed to submit form' 
        }, { status: 500 })
    }
}
