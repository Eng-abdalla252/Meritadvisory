"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
    Users, 
    Search, 
    Filter, 
    MoreVertical, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    BrainCircuit,
    Download,
    Mail,
    Phone,
    Briefcase,
    ChevronRight,
    ArrowUpRight,
    Loader2,
    Linkedin,
    GraduationCap
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface Application {
    id: string
    jobId: string
    jobTitle: string
    name: string
    email: string
    phone: string
    linkedin: string
    degree: string
    resumeText: string
    aiScore: number
    status: string
    appliedAt: string
}

export default function RecruitmentDashboard() {
    const [applications, setApplications] = React.useState<Application[]>([])
    const [loading, setLoading] = React.useState(true)
    const [filter, setFilter] = React.useState("All")
    const [selectedApp, setSelectedApp] = React.useState<Application | null>(null)

    const fetchApplications = async () => {
        try {
            const res = await fetch("/api/applications")
            const data = await res.json()
            setApplications(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchApplications()
    }, [])

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            })
            if (res.ok) {
                toast.success(`Status updated to ${newStatus}`)
                fetchApplications()
                if (selectedApp?.id === id) {
                    setSelectedApp({ ...selectedApp, status: newStatus })
                }
            }
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    const filteredApps = applications.filter(app => 
        filter === "All" ? true : app.status === filter
    )

    const stats = {
        total: applications.length,
        shortlisted: applications.filter(a => a.status === "Shortlisted").length,
        highMatch: applications.filter(a => a.aiScore >= 80).length,
        newToday: applications.filter(a => new Date(a.appliedAt).toDateString() === new Date().toDateString()).length
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50/50">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Recruitment Dashboard</h1>
                            <p className="text-slate-500 font-medium">Manage job applications and AI-powered candidate screening.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="rounded-xl border-slate-200 font-bold">
                                <Download className="mr-2 h-4 w-4" />
                                Export CSV
                            </Button>
                            <Button className="bg-[#1e4e8c] hover:bg-[#153a6a] rounded-xl font-bold">
                                Post New Job
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Total Applicants", value: stats.total, icon: Users, color: "blue" },
                            { label: "Shortlisted", value: stats.shortlisted, icon: CheckCircle2, color: "green" },
                            { label: "High AI Match", value: stats.highMatch, icon: BrainCircuit, color: "purple" },
                            { label: "New Today", value: stats.newToday, icon: Clock, color: "orange" }
                        ].map((stat, i) => (
                            <Card key={i} className="p-6 rounded-2xl border-none shadow-sm flex items-center gap-4">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Applications Table */}
                        <div className="lg:col-span-2">
                            <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50 overflow-hidden">
                                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
                                    <div className="flex gap-2">
                                        {["All", "New", "Shortlisted", "Rejected"].map(f => (
                                            <Button 
                                                key={f}
                                                size="sm"
                                                variant={filter === f ? "default" : "ghost"}
                                                className={`rounded-full px-4 font-bold ${filter === f ? "bg-slate-900 text-white" : "text-slate-500"}`}
                                                onClick={() => setFilter(f)}
                                            >
                                                {f}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input 
                                            placeholder="Search applicants..." 
                                            className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm font-medium focus:ring-2 focus:ring-blue-500 w-64"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                                            <tr>
                                                <th className="px-6 py-4">Applicant</th>
                                                <th className="px-6 py-4">Position</th>
                                                <th className="px-6 py-4">AI Score</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Date</th>
                                                <th className="px-6 py-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 bg-white">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan={6} className="py-20 text-center">
                                                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-slate-300" />
                                                    </td>
                                                </tr>
                                            ) : filteredApps.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="py-20 text-center text-slate-400 font-medium">
                                                        No applications found.
                                                    </td>
                                                </tr>
                                            ) : filteredApps.map((app) => (
                                                <tr 
                                                    key={app.id}
                                                    onClick={() => setSelectedApp(app)}
                                                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${selectedApp?.id === app.id ? "bg-blue-50/50" : ""}`}
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">
                                                                {app.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-900">{app.name}</p>
                                                                <p className="text-xs text-slate-400 font-medium">{app.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge variant="outline" className="rounded-lg font-bold text-slate-500 border-slate-200">
                                                            {app.jobTitle.split(' ')[0]}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`h-2 w-12 rounded-full bg-slate-100 overflow-hidden`}>
                                                                <div 
                                                                    className={`h-full ${app.aiScore >= 80 ? "bg-green-500" : app.aiScore >= 50 ? "bg-blue-500" : "bg-amber-500"}`}
                                                                    style={{ width: `${app.aiScore}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-black text-slate-700">{app.aiScore}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge className={`rounded-full font-black text-[10px] uppercase tracking-wider border-none ${
                                                            app.status === "Shortlisted" ? "bg-green-100 text-green-700" :
                                                            app.status === "Rejected" ? "bg-red-100 text-red-700" :
                                                            "bg-blue-100 text-blue-700"
                                                        }`}>
                                                            {app.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-bold text-slate-400">
                                                        {new Date(app.appliedAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <ChevronRight className="h-5 w-5 text-slate-300" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>

                        {/* Candidate Details Sidebar */}
                        <div className="lg:col-span-1">
                            <AnimatePresence mode="wait">
                                {selectedApp ? (
                                    <motion.div
                                        key={selectedApp.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/50 bg-white sticky top-32">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="h-16 w-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-black">
                                                    {selectedApp.name.charAt(0)}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon" 
                                                        className="rounded-xl"
                                                        onClick={() => updateStatus(selectedApp.id, "Rejected")}
                                                    >
                                                        <XCircle className="h-5 w-5 text-red-500" />
                                                    </Button>
                                                    <Button 
                                                        className="bg-green-600 hover:bg-green-700 rounded-xl"
                                                        onClick={() => updateStatus(selectedApp.id, "Shortlisted")}
                                                    >
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="mb-8">
                                                <h3 className="text-2xl font-black text-slate-900 mb-1">{selectedApp.name}</h3>
                                                <p className="text-[#1e4e8c] font-black uppercase text-xs tracking-widest">{selectedApp.jobTitle}</p>
                                            </div>

                                            <div className="space-y-6 mb-10">
                                                <div className="flex items-center gap-4 text-slate-500 font-medium">
                                                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                                        <Mail className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-sm truncate">{selectedApp.email}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-slate-500 font-medium">
                                                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                                        <Phone className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-sm">{selectedApp.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-slate-500 font-medium">
                                                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                                        <BrainCircuit className="h-5 w-5 text-purple-500" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Compatibility</span>
                                                        <span className="text-sm font-black text-slate-900">{selectedApp.aiScore}% Match Score</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                                        <GraduationCap className="h-4 w-4" />
                                                        Education
                                                    </h4>
                                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none font-bold px-4 py-2 rounded-xl text-sm">
                                                        {selectedApp.degree} Degree
                                                    </Badge>
                                                </div>
                                                
                                                {selectedApp.linkedin && (
                                                    <div>
                                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                                            <Linkedin className="h-4 w-4" />
                                                            Professional Profile
                                                        </h4>
                                                        <a 
                                                            href={selectedApp.linkedin} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-blue-600 font-bold hover:underline flex items-center gap-1"
                                                        >
                                                            View LinkedIn Profile
                                                            <ArrowUpRight className="h-3 w-3" />
                                                        </a>
                                                    </div>
                                                )}

                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Professional Intro / Resume</h4>
                                                    <div className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-[1.5rem] whitespace-pre-wrap border border-slate-100">
                                                        {selectedApp.resumeText}
                                                    </div>
                                                </div>
                                            </div>

                                            <Button className="w-full mt-10 rounded-2xl py-6 h-auto bg-slate-900 font-black flex items-center justify-center gap-2">
                                                Schedule Interview
                                                <ArrowUpRight className="h-5 w-5" />
                                            </Button>
                                        </Card>
                                    </motion.div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-center p-12 bg-white rounded-[2rem] border border-dashed border-slate-200">
                                        <div>
                                            <Users className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                            <p className="text-slate-400 font-bold">Select an applicant to view their full profile and AI analysis.</p>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
