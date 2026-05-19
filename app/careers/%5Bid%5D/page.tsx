"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
    MapPin, 
    ChevronRight, 
    Loader2, 
    Send,
    Briefcase,
    Users,
    Clock,
    Home,
    FileText,
    GraduationCap,
    Linkedin,
    Phone,
    User,
    ChevronDown
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
    experience: string
    openings: number
    workMode: string
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

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedin: "",
        degree: "",
        resumeText: ""
    })

    React.useEffect(() => {
        if (id) {
            fetch(`/api/jobs/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) setJob(data)
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsApplying(true)
        try {
            const res = await fetch("/api/admin/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    ...formData, 
                    type: "recruitment",
                    name: `${formData.firstName} ${formData.lastName}`,
                    jobTitle: job?.title,
                    jobId: id 
                })
            })
            if (res.ok) {
                setSubmitted(true)
                toast.success("Application submitted successfully!")
            } else {
                toast.error("Failed to submit application")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsApplying(false)
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin h-10 w-10 text-[#e31e24]" />
        </div>
    )
    
    if (!job) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4 pt-40 text-slate-800">Job Not Found</h1>
            <Link href="/careers">
                <Button className="bg-[#e31e24] hover:bg-red-700 text-white rounded-xl">Back to Careers</Button>
            </Link>
            <Footer />
        </div>
    )

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-24">
                {/* Breadcrumbs */}
                <div className="mx-auto max-w-7xl px-6 mb-8">
                    <nav className="flex items-center gap-2 text-sm font-bold text-slate-400">
                        <Link href="/" className="hover:text-[#e31e24] transition-colors flex items-center gap-1">
                            <Home className="h-4 w-4" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/careers" className="hover:text-[#e31e24] transition-colors">
                            Current Openings
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-slate-800 truncate max-w-[200px] md:max-w-none">{job.title}</span>
                    </nav>
                </div>

                {/* Header Banner Section */}
                <div className="mx-auto max-w-7xl px-6 mb-16">
                    <Card className="p-8 md:p-12 rounded-[2.5rem] border-none bg-slate-50 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-sm border border-slate-100">
                        <div className="flex-1 space-y-8 relative z-10">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1]">
                                {job.title}
                            </h1>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#e31e24]">Location</p>
                                    <p className="text-lg font-bold text-slate-700">{job.location.split(',')[0]}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#e31e24]">Experience</p>
                                    <p className="text-lg font-bold text-slate-700">{job.experience}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#e31e24]">Openings</p>
                                    <p className="text-lg font-bold text-slate-700">{job.openings}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#e31e24]">Work Mode</p>
                                    <p className="text-lg font-bold text-slate-700">{job.workMode}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[400px] aspect-video md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200">
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                                alt="Collaborative workspace" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Card>
                </div>

                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Content Column */}
                        <div className="lg:col-span-2 space-y-16">
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 mb-10 border-l-[6px] border-[#e31e24] pl-6">
                                    Roles and Responsibilities
                                </h2>
                                <ul className="space-y-6">
                                    {job.responsibilities.map((r, i) => (
                                        <li key={i} className="flex gap-4 group">
                                            <div className="h-2.5 w-2.5 rounded-full bg-[#e31e24] shrink-0 mt-2.5 group-hover:scale-150 transition-all duration-300" />
                                            <p className="text-lg text-slate-600 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">{r}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-3xl font-black text-slate-800 mb-10 border-l-[6px] border-slate-300 pl-6 group-hover:border-[#e31e24] transition-colors">
                                    Requirements
                                </h2>
                                <ul className="space-y-6">
                                    {job.requirements.map((r, i) => (
                                        <li key={i} className="flex gap-4 group">
                                            <div className="h-2.5 w-2.5 rounded-full bg-slate-300 shrink-0 mt-2.5 group-hover:bg-[#e31e24] group-hover:scale-125 transition-all duration-300" />
                                            <p className="text-lg text-slate-600 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">{r}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sticky Form Column */}
                        <div className="lg:col-span-1">
                            <Card className="p-10 rounded-[2.5rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] sticky top-32 bg-white border border-slate-50">
                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12"
                                        >
                                            <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8 border border-green-100">
                                                <Send className="h-12 w-12 text-green-600" />
                                            </div>
                                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Application Sent!</h3>
                                            <p className="text-slate-500 font-medium mb-10 text-lg">We've received your application. Our recruitment team will review it and get in touch with you shortly.</p>
                                            <Button asChild className="w-full rounded-2xl py-7 h-auto bg-slate-900 hover:bg-black text-white font-black text-lg shadow-xl shadow-slate-200 border-none transition-all">
                                                <Link href="/careers">Explore More Roles</Link>
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                                Apply for This Job
                                            </h3>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">First Name *</label>
                                                        <Input 
                                                            required
                                                            placeholder="First Name"
                                                            className="rounded-xl bg-slate-50 border-slate-100 py-6 font-bold focus:ring-2 focus:ring-[#e31e24]/20 transition-all"
                                                            value={formData.firstName}
                                                            onChange={e => setFormData({...formData, firstName: e.target.value})}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Last Name *</label>
                                                        <Input 
                                                            required
                                                            placeholder="Last Name"
                                                            className="rounded-xl bg-slate-50 border-slate-100 py-6 font-bold focus:ring-2 focus:ring-[#e31e24]/20 transition-all"
                                                            value={formData.lastName}
                                                            onChange={e => setFormData({...formData, lastName: e.target.value})}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Job Title *</label>
                                                    <div className="relative group">
                                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                        <Input 
                                                            disabled
                                                            className="rounded-xl bg-slate-100 border-none py-6 pl-12 font-bold text-slate-500 cursor-not-allowed"
                                                            value={job.title}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address *</label>
                                                    <Input 
                                                        required
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        className="rounded-xl bg-slate-50 border-slate-100 py-6 font-bold focus:ring-2 focus:ring-[#e31e24]/20 transition-all"
                                                        value={formData.email}
                                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Number *</label>
                                                    <div className="flex gap-2">
                                                        <div className="flex items-center gap-2 px-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-600">
                                                            <span className="text-xl">🇸🇴</span>
                                                            +252
                                                        </div>
                                                        <Input 
                                                            required
                                                            placeholder="Phone Number"
                                                            className="flex-1 rounded-xl bg-slate-50 border-slate-100 py-6 font-bold focus:ring-2 focus:ring-[#e31e24]/20 transition-all"
                                                            value={formData.phone}
                                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Resume / Intro *</label>
                                                    <div className="relative group">
                                                        <FileText className="absolute left-4 top-6 h-5 w-5 text-slate-400" />
                                                        <Textarea 
                                                            required
                                                            placeholder="Briefly describe your experience or paste resume content..."
                                                            className="rounded-xl bg-slate-50 border-slate-100 py-4 pl-12 min-h-[140px] font-bold focus:ring-2 focus:ring-[#e31e24]/20 transition-all"
                                                            value={formData.resumeText}
                                                            onChange={e => setFormData({...formData, resumeText: e.target.value})}
                                                        />
                                                    </div>
                                                </div>

                                                <Button 
                                                    type="submit"
                                                    disabled={isApplying}
                                                    className="w-full rounded-2xl py-7 h-auto bg-[#e31e24] hover:bg-red-700 text-white font-black text-xl transition-all shadow-xl shadow-red-900/20 active:scale-[0.98] border-none"
                                                >
                                                    {isApplying ? (
                                                        <div className="flex items-center gap-2">
                                                            <Loader2 className="h-5 w-5 animate-spin" />
                                                            Sending...
                                                        </div>
                                                    ) : "Submit Application"}
                                                </Button>
                                                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
                                                    Secure Application Process
                                                </p>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
