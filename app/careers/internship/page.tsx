"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    GraduationCap,
    BookOpen,
    Users,
    Briefcase,
    CheckCircle2,
    ArrowRight,
    Star,
    Clock,
    MapPin,
    Cpu,
    TrendingUp,
    Award,
    FileText,
    Send,
    Loader2,
    ChevronRight,
    Linkedin,
    BarChart2,
    Shield,
    Lightbulb,
    Calendar,
    ArrowLeft,
    Sparkles,
    Target,
    Zap,
    Globe
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const tracks = [
    {
        id: "erp",
        icon: Cpu,
        color: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50",
        textColor: "text-blue-700",
        title: "Odoo & ERP Systems",
        subtitle: "Master enterprise business systems used by global companies",
        description: "Gain hands-on experience implementing, configuring, and customizing Odoo ERP modules. Work alongside certified consultants on real client projects covering accounting, inventory, sales, HR, and more.",
        skills: ["Odoo ERP Configuration", "Business Analysis", "Process Mapping", "Data Migration", "Client Training"],
        outcome: "Walk away with practical ERP knowledge and real implementation case studies."
    },
    {
        id: "it",
        icon: Zap,
        color: "from-purple-500 to-pink-500",
        bg: "bg-purple-50",
        textColor: "text-purple-700",
        title: "Software Engineering & IT",
        subtitle: "Build real applications and master modern development tools",
        description: "Work on full-stack web projects using Python, React, and Next.js. Learn database design, RESTful APIs, cloud infrastructure, and modern DevOps practices alongside our senior engineering team.",
        skills: ["Python / React / Next.js", "PostgreSQL & APIs", "Cloud & DevOps", "UI/UX Design", "Software Testing"],
        outcome: "Build a professional portfolio of real client projects."
    },
    {
        id: "finance",
        icon: BarChart2,
        color: "from-emerald-500 to-teal-500",
        bg: "bg-emerald-50",
        textColor: "text-emerald-700",
        title: "Accounting & Financial Advisory",
        subtitle: "Develop expertise in IFRS, tax, audit, and corporate finance",
        description: "Dive into corporate financial reporting, IFRS compliance, tax optimization, internal auditing, and financial governance alongside our chartered accountants and financial advisors.",
        skills: ["IFRS & Financial Reporting", "Tax Optimization", "Internal Audit", "Financial Modeling", "Corporate Governance"],
        outcome: "Gain exposure to real financial statements, audit workpapers, and advisory engagements."
    }
]

const benefits = [
    {
        icon: BookOpen,
        title: "100% Free Learning Resources",
        description: "Full access to all learning materials, ERP software licenses, premium tools, and professional development resources — at zero cost to you.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: Users,
        title: "1-on-1 Senior Mentorship",
        description: "Each intern is paired with a senior consultant or specialist who provides daily guidance, performance feedback, and career coaching.",
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        icon: Target,
        title: "Live Client Projects",
        description: "Work on real, high-value client deliverables — not simulations. Your work directly impacts businesses across Somalia and East Africa.",
        color: "text-rose-600",
        bg: "bg-rose-50"
    },
    {
        icon: Award,
        title: "Professional Certification",
        description: "Graduates receive a Merit Advisory Internship Certificate, recognized across the industry, plus a detailed professional reference letter.",
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        icon: TrendingUp,
        title: "Job Market Readiness",
        description: "Master the accounting tools, ERP systems, and software platforms that are in highest demand in today's professional job market.",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        icon: Globe,
        title: "Merit Advisory Membership",
        description: "Upon graduation, you join the Merit Advisory alumni community with access to our global professional network, job referrals, and events.",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    }
]

const timeline = [
    { step: "Submit Application", desc: "Fill out the application form below and upload your CV and motivation statement.", icon: FileText },
    { step: "Screening & Review", desc: "Our team reviews your profile. Top candidates are invited to an orientation interview.", icon: Shield },
    { step: "Orientation Bootcamp", desc: "A 2-week kick-off bootcamp to align on tools, culture, expectations, and your track goals.", icon: Lightbulb },
    { step: "Mentored Projects", desc: "5-month intensive on-the-job learning cycle with real client projects and weekly mentoring sessions.", icon: Users },
    { step: "Evaluation & Graduation", desc: "Final capstone presentation, 360° feedback, certification ceremony, and membership activation.", icon: Award },
]

