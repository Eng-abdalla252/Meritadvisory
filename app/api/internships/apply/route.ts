import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        
        // Extract form fields
        const applicationData: any = {
            id: `internship_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'internship' as const,
            status: 'new' as const,
            createdAt: new Date().toISOString(),
            name: formData.get('fullName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            university: formData.get('university') as string,
            department: formData.get('department') as string,
            major: formData.get('major') as string,
            graduationYear: formData.get('graduationYear') as string,
            internshipArea: formData.get('internshipArea') as string,
            startDate: formData.get('startDate') as string,
            duration: formData.get('duration') as string,
            additionalNotes: formData.get('additionalNotes') as string,
            leadSource: 'internship-form'
        }
        
        // Handle file uploads
        const cvFile = formData.get('cv') as File
        const coverLetterFile = formData.get('coverLetter') as File
        
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'internships')
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
        }
        
        // Save CV
        if (cvFile) {
            const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
            const cvFileName = `${applicationData.id}_cv${path.extname(cvFile.name)}`
            const cvPath = path.join(uploadsDir, cvFileName)
            fs.writeFileSync(cvPath, cvBuffer)
            applicationData.cvUrl = `/uploads/internships/${cvFileName}`
        }
        
        // Save Cover Letter
        if (coverLetterFile) {
            const coverLetterBuffer = Buffer.from(await coverLetterFile.arrayBuffer())
            const coverLetterFileName = `${applicationData.id}_cover_letter${path.extname(coverLetterFile.name)}`
            const coverLetterPath = path.join(uploadsDir, coverLetterFileName)
            fs.writeFileSync(coverLetterPath, coverLetterBuffer)
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
        
        leads.unshift(applicationData)
        fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 4), 'utf8')
        
        return NextResponse.json({ 
            success: true, 
            message: 'Internship application submitted successfully' 
        })
    } catch (error) {
        console.error('Error submitting internship application:', error)
        return NextResponse.json({ 
            error: 'Failed to submit application' 
        }, { status: 500 })
    }
}
