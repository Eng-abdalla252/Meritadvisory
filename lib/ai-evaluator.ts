/**
 * AI Evaluator — Merit Advisory
 * Simulated AI screening engine that analyses internship/job applications
 * and produces structured evaluations, scores, and recommendations.
 */

export interface AIEvaluation {
  score: number                    // 0–100
  category: "Top Talent" | "Qualified" | "Promising" | "Review Needed"
  summary: string                  // 2-sentence human-readable summary
  strengths: string[]              // Positive signals found
  gaps: string[]                   // Areas that need attention
  recommendations: string[]        // HR action recommendations
  insights: string[]               // Key extracted data points
  matchPercentage: number          // 0–100 (alias for score)
  evaluatedAt: string              // ISO timestamp
}

/**
 * Evaluate an internship application using rule-based AI scoring.
 */
export function evaluateInternshipApplication(data: {
  name: string
  email?: string
  phone?: string
  linkedin?: string
  university?: string
  degree?: string
  graduationYear?: string
  track?: string
  motivation?: string
  resumeText?: string
}): AIEvaluation {
  let score = 30 // Base score for completing the application
  const strengths: string[] = []
  const gaps: string[] = []
  const recommendations: string[] = []
  const insights: string[] = []

  const text = [data.motivation, data.resumeText].join(" ").toLowerCase()
  const degree = (data.degree || "").toLowerCase()
  const track = (data.track || "").toLowerCase()

  // ── 1. Education Scoring ──────────────────────────────────────────────────
  if (degree.includes("phd") || degree.includes("doctorate")) {
    score += 25
    strengths.push("Exceptional educational qualification (PhD / Doctorate)")
    insights.push(`Degree: PhD / Doctorate`)
  } else if (degree.includes("master")) {
    score += 20
    strengths.push("Advanced degree (Master's) — above average for intern pool")
    insights.push(`Degree: Master's`)
  } else if (degree.includes("bachelor")) {
    score += 15
    strengths.push("University degree (Bachelor's) — meets minimum requirement")
    insights.push(`Degree: Bachelor's`)
  } else if (degree.includes("diploma") || degree.includes("associate")) {
    score += 8
    gaps.push("Diploma-level education — may lack depth for senior tracks")
    insights.push(`Degree: Diploma / Associate`)
  } else {
    gaps.push("Education level not clearly stated")
  }

  // ── 2. Graduation Recency ─────────────────────────────────────────────────
  const year = parseInt(data.graduationYear || "0")
  const currentYear = new Date().getFullYear()
  if (year >= currentYear) {
    score += 8
    strengths.push("Upcoming / recent graduate — ideal candidate timeline")
  } else if (currentYear - year <= 2) {
    score += 5
    strengths.push(`Graduated ${currentYear - year} year(s) ago — within eligibility window`)
  } else if (year > 0) {
    gaps.push(`Graduated ${currentYear - year} years ago — outside ideal 0-2 year window`)
  }

  // ── 3. LinkedIn Professional Presence ────────────────────────────────────
  if (data.linkedin && data.linkedin.includes("linkedin.com")) {
    score += 8
    strengths.push("Active LinkedIn profile provided — shows professional awareness")
    insights.push("Professional online profile: ✓")
  } else {
    gaps.push("No LinkedIn profile — limits professional visibility verification")
    recommendations.push("Ask candidate to set up a LinkedIn profile before interview")
  }

  // ── 4. Track-Relevant Keywords ───────────────────────────────────────────
  const trackKeywords: Record<string, string[]> = {
    erp: ["odoo", "erp", "sap", "accounting", "inventory", "business", "implementation", "module", "consulting", "process"],
    it: ["python", "react", "javascript", "code", "developer", "programming", "software", "api", "database", "devops", "web"],
    finance: ["finance", "accounting", "audit", "ifrs", "tax", "financial", "reporting", "budget", "cpa", "acca", "cfo"],
  }

  const detectedTrack = track.includes("erp") || track.includes("odoo") ? "erp"
    : track.includes("software") || track.includes("engineering") || track.includes("it") ? "it"
    : track.includes("accounting") || track.includes("finance") || track.includes("financial") ? "finance"
    : null

  if (detectedTrack && trackKeywords[detectedTrack]) {
    let matchCount = 0
    trackKeywords[detectedTrack].forEach(kw => {
      if (text.includes(kw)) {
        score += 3
        matchCount++
      }
    })
    if (matchCount >= 4) {
      strengths.push(`Strong keyword alignment with ${detectedTrack.toUpperCase()} track (${matchCount} matches)`)
    } else if (matchCount >= 2) {
      insights.push(`Partial keyword alignment with ${detectedTrack.toUpperCase()} track (${matchCount} matches)`)
    } else {
      gaps.push("Limited track-relevant keywords in motivation statement")
    }
  }

  // ── 5. Motivation Quality ─────────────────────────────────────────────────
  const motivationLen = (data.motivation || "").trim().length
  if (motivationLen >= 300) {
    score += 10
    strengths.push("Detailed, well-articulated motivation statement (300+ chars)")
  } else if (motivationLen >= 100) {
    score += 5
    insights.push("Adequate motivation statement — could be more detailed")
  } else if (motivationLen >= 50) {
    score += 2
    gaps.push("Motivation statement is brief — minimal insight into candidate's goals")
  } else {
    gaps.push("Motivation statement too short or missing — difficult to assess fit")
    recommendations.push("Request a more detailed motivation letter from candidate")
  }

  // ── 6. Professional Language & Tone ──────────────────────────────────────
  const professionalPhrases = [
    "passion", "dedicated", "experience", "professional", "contribute",
    "learn", "grow", "career", "skill", "goal", "team", "collaborate",
    "merit", "advisory", "opportunity", "challenge", "develop"
  ]
  let profCount = 0
  professionalPhrases.forEach(p => { if (text.includes(p)) profCount++ })
  if (profCount >= 5) {
    score += 6
    strengths.push("Professional and goal-oriented language detected")
  } else if (profCount >= 3) {
    score += 3
  }

  // ── 7. University Mention ─────────────────────────────────────────────────
  if (data.university && data.university.trim().length > 3) {
    score += 2
    insights.push(`University: ${data.university}`)
  }

  // ── 8. Contact Completeness ───────────────────────────────────────────────
  const hasCompleteContact = data.email && data.phone
  if (hasCompleteContact) {
    score += 2
    insights.push("Complete contact information provided")
  } else {
    gaps.push("Incomplete contact information")
  }

  // ── Finalize Score ────────────────────────────────────────────────────────
  const finalScore = Math.min(100, Math.max(0, score))

  const category: AIEvaluation["category"] =
    finalScore >= 82 ? "Top Talent"
    : finalScore >= 65 ? "Qualified"
    : finalScore >= 50 ? "Promising"
    : "Review Needed"

  // ── Summary ───────────────────────────────────────────────────────────────
  const trackLabel = detectedTrack === "erp" ? "ERP / Odoo"
    : detectedTrack === "it" ? "Software Engineering"
    : detectedTrack === "finance" ? "Financial Advisory"
    : "General"

  const summaryMap: Record<AIEvaluation["category"], string> = {
    "Top Talent":     `${data.name} is a high-calibre candidate with strong academic credentials and excellent alignment with the ${trackLabel} track. Recommend fast-tracking to interview stage.`,
    "Qualified":      `${data.name} meets the core requirements for the ${trackLabel} internship with solid qualifications. A standard review and interview is recommended.`,
    "Promising":      `${data.name} shows potential for the ${trackLabel} track but has some gaps that should be explored during the interview. Conditional shortlist recommended.`,
    "Review Needed":  `${data.name}'s application requires manual review — the profile does not clearly meet minimum requirements for the ${trackLabel} track. Further information may be needed.`,
  }

  // ── HR Recommendations ────────────────────────────────────────────────────
  if (finalScore >= 82) {
    recommendations.push("Schedule orientation interview within 3 business days")
    recommendations.push("Send priority welcome email with program details")
  } else if (finalScore >= 65) {
    recommendations.push("Schedule standard screening interview within 5 business days")
    recommendations.push("Request additional portfolio or academic transcripts")
  } else if (finalScore >= 50) {
    recommendations.push("Place in secondary review queue for 2-week consideration")
    recommendations.push("Request a brief written test or technical exercise before decision")
  } else {
    recommendations.push("Send polite decline or waitlist communication")
    recommendations.push("Consider re-application for next cohort if motivation is strong")
  }

  return {
    score: finalScore,
    matchPercentage: finalScore,
    category,
    summary: summaryMap[category],
    strengths,
    gaps,
    recommendations,
    insights,
    evaluatedAt: new Date().toISOString(),
  }
}

