import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { evaluateInternshipApplication, evaluateJobApplication } from "@/lib/ai-evaluator"

const LEADS_PATH = path.join(process.cwd(), "public", "data", "leads.json")
const APPS_PATH = path.join(process.cwd(), "data", "applications.json")
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "cvs")

// ── Helpers ──────────────────────────────────────────────────────────────────

function readJSON(filePath: string, fallback: any[] = []) {
    try {
        if (!fs.existsSync(filePath)) return fallback
        return JSON.parse(fs.readFileSync(filePath, "utf8"))
    } catch {
        return fallback
    }
}

function writeJSON(filePath: string, data: any) {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
}

function appendLead(lead: any) {
    const leads = readJSON(LEADS_PATH)
    leads.unshift(lead)
    writeJSON(LEADS_PATH, leads)
}

// Input validation helpers
function sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '')
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(phone) && phone.length >= 10
}

// ── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get("content-type") || ""
        let data: Record<string, string> = {}
        let cvUrl = ""

        // ── Parse body (multipart or JSON) ──────────────────────────────────
        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData()
            formData.forEach((val, key) => {
                if (typeof val === "string") data[key] = val
            })

            const cvFile = formData.get("cvFile") as File | null
            if (cvFile && cvFile.size > 0) {
                // Validate CV file type and size
                const ALLOWED_CV_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                const MAX_CV_SIZE = 10 * 1024 * 1024 // 10MB
                
                if (!ALLOWED_CV_TYPES.includes(cvFile.type)) {
                    return NextResponse.json({ error: "Invalid CV file type. Only PDF and Word documents are allowed." }, { status: 400 })
                }
                
                if (cvFile.size > MAX_CV_SIZE) {
                    return NextResponse.json({ error: "CV file too large. Maximum size is 10MB." }, { status: 400 })
                }
                
                if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })
                const bytes = await cvFile.arrayBuffer()
                const buffer = Buffer.from(bytes)
                const safeName = cvFile.name.replace(/[^a-zA-Z0-9.-]/g, '')
                const fileName = `${Date.now()}-${safeName}`
                const filePath = path.join(UPLOADS_DIR, fileName)
                fs.writeFileSync(filePath, buffer)
                cvUrl = `/uploads/cvs/${fileName}`
            }
        } else {
            data = await request.json()
        }

        const formId = data.formId || data.formType || "contact"
        const formType = data.formType || formId
        const now = new Date().toISOString()

        // ── Input validation ───────────────────────────────────────────────
        // Validate email if present
        if (data.email && !validateEmail(data.email)) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
        }

        // Validate phone if present
        if (data.phone && !validatePhone(data.phone)) {
            return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
        }

        // Sanitize string inputs
        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'string') {
                data[key] = sanitizeString(data[key])
            }
        })

        // ── Resolve display name ─────────────────────────────────────────────
        const displayName =
            data.name ||
            data.customerName ||
            [data.firstName, data.lastName].filter(Boolean).join(" ") ||
            "Unknown"

        // ── AI Evaluation (internship & jobs) ────────────────────────────────
        let aiScore: number | undefined
        let aiCategory: string | undefined
        let aiEvaluation: any | undefined

        if (formType === "internship" || formId === "internship") {
            const evaluation = evaluateInternshipApplication({
                name: displayName,
                email: data.email,
                phone: data.phone,
                linkedin: data.linkedin,
                university: data.university,
                degree: data.degree,
                graduationYear: data.graduationYear,
                track: data.track,
                motivation: data.motivation,
                resumeText: data.resumeText,
            })
            aiScore = evaluation.score
            aiCategory = evaluation.category
            aiEvaluation = evaluation

            // Also save to applications.json
            const apps = readJSON(APPS_PATH)
            apps.push({
                id: Date.now().toString(),
                jobId: "internship-program",
                jobTitle: "Future Leaders Internship Program",
                name: displayName,
                email: data.email,
                phone: data.phone,
                linkedin: data.linkedin,
                degree: data.degree,
                university: data.university,
                track: data.track,
                motivation: data.motivation,
                resumeText: data.resumeText,
                cvUrl,
                aiScore: evaluation.score,
                aiCategory: evaluation.category,
                aiInsights: evaluation.insights,
                aiStrengths: evaluation.strengths,
                aiGaps: evaluation.gaps,
                aiRecommendations: evaluation.recommendations,
                aiSummary: evaluation.summary,
                status: "New",
                appliedAt: now,
            })
            writeJSON(APPS_PATH, apps)
        } else if (formType === "job-apply" || formId === "job-apply") {
            const evaluation = evaluateJobApplication({
                name: displayName,
                degree: data.degree,
                linkedin: data.linkedin,
                resumeText: data.resumeText,
                requirements: data.requirements ? JSON.parse(data.requirements) : [],
            })
            aiScore = evaluation.score
            aiCategory = evaluation.category
            aiEvaluation = evaluation

            // Also save to applications.json
            const apps = readJSON(APPS_PATH)
            apps.push({
                id: Date.now().toString(),
                jobId: data.jobId || "unknown",
                jobTitle: data.jobTitle || "Unknown Position",
                name: displayName,
                email: data.email,
                phone: data.phone,
                linkedin: data.linkedin,
                degree: data.degree,
                resumeText: data.resumeText,
                cvUrl,
                aiScore: evaluation.score,
                aiCategory: evaluation.category,
                aiInsights: evaluation.insights,
                status: "New",
                appliedAt: now,
            })
            writeJSON(APPS_PATH, apps)
        }

        // ── Build Lead Record ────────────────────────────────────────────────
        const leadTypeMap: Record<string, string> = {
            contact: "contact",
            demo: "demo",
            questionnaire: "questionnaire",
            internship: "recruitment",
            "job-apply": "recruitment",
            webinar: "webinar",
        }
        const leadType = leadTypeMap[formType] || "contact"

        const lead: any = {
            id: Date.now().toString(),
            type: leadType,
            formId,
            name: displayName,
            email: data.email || "",
            phone: data.phone || "",
            company: data.company || data.companyName || "",
            companyName: data.companyName || data.company || "",
            customerName: displayName,
            message: data.message || data.briefNeed || "",
            subject: data.subject || "",
            category: data.category || formType,
            status: "new",
            createdAt: now,
            // Questionnaire specific
            numEmployees: data.numEmployees,
            numBranches: data.numBranches,
            cities: data.cities,
            interest: data.interest,
            managementIndustry: data.managementIndustry,
            currentSystem: data.currentSystem,
            briefNeed: data.briefNeed,
            // Demo specific
            system: data.system,
            // Recruitment specific
            jobTitle: data.jobTitle || (formType === "internship" ? "Future Leaders Internship" : undefined),
            degree: data.degree,
            linkedin: data.linkedin,
            university: data.university,
            track: data.track,
            motivation: data.motivation,
            resumeText: data.resumeText,
            cvUrl: cvUrl || undefined,
            // AI fields
            aiScore,
            aiCategory,
            aiSummary: aiEvaluation?.summary,
            aiStrengths: aiEvaluation?.strengths,
            aiGaps: aiEvaluation?.gaps,
            aiRecommendations: aiEvaluation?.recommendations,
            aiInsights: aiEvaluation?.insights,
        }

        // Remove undefined keys to keep JSON clean
        Object.keys(lead).forEach(k => {
            if (lead[k] === undefined) delete lead[k]
        })

        appendLead(lead)

        return NextResponse.json({
            message: "Submission received successfully",
            aiScore,
            aiCategory,
        })
    } catch (error) {
        console.error("[forms/submit] Error:", error)
        return NextResponse.json({ error: "Failed to process submission" }, { status: 500 })
    }
}