const TOTAL_STEPS = 3

const heroBackgrounds = [
    "/internship/bg-1.jpg",
    "/internship/bg-2.jpg",
    "/internship/bg-3.jpg"
]

export default function InternshipPage() {
    const [step, setStep] = React.useState(1)
    const [submitting, setSubmitting] = React.useState(false)
    const [submitted, setSubmitted] = React.useState(false)
    const [selectedTrack, setSelectedTrack] = React.useState("")
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [bgIndex, setBgIndex] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex(prev => (prev + 1) % heroBackgrounds.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        university: "",
        degree: "",
        graduationYear: "",
        track: "",
        motivation: "",
        resumeText: "",
        cvFile: null as File | null
    })

    const set = (field: string, val: any) => setFormData(prev => ({ ...prev, [field]: val }))

    const validateStep = (s: number) => {
        const e: Record<string, string> = {}
        if (s === 1) {
            if (!formData.name.trim()) e.name = "Full name is required"
            if (!formData.email.includes("@")) e.email = "Valid email is required"
            if (!formData.phone.trim()) e.phone = "Phone number is required"
        }
        if (s === 2) {
            if (!formData.university.trim()) e.university = "University name is required"
            if (!formData.degree) e.degree = "Please select your degree level"
            if (!selectedTrack) e.track = "Please select an internship track"
        }
        if (s === 3) {
            if (!formData.motivation.trim() || formData.motivation.trim().length < 50)
                e.motivation = "Please write at least 50 characters about your motivation"
            if (!formData.cvFile) e.cvFile = "Please upload your CV"
        }
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const next = () => {
        if (validateStep(step)) setStep(s => Math.min(s + 1, TOTAL_STEPS))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateStep(3)) return
        setSubmitting(true)
        try {
            const data = new FormData()
            data.append("jobId", "internship-program")
            data.append("name", formData.name)
            data.append("email", formData.email)
            data.append("phone", formData.phone)
            data.append("linkedin", formData.linkedin)
            data.append("degree", formData.degree)
            data.append("resumeText", `Track: ${selectedTrack} | University: ${formData.university} | Graduation: ${formData.graduationYear} | Motivation: ${formData.motivation}`)
            if (formData.cvFile) data.append("cvFile", formData.cvFile)

            const res = await fetch("/api/applications", { method: "POST", body: data })
            const json = await res.json()
            if (res.ok) {
                setSubmitted(true)
            } else {
                toast.error(json.error || "Failed to submit application")
            }
        } catch {
            toast.error("An error occurred. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            {/* ─── HERO ─── */}
            <section className="relative pt-36 pb-28 overflow-hidden bg-slate-950">
                {/* Sliding and Fading Background Slideshow */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={bgIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 0.35, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${heroBackgrounds[bgIndex]})` }}
                        />
                    </AnimatePresence>
                    {/* Multi-layered smooth overlays for maximum legibility and design depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-red-600/20 rounded-full blur-[160px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Badge className="mb-6 border-red-500/30 bg-red-500/10 text-red-400 text-[11px] uppercase tracking-widest font-black px-5 py-2 rounded-full">
                            <Sparkles className="h-3 w-3 mr-2 inline" />
                            Future Leaders Program · 2026 Cohort Open
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6"
                    >
                        Launch Your Career with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">
                            6 Months
                        </span>{" "}
                        of Real-World Experience
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-10"
                    >
                        Merit Advisory's internship program is designed for fresh graduates eager to gain practical, job-ready skills in ERP systems, IT & software engineering, and financial advisory — completely free of charge.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            size="lg"
                            className="bg-[#e31e24] hover:bg-red-700 text-white font-black px-10 py-7 h-auto rounded-2xl text-lg shadow-2xl shadow-red-500/20 border-none"
                            onClick={() => document.getElementById("apply-section")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Apply Now — It's Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-bold px-10 py-7 h-auto rounded-2xl"
                            onClick={() => document.getElementById("tracks-section")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Explore Tracks
                        </Button>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {[
                            { num: "6", label: "Months Duration" },
                            { num: "3", label: "Specialization Tracks" },
                            { num: "100%", label: "Free Program" },
                            { num: "10+", label: "Available Spots" },
                        ].map(stat => (
                            <div key={stat.label} className="rounded-2xl bg-white/5 border border-white/10 px-6 py-5">
                                <p className="text-3xl font-black text-white mb-1">{stat.num}</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── ABOUT THE PROGRAM ─── */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <Badge variant="outline" className="mb-4 border-red-200 bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest">About the Program</Badge>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-6">
                                More Than an Internship —<br />
                                <span className="text-[#e31e24]">A Career Launchpad</span>
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed mb-6">
                                Merit Advisory's <strong>Future Leaders Internship Program</strong> is a structured 6-month professional development experience tailored for fresh university graduates across Somalia and East Africa. From day one, you'll be embedded in real client engagements working alongside experienced consultants, auditors, and engineers.
                            </p>
                            <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                The program is entirely free — we provide all learning materials, software tools, professional resources, and mentorship at no cost. Our goal is simple: to equip the next generation of Somali professionals with globally competitive skills and unlock their full potential.
                            </p>
                            <div className="space-y-3">
                                {[
                                    "Open to all recent graduates (0–2 years post-graduation)",
                                    "Hybrid format: on-site and flexible remote work",
                                    "Full access to professional tools and software",
                                    "Pathway to full-time employment for top performers",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Clock, label: "Duration", value: "6 Months", color: "bg-blue-50 text-blue-600" },
                                { icon: MapPin, label: "Location", value: "Somalia (Hybrid)", color: "bg-purple-50 text-purple-600" },
                                { icon: Briefcase, label: "Type", value: "Internship", color: "bg-rose-50 text-rose-600" },
                                { icon: GraduationCap, label: "Eligibility", value: "Fresh Graduate", color: "bg-emerald-50 text-emerald-600" },
                                { icon: Star, label: "Stipend", value: "No Fee + Free Tools", color: "bg-amber-50 text-amber-600" },
                                { icon: Users, label: "Cohort Size", value: "10+ Interns", color: "bg-indigo-50 text-indigo-600" },
                            ].map((item) => (
                                <Card key={item.label} className="p-5 rounded-2xl border-none shadow-md shadow-slate-100">
                                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-3", item.color.split(" ")[0])}>
                                        <item.icon className={cn("h-5 w-5", item.color.split(" ")[1])} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                                    <p className="text-sm font-black text-slate-900">{item.value}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── TRACKS ─── */}
            <section id="tracks-section" className="py-20 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-14">
                        <Badge variant="outline" className="mb-4 border-red-200 bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest">Specialization Tracks</Badge>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                            Choose Your Path
                        </h2>
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                            Select the specialization that aligns with your academic background and career ambitions. All tracks are equally intensive and professionally rewarding.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {tracks.map((track, i) => (
                            <motion.div
                                key={track.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="h-full p-8 rounded-[2rem] border-none shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300 group">
                                    <div className={cn("h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg mb-6", track.color)}>
                                        <track.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#e31e24] transition-colors">{track.title}</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{track.subtitle}</p>
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">{track.description}</p>
                                    <div className="space-y-2 mb-6">
                                        {track.skills.map(s => (
                                            <div key={s} className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                                                <span className="text-xs font-bold text-slate-600">{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={cn("rounded-xl p-3 text-xs font-bold", track.bg, track.textColor)}>
                                        🎯 {track.outcome}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── BENEFITS ─── */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-14">
                        <Badge variant="outline" className="mb-4 border-red-200 bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest">What You Get</Badge>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                            We invest in your future. From day one, you'll have access to world-class resources, expert mentors, and real projects.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <Card className="h-full p-7 rounded-[1.75rem] border-none shadow-lg shadow-slate-100 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300">
                                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-5 shrink-0", b.bg)}>
                                        <b.icon className={cn("h-6 w-6", b.color)} />
                                    </div>
                                    <h3 className="text-base font-black text-slate-900 mb-2">{b.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{b.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TIMELINE ─── */}
            <section className="py-20 bg-slate-950">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="text-center mb-14">
                        <Badge className="mb-4 bg-white/10 text-white border-none font-black text-[10px] uppercase tracking-widest">Program Roadmap</Badge>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
                            Your Journey, Step by Step
                        </h2>
                        <p className="text-slate-400 font-medium max-w-2xl mx-auto">
                            From application to graduation — a clear and structured path designed for your professional transformation.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-800" />
                        <div className="space-y-8">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-8 relative"
                                >
                                    <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 z-10">
                                        <item.icon className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="pt-1 pb-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Step {i + 1}</span>
                                        </div>
                                        <h4 className="text-lg font-black text-white mb-1">{item.step}</h4>
                                        <p className="text-slate-400 font-medium text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ELIGIBILITY ─── */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-red-50/30">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <Badge variant="outline" className="mb-4 border-red-200 bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest">Who Can Apply</Badge>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-6">
                                Eligibility Criteria
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Education", desc: "Bachelor's degree in Computer Science, IT, Accounting, Finance, Business Administration, or a related field." },
                                    { title: "Experience Level", desc: "Fresh graduate or up to 2 years post-graduation. Final-year students completing their degree are also eligible." },
                                    { title: "Skills", desc: "Strong willingness to learn, problem-solve, and collaborate. Basic computer proficiency required." },
                                    { title: "Language", desc: "Proficiency in Somali is required. English language skills are an advantage but not mandatory." },
                                    { title: "Availability", desc: "Must be available for a minimum of 4 days per week (hybrid on-site and remote)." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white shadow-sm shadow-slate-100 border border-slate-100">
                                        <div className="h-8 w-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="h-4 w-4 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 mb-1">{item.title}</p>
                                            <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Badge variant="outline" className="mb-4 border-emerald-200 bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest">Membership Benefits</Badge>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-6">
                                Become Part of Merit Advisory
                            </h2>
                            <Card className="p-8 rounded-[2rem] border-none shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white mb-6">
                                <div className="h-14 w-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-6">
                                    <Globe className="h-7 w-7 text-red-400" />
                                </div>
                                <h3 className="text-xl font-black mb-4">Merit Advisory Alumni Membership</h3>
                                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-6">
                                    All internship graduates are inducted into the <strong className="text-white">Merit Advisory Professional Community</strong> — a growing network of auditors, ERP consultants, financial advisors, and software engineers across Somalia and the diaspora.
                                </p>
                                <div className="space-y-3">
                                    {[
                                        "Priority access to full-time job openings",
                                        "Exclusive networking events and webinars",
                                        "Continued access to learning resources",
                                        "Professional reference and recommendations",
                                        "Eligibility for advanced freelance project referrals",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Star className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                            <p className="text-sm text-slate-300 font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── APPLICATION FORM ─── */}
            <section id="apply-section" className="py-24 bg-white">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-red-200 bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest">Applications Open</Badge>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                            Apply for the 2026 Cohort
                        </h2>
                        <p className="text-slate-500 font-medium">
                            Complete this short form to register your interest. We'll review your application and contact you within 5 business days.
                        </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-center gap-3 mb-10">
                        {[1, 2, 3].map(n => (
                            <React.Fragment key={n}>
                                <div className={cn(
                                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-black transition-all",
                                    n < step ? "bg-green-500 text-white" :
                                    n === step ? "bg-[#e31e24] text-white shadow-lg shadow-red-500/20" :
                                    "bg-slate-100 text-slate-400"
                                )}>
                                    {n < step ? <CheckCircle2 className="h-5 w-5" /> : n}
                                </div>
                                {n < 3 && <div className={cn("h-px w-16 transition-all", n < step ? "bg-green-400" : "bg-slate-200")} />}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 px-2">
                        <span className={step >= 1 ? "text-slate-700" : ""}>Personal Info</span>
                        <span className={step >= 2 ? "text-slate-700" : ""}>Academic Details</span>
                        <span className={step >= 3 ? "text-slate-700" : ""}>Motivation & CV</span>
                    </div>

                    <Card className="p-8 md:p-12 rounded-[2.5rem] border-none shadow-2xl shadow-slate-200">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4">
                                        Application Received! 🎉
                                    </h3>
                                    <p className="text-slate-500 font-medium mb-2">
                                        Thank you, <strong className="text-slate-700">{formData.name.split(" ")[0]}</strong>! Your internship application has been successfully submitted.
                                    </p>
                                    <p className="text-slate-400 text-sm font-medium mb-10">
                                        Our team will review your profile and reach out within 5 business days. Please check your email at <strong>{formData.email}</strong>.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button asChild className="bg-[#e31e24] hover:bg-red-700 text-white rounded-2xl font-black px-8 py-6 h-auto border-none">
                                            <Link href="/careers">View Other Positions</Link>
                                        </Button>
                                        <Button asChild variant="outline" className="rounded-2xl font-bold px-8 py-6 h-auto">
                                            <Link href="/">Back to Home</Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <AnimatePresence mode="wait">

                                        {/* ── STEP 1 ── */}
                                        {step === 1 && (
                                            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-6">
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 mb-1">Personal Information</h3>
                                                    <p className="text-sm text-slate-400 font-medium">Tell us who you are.</p>
                                                </div>
                                                <Field label="Full Name *" error={errors.name}>
                                                    <Input required placeholder="e.g. Faadumo Ahmed Ali" className="rounded-xl bg-slate-50 border-slate-200 py-6 font-medium focus:ring-2 focus:ring-red-400" value={formData.name} onChange={e => set("name", e.target.value)} />
                                                </Field>
                                                <Field label="Email Address *" error={errors.email}>
                                                    <Input required type="email" placeholder="faadumo@example.com" className="rounded-xl bg-slate-50 border-slate-200 py-6 font-medium focus:ring-2 focus:ring-red-400" value={formData.email} onChange={e => set("email", e.target.value)} />
                                                </Field>
                                                <Field label="Phone Number *" error={errors.phone}>
                                                    <Input required placeholder="+252 6..." className="rounded-xl bg-slate-50 border-slate-200 py-6 font-medium focus:ring-2 focus:ring-red-400" value={formData.phone} onChange={e => set("phone", e.target.value)} />
                                                </Field>
                                                <Field label="LinkedIn Profile (Optional)">
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 rounded p-1">
                                                            <Linkedin className="h-3 w-3 text-white" />
                                                        </div>
                                                        <Input placeholder="https://linkedin.com/in/your-profile" className="rounded-xl bg-slate-50 border-slate-200 py-6 pl-12 font-medium focus:ring-2 focus:ring-red-400" value={formData.linkedin} onChange={e => set("linkedin", e.target.value)} />
                                                    </div>
                                                </Field>
                                            </motion.div>
                                        )}

                                        {/* ── STEP 2 ── */}
                                        {step === 2 && (
                                            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-6">
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 mb-1">Academic Background</h3>
                                                    <p className="text-sm text-slate-400 font-medium">Tell us about your education and preferred track.</p>
                                                </div>
                                                <Field label="University / Institution *" error={errors.university}>
                                                    <Input required placeholder="e.g. Mogadishu University" className="rounded-xl bg-slate-50 border-slate-200 py-6 font-medium focus:ring-2 focus:ring-red-400" value={formData.university} onChange={e => set("university", e.target.value)} />
                                                </Field>
                                                <Field label="Degree Level *" error={errors.degree}>
                                                    <div className="relative">
                                                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                        <select required className="w-full rounded-xl bg-slate-50 border border-slate-200 py-4 pl-12 pr-10 font-medium focus:ring-2 focus:ring-red-400 outline-none text-slate-600 appearance-none cursor-pointer" value={formData.degree} onChange={e => set("degree", e.target.value)}>
                                                            <option value="" disabled>Select your degree</option>
                                                            <option value="Bachelor">Bachelor's Degree</option>
                                                            <option value="Master">Master's Degree</option>
                                                            <option value="Diploma">Professional Diploma</option>
                                                            <option value="FinalYear">Final Year Student</option>
                                                        </select>
                                                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 rotate-90 pointer-events-none" />
                                                    </div>
                                                </Field>
                                                <Field label="Graduation Year">
                                                    <Input placeholder="e.g. 2024 or 2025" className="rounded-xl bg-slate-50 border-slate-200 py-6 font-medium focus:ring-2 focus:ring-red-400" value={formData.graduationYear} onChange={e => set("graduationYear", e.target.value)} />
                                                </Field>
                                                <Field label="Preferred Internship Track *" error={errors.track}>
                                                    <div className="grid gap-3">
                                                        {tracks.map(t => (
                                                            <button type="button" key={t.id} onClick={() => { setSelectedTrack(t.id); set("track", t.id) }}
                                                                className={cn(
                                                                    "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all font-medium",
                                                                    selectedTrack === t.id
                                                                        ? "border-red-500 bg-red-50 text-red-700"
                                                                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                                                                )}>
                                                                <div className={cn("h-10 w-10 rounded-xl shrink-0 bg-gradient-to-br flex items-center justify-center", t.color)}>
                                                                    <t.icon className="h-5 w-5 text-white" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-black text-sm">{t.title}</p>
                                                                    <p className="text-xs text-slate-400">{t.subtitle}</p>
                                                                </div>
                                                                {selectedTrack === t.id && <CheckCircle2 className="h-5 w-5 text-red-500 ml-auto shrink-0" />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    {errors.track && <p className="text-xs text-red-500 font-medium mt-1">{errors.track}</p>}
                                                </Field>
                                            </motion.div>
                                        )}

                                        {/* ── STEP 3 ── */}
                                        {step === 3 && (
                                            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-6">
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 mb-1">Motivation & Documents</h3>
                                                    <p className="text-sm text-slate-400 font-medium">Tell us why you want to join and upload your CV.</p>
                                                </div>
                                                <Field label="Why do you want to join this internship? *" error={errors.motivation}>
                                                    <Textarea required placeholder="Share your goals, what you hope to learn, and how this internship fits into your career plan... (minimum 50 characters)" className="rounded-xl bg-slate-50 border-slate-200 min-h-[140px] font-medium focus:ring-2 focus:ring-red-400 resize-none" value={formData.motivation} onChange={e => set("motivation", e.target.value)} />
                                                    <p className="text-xs text-slate-400 mt-1">{formData.motivation.length} / 50 characters minimum</p>
                                                </Field>
                                                <Field label="Upload Your CV (PDF or DOC) *" error={errors.cvFile}>
                                                    <div className={cn(
                                                        "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
                                                        formData.cvFile ? "border-green-400 bg-green-50" : "border-slate-200 bg-slate-50 hover:border-red-300 hover:bg-red-50/30"
                                                    )}>
                                                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="cv-upload" onChange={e => { const f = e.target.files?.[0]; if (f) set("cvFile", f) }} />
                                                        <label htmlFor="cv-upload" className="cursor-pointer">
                                                            {formData.cvFile ? (
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                                                                    <p className="font-black text-green-700">{formData.cvFile.name}</p>
                                                                    <p className="text-xs text-green-600">File ready to upload — click to replace</p>
                                                                </div>
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <FileText className="h-10 w-10 text-slate-300" />
                                                                    <p className="font-black text-slate-600">Drag & Drop or Click to Upload</p>
                                                                    <p className="text-xs text-slate-400">Supported formats: PDF, DOC, DOCX · Max 10MB</p>
                                                                </div>
                                                            )}
                                                        </label>
                                                    </div>
                                                </Field>
                                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                                    <p className="text-xs text-slate-500 font-medium">
                                                        By submitting this application, you confirm that the information provided is accurate and you agree to our{" "}
                                                        <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>.
                                                        Your data will be handled in full confidentiality.
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}

                                    </AnimatePresence>

                                    {/* Navigation buttons */}
                                    <div className="flex gap-4 mt-10">
                                        {step > 1 && (
                                            <Button type="button" variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-2xl font-bold px-6 py-6 h-auto flex-1">
                                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                            </Button>
                                        )}
                                        {step < TOTAL_STEPS ? (
                                            <Button type="button" onClick={next} className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black px-8 py-6 h-auto flex-1 border-none">
                                                Continue <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button type="submit" disabled={submitting} className="bg-[#e31e24] hover:bg-red-700 text-white rounded-2xl font-black px-8 py-6 h-auto flex-1 border-none shadow-lg shadow-red-500/20">
                                                {submitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : <><Send className="mr-2 h-5 w-5" /> Submit Application</>}
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Footer note */}
                    {!submitted && (
                        <p className="text-center text-xs text-slate-400 font-medium mt-6">
                            Questions? Email us at{" "}
                            <a href="mailto:internship@meritadvisory.so" className="text-red-500 font-bold hover:underline">
                                internship@meritadvisory.so
                            </a>
                        </p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    )
}

/* Helper field wrapper */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
            {children}
            {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
        </div>
    )
}
