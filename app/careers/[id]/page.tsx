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
    Briefcase, 
    MapPin, 
    Users, 
    ArrowLeft, 
    Loader2, 
    CheckCircle2, 
    Calendar, 
    ChevronRight, 
    Send,
    FileText,
    Trophy,
    Linkedin,
    GraduationCap
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface Job {
    id: string
    title: string
    location: string
    type: string
    department: string
    closingDate: string
    description: string
    responsibilities: string[]
    requirements: string[]
    process: { step: string; description: string }[]
}

export default function JobDetailPage() {
    const params = useParams()
    const id = params.id
    const [job, setJob] = React.useState<Job | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [isApplying, setIsApplying] = React.useState(false)
    const [submitted, setSubmitted] = React.useState(false)

    // Form State
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        degree: "",
        resumeText: "",
        cvFile: null as File | null
    })

    React.useEffect(() => {
        if (id) {
            fetch(`/api/jobs/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setJob(data)
                    }
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsApplying(true)

        try {
            const submitData = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'cvFile') submitData.append(key, value as string)
            })
            if (formData.cvFile) {
                submitData.append('cvFile', formData.cvFile)
            }
            submitData.append('jobId', id as string)

            const response = await fetch("/api/applications", {
                method: "POST",
                body: submitData
            })

            const result = await response.json()
            if (response.ok) {
                setSubmitted(true)
                toast.success("Application submitted successfully!")
            } else {
                toast.error(result.error || "Failed to submit application")
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
        } finally {
            setIsApplying(false)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center pt-32 pb-24">
                    <Loader2 className="h-10 w-10 animate-spin text-[#b22222]" />
                </main>
                <Footer />
            </div>
        )
    }

    if (!job) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24">
                    <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
                    <Button asChild variant="outline" className="rounded-full">
                        <Link href="/careers">Return to Careers</Link>
                    </Button>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50/50">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-24">
                {/* Header Section */}
                <div className="bg-[#1e4e8c] text-white pt-12 pb-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] -mr-64 -mt-64" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400 rounded-full blur-[100px] -ml-32 -mb-32" />
                    </div>
                    
                    <div className="mx-auto max-w-7xl px-6 relative z-10">
                        <Link 
                            href="/careers" 
                            className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-8 font-bold text-sm"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            All Positions
                        </Link>
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-3xl">
                                <Badge className="bg-blue-500/20 text-blue-100 border-none mb-4 py-1.5 px-4 font-black uppercase tracking-widest text-xs">
                                    {job.department}
                                </Badge>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                                    {job.title}
                                </h1>
                                <div className="flex flex-wrap gap-6 text-blue-100/80 font-bold">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-blue-400" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-blue-400" />
                                        Closing: {new Date(job.closingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-blue-400" />
                                        {job.type}
                                    </div>
                                </div>
                            </div>
                            <Button 
                                size="lg"
                                className="bg-[#b22222] hover:bg-[#8b0000] text-white px-10 py-7 rounded-2xl font-black text-lg h-auto shadow-2xl shadow-red-900/40 border-none shrink-0"
                                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 -mt-12 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Content Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Job Overview */}
                            <Card className="p-8 md:p-12 rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
                                <h2 className="text-3xl font-black mb-8 text-[#1e4e8c] flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-[#1e4e8c]" />
                                    </div>
                                    About the Role
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium mb-12">
                                    {job.description}
                                </p>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div>
                                        <h3 className="text-xl font-black mb-6 text-slate-900 flex items-center gap-2">
                                            Key Responsibilities
                                        </h3>
                                        <ul className="space-y-4">
                                            {job.responsibilities.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black mb-6 text-slate-900 flex items-center gap-2">
                                            Requirements
                                        </h3>
                                        <ul className="space-y-4">
                                            {job.requirements.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card>

                            {/* Recruitment Process */}
                            <Card className="p-8 md:p-12 rounded-[2rem] border-none shadow-xl shadow-slate-200/50 bg-slate-900 text-white">
                                <h2 className="text-3xl font-black mb-12 text-blue-400">Recruitment Process</h2>
                                <div className="space-y-8">
                                    {job.process.map((p, i) => (
                                        <div key={i} className="flex gap-6 relative">
                                            {i !== job.process.length - 1 && (
                                                <div className="absolute left-6 top-12 bottom-0 w-px bg-slate-700" />
                                            )}
                                            <div className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-blue-400 shrink-0 z-10">
                                                {i + 1}
                                            </div>
                                            <div className="pt-1">
                                                <h4 className="text-lg font-black mb-2">{p.step}</h4>
                                                <p className="text-slate-400 font-medium">{p.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar / Form Column */}
                        <div className="space-y-8">
                            <Card id="apply-form" className="p-8 md:p-10 rounded-[2rem] border-none shadow-2xl shadow-slate-200 border-t-4 border-t-[#b22222]">
                                {submitted ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-4 text-slate-900">Application Received!</h3>
                                        <p className="text-slate-500 font-medium mb-8">
                                            Thank you, {formData.name.split(' ')[0]}. We've successfully received your application. A member of our recruitment team will review your profile and get in touch with you soon.
                                        </p>

                                        <Button asChild variant="outline" className="w-full rounded-2xl py-6 h-auto font-black">
                                            <Link href="/careers">Back to Careers</Link>
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black text-slate-900 mb-2">Apply for this Role</h3>
                                            <p className="text-slate-500 font-medium text-sm">Please provide your details and experience below.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Name *</label>
                                                <Input 
                                                    required
                                                    placeholder="e.g. Ahmed Ali"
                                                    className="rounded-xl bg-slate-50 border-slate-100 py-6 font-medium focus:ring-2 focus:ring-blue-500"
                                                    value={formData.name}
                                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Email *</label>
                                                <Input 
                                                    required
                                                    type="email"
                                                    placeholder="ahmed@example.com"
                                                    className="rounded-xl bg-slate-50 border-slate-100 py-6 font-medium focus:ring-2 focus:ring-blue-500"
                                                    value={formData.email}
                                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Phone Number *</label>
                                                <Input 
                                                    required
                                                    placeholder="+252"
                                                    className="rounded-xl bg-slate-50 border-slate-100 py-6 font-medium focus:ring-2 focus:ring-blue-500"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">LinkedIn Profile</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 rounded p-1">
                                                        <Linkedin className="h-3 w-3 text-white" />
                                                    </div>
                                                    <Input 
                                                        placeholder="e.g. https://www.linkedin.com/in/ahmed"
                                                        className="rounded-xl bg-slate-50 border-slate-100 py-6 pl-12 font-medium focus:ring-2 focus:ring-blue-500"
                                                        value={formData.linkedin}
                                                        onChange={e => setFormData({...formData, linkedin: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Highest Degree *</label>
                                                <div className="relative group">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                                        <GraduationCap className="h-5 w-5" />
                                                    </div>
                                                    <select 
                                                        required
                                                        className="w-full rounded-xl bg-slate-50 border border-slate-100 py-4 pl-12 pr-10 font-medium focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 appearance-none cursor-pointer hover:bg-slate-100/50 transition-all"
                                                        value={formData.degree}
                                                        onChange={e => setFormData({...formData, degree: e.target.value})}
                                                    >
                                                        <option value="" disabled>Select your degree</option>
                                                        <option value="Bachelor">Bachelor's Degree</option>
                                                        <option value="Master">Master's Degree</option>
                                                        <option value="PhD">PhD / Doctorate</option>
                                                        <option value="Diploma">Professional Diploma</option>
                                                        <option value="Other">Other Certification</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <ChevronRight className="h-4 w-4 rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                             <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Upload CV (PDF/DOC) *</label>
                                                <div className="relative group">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#b22222] transition-colors">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <Input 
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        required
                                                        className="rounded-xl bg-slate-50 border-slate-100 py-2 pl-12 font-medium focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                                        onChange={e => {
                                                            const file = e.target.files?.[0]
                                                            if (file) setFormData({...formData, cvFile: file})
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Additional Information (Optional)</label>
                                                <Textarea 
                                                    placeholder="Anything else you'd like to tell us..."
                                                    className="rounded-xl bg-slate-50 border-slate-100 min-h-[100px] font-medium focus:ring-2 focus:ring-blue-500"
                                                    value={formData.resumeText}
                                                    onChange={e => setFormData({...formData, resumeText: e.target.value})}
                                                />
                                            </div>

                                            <p className="text-[10px] text-slate-400 flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-blue-500" />
                                                We will handle your personal data as described in our Privacy Policy.
                                            </p>

                                            <Button 
                                                type="submit"
                                                disabled={isApplying}
                                                className="w-full rounded-2xl py-7 h-auto bg-[#1e4e8c] hover:bg-[#153a6a] text-white font-black text-lg transition-all shadow-xl shadow-blue-900/20 active:scale-95 border-none"
                                            >
                                                {isApplying ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        Apply
                                                        <Send className="ml-2 h-5 w-5" />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </Card>

                            {/* Why Merit Advisory? */}
                            <Card className="p-8 rounded-[2rem] border-none shadow-lg bg-white">
                                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-amber-500" />
                                    Why Merit Advisory?
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Work with world-class ERP experts and consultants.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Opportunities for rapid career growth and learning.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Impactful projects that transform businesses in Somalia.</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
