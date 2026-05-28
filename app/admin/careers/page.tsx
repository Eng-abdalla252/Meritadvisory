"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Save, 
    Plus, 
    Trash2, 
    Loader2, 
    GraduationCap, 
    MapPin, 
    Calendar, 
    Users, 
    Briefcase, 
    CheckCircle2, 
    PlusCircle, 
    MinusCircle,
    ArrowRight
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ProcessStep {
    step: string
    description: string
}

interface Job {
    id: string
    title: string
    location: string
    type: string
    department: string
    closingDate: string
    experience: string
    openings: number
    workMode: string
    description: string
    responsibilities: string[]
    requirements: string[]
    process: ProcessStep[]
}

export default function CareersAdmin() {
    const router = useRouter()
    const [jobs, setJobs] = React.useState<Job[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [activeJobId, setActiveJobId] = React.useState("")
    
    // New job form state
    const [newJob, setNewJob] = React.useState<Partial<Job>>({
        title: "",
        location: "Mogadishu, Somalia",
        type: "Full-time",
        department: "ERP Solutions",
        closingDate: "",
        experience: "2+ years",
        openings: 1,
        workMode: "Hybrid",
        description: "",
        responsibilities: [""],
        requirements: [""],
        process: [{ step: "Initial Screening", description: "Review of qualifications" }]
    })

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/jobs")
            if (res.ok) {
                const data = await res.json()
                setJobs(data)
                if (data.length > 0) {
                    setActiveJobId(data[0].id)
                }
            } else {
                toast.error("Failed to load career listings")
            }
        } catch (error) {
            toast.error("An error occurred loading jobs data")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchJobs()
        }
    }, [router])

    const handleSaveAll = async () => {
        setSaving(true)
        try {
            const res = await fetch("/api/jobs", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobs)
            })
            if (res.ok) {
                toast.success("Careers & Internships saved successfully!")
            } else {
                toast.error("Failed to save changes")
            }
        } catch (error) {
            toast.error("Error connecting to server")
        } finally {
            setSaving(false)
        }
    }

    const handleUpdateJobField = (idx: number, field: keyof Job, value: any) => {
        const updated = [...jobs]
        updated[idx] = { ...updated[idx], [field]: value }
        setJobs(updated)
    }

    const handleArrayItemChange = (jobIdx: number, field: "responsibilities" | "requirements", itemIdx: number, value: string) => {
        const updated = [...jobs]
        const arr = [...updated[jobIdx][field]]
        arr[itemIdx] = value
        updated[jobIdx] = { ...updated[jobIdx], [field]: arr }
        setJobs(updated)
    }

    const handleAddArrayItem = (jobIdx: number, field: "responsibilities" | "requirements") => {
        const updated = [...jobs]
        const arr = [...updated[jobIdx][field], ""]
        updated[jobIdx] = { ...updated[jobIdx], [field]: arr }
        setJobs(updated)
    }

    const handleRemoveArrayItem = (jobIdx: number, field: "responsibilities" | "requirements", itemIdx: number) => {
        const updated = [...jobs]
        const arr = [...updated[jobIdx][field]]
        arr.splice(itemIdx, 1)
        updated[jobIdx] = { ...updated[jobIdx], [field]: arr }
        setJobs(updated)
    }

    const handleProcessStepChange = (jobIdx: number, stepIdx: number, field: keyof ProcessStep, value: string) => {
        const updated = [...jobs]
        const steps = [...updated[jobIdx].process]
        steps[stepIdx] = { ...steps[stepIdx], [field]: value }
        updated[jobIdx] = { ...updated[jobIdx], process: steps }
        setJobs(updated)
    }

    const handleAddProcessStep = (jobIdx: number) => {
        const updated = [...jobs]
        const steps = [...updated[jobIdx].process, { step: "", description: "" }]
        updated[jobIdx] = { ...updated[jobIdx], process: steps }
        setJobs(updated)
    }

    const handleRemoveProcessStep = (jobIdx: number, stepIdx: number) => {
        const updated = [...jobs]
        const steps = [...updated[jobIdx].process]
        steps.splice(stepIdx, 1)
        updated[jobIdx] = { ...updated[jobIdx], process: steps }
        setJobs(updated)
    }

    const handleDeleteJob = (idx: number) => {
        const title = jobs[idx].title
        const updated = [...jobs]
        updated.splice(idx, 1)
        setJobs(updated)
        if (updated.length > 0) {
            setActiveJobId(updated[0].id)
        }
        toast.info(`Removed position: ${title}`)
    }

    const handleCreateJob = () => {
        if (!newJob.title?.trim() || !newJob.description?.trim()) {
            toast.error("Please fill in the Job Title and Description")
            return
        }

        const id = newJob.title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
        const exists = jobs.some(j => j.id === id)
        const finalId = exists ? `${id}-${Date.now().toString().slice(-4)}` : id

        const completeJob: Job = {
            id: finalId,
            title: newJob.title,
            location: newJob.location || "Mogadishu, Somalia",
            type: newJob.type || "Full-time",
            department: newJob.department || "ERP Solutions",
            closingDate: newJob.closingDate || "",
            experience: newJob.experience || "Fresh Graduate",
            openings: newJob.openings || 1,
            workMode: newJob.workMode || "Hybrid",
            description: newJob.description,
            responsibilities: newJob.responsibilities?.filter(r => r.trim() !== "") || ["Work on assignments"],
            requirements: newJob.requirements?.filter(r => r.trim() !== "") || ["Qualifications"],
            process: newJob.process || []
        }

        setJobs([...jobs, completeJob])
        setActiveJobId(completeJob.id)
        
        // Reset state
        setNewJob({
            title: "",
            location: "Mogadishu, Somalia",
            type: "Full-time",
            department: "ERP Solutions",
            closingDate: "",
            experience: "2+ years",
            openings: 1,
            workMode: "Hybrid",
            description: "",
            responsibilities: [""],
            requirements: [""],
            process: [{ step: "Initial Screening", description: "Review of qualifications" }]
        })
        
        toast.success("Created new career listing!")
    }

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin h-10 w-10 text-[#b22222]" />
                <p className="text-slate-400 font-medium">Loading Careers database...</p>
            </div>
        )
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Careers & Internships</h1>
                    <p className="text-slate-500 font-medium">Manage job postings and the structured 6-month Future Leaders Internship Program.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        onClick={handleSaveAll} 
                        disabled={saving}
                        className="bg-[#b22222] hover:bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl h-14 px-8 shadow-lg shadow-red-500/10 flex items-center gap-2 border-none"
                    >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Navigation for Careers */}
                <div className="lg:col-span-4 space-y-3">
                    <div className="px-4 mb-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Open Roles</span>
                        <h3 className="text-lg font-bold text-[#0f4c9c]">Select Position</h3>
                    </div>
                    
                    <div className="space-y-2">
                        {jobs.map((job) => (
                            <button
                                key={job.id}
                                onClick={() => setActiveJobId(job.id)}
                                className={cn(
                                    "w-full text-left p-5 rounded-2xl border transition-all duration-300 relative group overflow-hidden",
                                    activeJobId === job.id
                                        ? "bg-white border-[#0f4c9c] shadow-xl shadow-[#0f4c9c]/5 text-[#0f4c9c]"
                                        : "bg-white border-slate-100 hover:border-slate-200 text-slate-700"
                                )}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h4 className="font-black text-sm leading-tight mb-1 group-hover:text-[#b22222] transition-colors">{job.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{job.department} · {job.type}</p>
                                    </div>
                                    {job.id === "internship-program" && (
                                        <Badge className="bg-[#b22222]/10 text-[#b22222] hover:bg-[#b22222]/10 border-none rounded-full shrink-0 text-[9px] font-bold py-0.5">Internship</Badge>
                                    )}
                                </div>
                                {activeJobId === job.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0f4c9c]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Management Area */}
                <div className="lg:col-span-8">
                    {jobs.map((job, jobIdx) => {
                        if (job.id !== activeJobId) return null
                        return (
                            <div key={job.id} className="space-y-8 animate-in fade-in duration-300">
                                {/* Main Form */}
                                <Card className="p-8 md:p-10 rounded-[2.5rem] border-none shadow-xl shadow-slate-100/50 bg-white space-y-8">
                                    <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                                        <div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Editing Mode</span>
                                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{job.title}</h2>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDeleteJob(jobIdx)}
                                            disabled={job.id === "internship-program"} // Do not allow deleting core internship page
                                            className="border-red-100 hover:border-red-300 text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl h-10 flex items-center gap-2 font-bold px-4 shrink-0 transition-colors"
                                        >
                                            <Trash2 className="h-4.5 w-4.5" />
                                            Remove Position
                                        </Button>
                                    </div>

                                    {/* Inputs Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5 md:col-span-2">
                                            <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Position Title *</Label>
                                            <Input 
                                                value={job.title} 
                                                onChange={(e) => handleUpdateJobField(jobIdx, "title", e.target.value)}
                                                className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Location</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                                <Input 
                                                    value={job.location} 
                                                    onChange={(e) => handleUpdateJobField(jobIdx, "location", e.target.value)}
                                                    className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200 pl-9"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Closing Date</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                                <Input 
                                                    type="date"
                                                    value={job.closingDate} 
                                                    onChange={(e) => handleUpdateJobField(jobIdx, "closingDate", e.target.value)}
                                                    className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200 pl-9"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Department</Label>
                                            <Input 
                                                value={job.department} 
                                                onChange={(e) => handleUpdateJobField(jobIdx, "department", e.target.value)}
                                                className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Experience Requirements</Label>
                                            <Input 
                                                value={job.experience} 
                                                onChange={(e) => handleUpdateJobField(jobIdx, "experience", e.target.value)}
                                                className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Work Mode</Label>
                                            <Select 
                                                value={job.workMode} 
                                                onValueChange={(val) => handleUpdateJobField(jobIdx, "workMode", val)}
                                            >
                                                <SelectTrigger className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200">
                                                    <SelectValue placeholder="Select work mode" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                                    <SelectItem value="On-site">On-site</SelectItem>
                                                    <SelectItem value="Remote">Remote</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Number of Openings</Label>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                                <Input 
                                                    type="number"
                                                    value={job.openings} 
                                                    onChange={(e) => handleUpdateJobField(jobIdx, "openings", parseInt(e.target.value) || 0)}
                                                    className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200 pl-9"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 md:col-span-2">
                                            <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Job Description *</Label>
                                            <Textarea 
                                                value={job.description} 
                                                onChange={(e) => handleUpdateJobField(jobIdx, "description", e.target.value)}
                                                className="rounded-xl min-h-[120px] text-slate-600 font-medium bg-slate-50 border-slate-200"
                                            />
                                        </div>
                                    </div>

                                    {/* Responsibilities list manager */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Responsibilities</Label>
                                            <Button 
                                                variant="ghost" 
                                                onClick={() => handleAddArrayItem(jobIdx, "responsibilities")}
                                                className="text-[#0f4c9c] hover:text-[#0f4c9c]/80 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest p-0 h-auto"
                                            >
                                                <PlusCircle className="h-4 w-4" /> Add Line
                                            </Button>
                                        </div>
                                        <div className="space-y-3">
                                            {job.responsibilities.map((resp, rIdx) => (
                                                <div key={rIdx} className="flex gap-2 items-center">
                                                    <span className="text-xs font-bold text-slate-400 shrink-0">{rIdx + 1}.</span>
                                                    <Input 
                                                        value={resp} 
                                                        onChange={(e) => handleArrayItemChange(jobIdx, "responsibilities", rIdx, e.target.value)}
                                                        className="rounded-xl bg-slate-50 border-slate-200"
                                                    />
                                                    <button 
                                                        onClick={() => handleRemoveArrayItem(jobIdx, "responsibilities", rIdx)}
                                                        className="text-slate-400 hover:text-red-500 shrink-0 transition-colors"
                                                    >
                                                        <MinusCircle className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Requirements list manager */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Requirements & Qualifications</Label>
                                            <Button 
                                                variant="ghost" 
                                                onClick={() => handleAddArrayItem(jobIdx, "requirements")}
                                                className="text-[#0f4c9c] hover:text-[#0f4c9c]/80 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest p-0 h-auto"
                                            >
                                                <PlusCircle className="h-4 w-4" /> Add Line
                                            </Button>
                                        </div>
                                        <div className="space-y-3">
                                            {job.requirements.map((req, rIdx) => (
                                                <div key={rIdx} className="flex gap-2 items-center">
                                                    <span className="text-xs font-bold text-slate-400 shrink-0">{rIdx + 1}.</span>
                                                    <Input 
                                                        value={req} 
                                                        onChange={(e) => handleArrayItemChange(jobIdx, "requirements", rIdx, e.target.value)}
                                                        className="rounded-xl bg-slate-50 border-slate-200"
                                                    />
                                                    <button 
                                                        onClick={() => handleRemoveArrayItem(jobIdx, "requirements", rIdx)}
                                                        className="text-slate-400 hover:text-red-500 shrink-0 transition-colors"
                                                    >
                                                        <MinusCircle className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hiring process step manager */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recruitment Steps</Label>
                                            <Button 
                                                variant="ghost" 
                                                onClick={() => handleAddProcessStep(jobIdx)}
                                                className="text-[#0f4c9c] hover:text-[#0f4c9c]/80 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest p-0 h-auto"
                                            >
                                                <PlusCircle className="h-4 w-4" /> Add Step
                                            </Button>
                                        </div>
                                        <div className="space-y-4">
                                            {job.process.map((proc, pIdx) => (
                                                <div key={pIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex gap-4 items-start relative group">
                                                    <div className="h-7 w-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">{pIdx + 1}</div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                                        <div className="space-y-1.5 col-span-1">
                                                            <Label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Step Name</Label>
                                                            <Input 
                                                                value={proc.step} 
                                                                onChange={(e) => handleProcessStepChange(jobIdx, pIdx, "step", e.target.value)}
                                                                className="rounded-lg h-9 bg-white"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5 col-span-1 md:col-span-2">
                                                            <Label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Step Description</Label>
                                                            <Input 
                                                                value={proc.description} 
                                                                onChange={(e) => handleProcessStepChange(jobIdx, pIdx, "description", e.target.value)}
                                                                className="rounded-lg h-9 bg-white"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <button 
                                                        onClick={() => handleRemoveProcessStep(jobIdx, pIdx)}
                                                        className="text-slate-400 hover:text-red-500 shrink-0 self-center transition-colors"
                                                    >
                                                        <MinusCircle className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Form to Add New Position */}
            <Card className="p-8 rounded-[2.5rem] border-slate-200 border-2 border-dashed bg-slate-50/40">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-[#0f4c9c]/10 text-[#0f4c9c] flex items-center justify-center">
                        <Plus className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">Create New Career Posting</h4>
                        <p className="text-slate-400 text-xs font-medium">Add a new career or training listing visible on the main application site.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Position Title *</Label>
                        <Input 
                            placeholder="e.g. ERP Functional Architect"
                            value={newJob.title}
                            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                            className="rounded-xl font-bold h-12 bg-white"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Department</Label>
                        <Input 
                            placeholder="ERP Solutions"
                            value={newJob.department}
                            onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                            className="rounded-xl font-bold h-12 bg-white"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Experience Needed</Label>
                        <Input 
                            placeholder="3+ years"
                            value={newJob.experience}
                            onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                            className="rounded-xl font-bold h-12 bg-white"
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Description *</Label>
                        <Textarea 
                            placeholder="Provide a comprehensive description of the career opportunity..."
                            value={newJob.description}
                            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                            className="rounded-xl min-h-[60px] text-slate-600 font-medium bg-white"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Work Mode</Label>
                        <Select 
                            value={newJob.workMode} 
                            onValueChange={(val) => setNewJob({ ...newJob, workMode: val })}
                        >
                            <SelectTrigger className="rounded-xl font-bold h-12 bg-white">
                                <SelectValue placeholder="Select work mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                <SelectItem value="On-site">On-site</SelectItem>
                                <SelectItem value="Remote">Remote</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pt-5 flex justify-end">
                        <Button 
                            type="button"
                            onClick={handleCreateJob}
                            className="bg-[#0f4c9c] hover:bg-slate-900 text-white rounded-xl h-12 px-6 font-black uppercase text-[10px] tracking-widest flex items-center gap-1 w-full md:w-auto border-none"
                        >
                            <Plus className="h-4 w-4" /> Add Position
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Bottom Sticky Save Bar */}
            <div className="flex justify-end sticky bottom-8 z-40 bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-2xl">
                <Button 
                    onClick={handleSaveAll} 
                    disabled={saving}
                    className="bg-[#b22222] hover:bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl h-16 px-12 shadow-xl shadow-red-500/20 flex items-center gap-3 border-none"
                >
                    {saving ? <Loader2 className="h-5 w-5 animate-spin mr-1" /> : <Save className="h-5 w-5 mr-1" />}
                    Publish Career Changes
                </Button>
            </div>
        </div>
    )
}