/**
 * Evaluate a standard job application using rule-based scoring.
 */
export function evaluateJobApplication(data: {
  name: string
  degree?: string
  linkedin?: string
  resumeText?: string
  requirements?: string[]
}): AIEvaluation {
  let score = 30
  const strengths: string[] = []
  const gaps: string[] = []
  const recommendations: string[] = []
  const insights: string[] = []

  const text = (data.resumeText || "").toLowerCase()
  const degree = (data.degree || "").toLowerCase()

  // Education
  if (degree.includes("phd")) { score += 25; strengths.push("PhD qualification — exceptional academic profile") }
  else if (degree.includes("master")) { score += 20; strengths.push("Master's degree — above-average academic level") }
  else if (degree.includes("bachelor")) { score += 15; strengths.push("Bachelor's degree — meets standard requirement") }
  else { gaps.push("Education level not clearly stated") }

  // LinkedIn
  if (data.linkedin?.includes("linkedin.com")) {
    score += 8; strengths.push("LinkedIn profile provided")
  } else {
    gaps.push("No LinkedIn profile provided")
  }

  // Requirements keyword matching
  const requirements = data.requirements || []
  let matchCount = 0
  requirements.forEach(req => {
    const words = req.toLowerCase().split(/[\s,.;]+/)
    words.forEach(word => {
      if (word.length > 3 && text.includes(word)) {
        score += 3
        matchCount++
      }
    })
  })
  if (matchCount > 0) strengths.push(`Matched ${matchCount} keyword(s) from job requirements`)

  // Experience indicators
  const expKeywords = ["years", "experienced", "expert", "specialist", "lead", "manager", "senior", "director"]
  let expCount = 0
  expKeywords.forEach(w => { if (text.includes(w)) { score += 2; expCount++ } })
  if (expCount >= 3) strengths.push("Strong experience language detected in resume")

  // Resume length
  if (text.length >= 500) { score += 5; strengths.push("Detailed resume/cover letter provided") }
  else if (text.length < 100) { gaps.push("Very brief resume — insufficient detail for evaluation") }

  const finalScore = Math.min(100, Math.max(0, score))
  const category: AIEvaluation["category"] =
    finalScore >= 80 ? "Top Talent"
    : finalScore >= 62 ? "Qualified"
    : finalScore >= 45 ? "Promising"
    : "Review Needed"

  recommendations.push(
    category === "Top Talent" ? "Prioritize for immediate interview" :
    category === "Qualified" ? "Schedule standard hiring process interview" :
    category === "Promising" ? "Request additional test assignment before decision" :
    "Send decline or waitlist communication"
  )

  return {
    score: finalScore,
    matchPercentage: finalScore,
    category,
    summary: `${data.name} scored ${finalScore}/100 in automated screening. Category: ${category}.`,
    strengths,
    gaps,
    recommendations,
    insights,
    evaluatedAt: new Date().toISOString(),
  }
}
