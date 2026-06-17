import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        
        // Extract form fields
        const applicationData: any = {
            id: `career_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'recruitment' as const,
            status: 'new' as const,
            createdAt: new Date().toISOString(),
            name: formData.get('fullName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            jobTitle: formData.get('position') as string,
            university: formData.get('university') as string,
            degree: formData.get('degree') as string,
            graduationYear: formData.get('graduationYear') as string,
            experience: formData.get('experience') as string,
            coverLetter: formData.get('coverLetter') as string,
            linkedin: formData.get('linkedin') as string,
            portfolio: formData.get('portfolio') as string,
            leadSource: 'career-form'
        }
        
        // Handle file uploads
        const cvFile = formData.get('cv') as File
        const coverLetterFile = formData.get('coverLetter') as File
        
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'cvs')
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
        }
        
        // Save CV
        if (cvFile) {
            const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
            const cvFileName = `${applicationData.id}_cv${path.extname(cvFile.name)}`
            const cvPath = path.join(uploadsDir, cvFileName)
            fs.writeFileSync(cvPath, cvBuffer)
            applicationData.cvUrl = `/uploads/cvs/${cvFileName}`
        }
        
        // Save Cover Letter
        if (coverLetterFile) {
            const coverLetterBuffer = Buffer.from(await coverLetterFile.arrayBuffer())
            const coverLetterFileName = `${applicationData.id}_cover_letter${path.extname(coverLetterFile.name)}`
            const coverLetterPath = path.join(uploadsDir, coverLetterFileName)
            fs.writeFileSync(coverLetterPath, coverLetterBuffer)
        }
        
        // Handle certificates
        const certificates: string[] = []
        let certIndex = 0
        while (formData.get(`certificate_${certIndex}`)) {
            const certFile = formData.get(`certificate_${certIndex}`) as File
            const certBuffer = Buffer.from(await certFile.arrayBuffer())
            const certFileName = `${applicationData.id}_cert_${certIndex}${path.extname(certFile.name)}`
            const certPath = path.join(uploadsDir, certFileName)
            fs.writeFileSync(certPath, certBuffer)
            certificates.push(`/uploads/cvs/${certFileName}`)
            certIndex++
        }
        
        if (certificates.length > 0) {
            (applicationData as any).certificates = certificates
        }
        
        // Save to leads.json
        const leadsPath = path.join(process.cwd(), 'public', 'data', 'leads.json')
        let leads = []
        
        if (fs.existsSync(leadsPath)) {
            const leadsContent = fs.readFileSync(leadsPath, 'utf8')
            leads = JSON.parse(leadsContent)
        }
        
        leads.unshift(applicationData)
        fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 4), 'utf8')
        
        return NextResponse.json({ 
            success: true, 
            message: 'Application submitted successfully' 
        })
    } catch (error) {
        console.error('Error submitting career application:', error)
        return NextResponse.json({ 
            error: 'Failed to submit application' 
        }, { status: 500 })
    }
}
