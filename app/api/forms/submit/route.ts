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
                if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })
                const bytes = await cvFile.arrayBuffer()
                const buffer = Buffer.from(bytes)
                const fileName = `${Date.now()}-${cvFile.name.replace(/\s+/g, "-")}`
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
