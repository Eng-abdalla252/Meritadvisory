import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const APP_DATA_PATH = path.join(process.cwd(), "data", "applications.json")
const JOB_DATA_PATH = path.join(process.cwd(), "data", "jobs.json")
const LEADS_DATA_PATH = path.join(process.cwd(), "public", "data", "leads.json")

const readApps = () => {
    try {
        if (!fs.existsSync(APP_DATA_PATH)) return []
        const fileContent = fs.readFileSync(APP_DATA_PATH, "utf8")
        return JSON.parse(fileContent)
    } catch (error) {
        return []
    }
}

const readJobs = () => {
    try {
        if (!fs.existsSync(JOB_DATA_PATH)) return []
        const fileContent = fs.readFileSync(JOB_DATA_PATH, "utf8")
        return JSON.parse(fileContent)
    } catch (error) {
        return []
    }
}

const writeApps = (data: any) => {
    fs.writeFileSync(APP_DATA_PATH, JSON.stringify(data, null, 4), "utf8")
}

// Advanced AI Scoring Simulation
const calculateAIScore = (formData: any, requirements: string[]) => {
    let score = 30 // Base score for applying
    let insights: string[] = []

    const { resumeText, degree, linkedin, experience } = formData
    const text = (resumeText || "").toLowerCase()
    const degreeValue = (degree || "").toLowerCase()

    // 1. Education Scoring
    if (degreeValue.includes("phd") || degreeValue.includes("doctorate")) {
        score += 25
        insights.push("High educational qualification (PhD)")
    } else if (degreeValue.includes("master")) {
        score += 20
        insights.push("Advanced degree (Master's)")
    } else if (degreeValue.includes("bachelor")) {
        score += 15
        insights.push("University degree (Bachelor's)")
    }

    // 2. LinkedIn Presence
    if (linkedin && linkedin.includes("linkedin.com")) {
        score += 10
        insights.push("Professional profile provided")
    }

    // 3. Keyword Matching (Skills & Requirements)
    let matchCount = 0
    requirements.forEach(req => {
        const keywords = req.toLowerCase().split(/[\s,.;]+/)
        keywords.forEach(word => {
            if (word.length > 3 && text.includes(word)) {
                score += 4
                matchCount++
            }
        })
    })
    if (matchCount > 0) insights.push(`Matched ${matchCount} key skill keywords`)

    // 4. Experience Keywords
    const expKeywords = ["years", "experienced", "expert", "specialist", "lead", "manager", "senior"]
    expKeywords.forEach(word => {
        if (text.includes(word)) score += 3
    })

    // Cap at 100
    const finalScore = Math.min(100, score)
    
    return {
        score: finalScore,
        category: finalScore >= 80 ? "Top Talent" : finalScore >= 60 ? "Qualified" : "Review Needed",
        insights
    }
}

export async function GET() {
    try {
        const apps = readApps()
        return NextResponse.json(apps)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const jobId = formData.get("jobId") as string
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const phone = formData.get("phone") as string
        const linkedin = formData.get("linkedin") as string
        const degree = formData.get("degree") as string
        const resumeText = formData.get("resumeText") as string
        const cvFile = formData.get("cvFile") as File | null
        
        let cvUrl = ""
        if (cvFile) {
            const bytes = await cvFile.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const fileName = `${Date.now()}-${cvFile.name.replace(/\s+/g, '-')}`
            const filePath = path.join(process.cwd(), "public", "uploads", "cvs", fileName)
            fs.writeFileSync(filePath, buffer)
            cvUrl = `/uploads/cvs/${fileName}`
        }

        const jobs = readJobs()
        const job = jobs.find((j: any) => j.id === jobId)
        
        const aiAnalysis = calculateAIScore(
            { resumeText, degree, linkedin }, 
            job?.requirements || []
        )

        const apps = readApps()
        const newApp = {
            id: Date.now().toString(),
            jobId,
            jobTitle: job?.title || "Unknown Position",
            name,
            email,
            phone,
            linkedin,
            degree,
            resumeText,
            cvUrl,
            aiScore: aiAnalysis.score,
            aiCategory: aiAnalysis.category,
            aiInsights: aiAnalysis.insights,
            status: "New",
            appliedAt: new Date().toISOString()
        }
        
        apps.push(newApp)
        writeApps(apps)

        // ALSO save to centralized leads.json
        try {
            let leads = []
            if (fs.existsSync(LEADS_DATA_PATH)) {
                leads = JSON.parse(fs.readFileSync(LEADS_DATA_PATH, "utf8"))
            }
            leads.unshift({
                ...newApp,
                type: "recruitment",
                createdAt: new Date().toISOString()
            })
            fs.writeFileSync(LEADS_DATA_PATH, JSON.stringify(leads, null, 2))
        } catch (e) {
            console.error("Failed to sync application to leads:", e)
        }
        
        return NextResponse.json({ 
            message: "Application submitted successfully",
            aiScore 
        })
    } catch (error) {
        console.error("Application Error:", error)
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
    }
}
