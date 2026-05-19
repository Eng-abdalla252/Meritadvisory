"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Search, 
    Trash2, 
    Inbox,
    Mail,
    Phone,
    Building2,
    Calendar,
    Loader2,
    Eye,
    Filter,
    CheckCircle2,
    Clock,
    User,
    ChevronDown,
    X,
    Briefcase,
    LayoutDashboard,
    ClipboardCheck,
    FileText,
    BarChart3,
    Download,
    CheckSquare,
    Square,
    Star,
    Sparkles,
    TrendingUp
} from "lucide-react"
import { 
    PieChart, 
    Pie, 
    Cell, 
    ResponsiveContainer, 
    Tooltip as RechartsTooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface Lead {
    id: string
    type: "recruitment" | "demo" | "questionnaire" | "webinar" | "contact"
    createdAt: string
    status: "new" | "read" | "handled"
    isShortlisted?: boolean
    // Common fields
    name?: string
    email?: string
    phone?: string
    company?: string
    message?: string
    // Recruitment specific
    jobTitle?: string
    degree?: string
    cvUrl?: string
    resumeText?: string
    aiScore?: number
    aiCategory?: string
    aiInsights?: string[]
    // Demo specific
    system?: string
    // Webinar specific
    webinarTitle?: string
    // Contact specific
    category?: string
    subject?: string
    // Questionnaire specific
    customerName?: string
    companyName?: string
    numEmployees?: string
    numBranches?: string
    cities?: string
    interest?: string
    managementIndustry?: string
    currentSystem?: string
    briefNeed?: string
}

export default function LeadsAdmin() {
    const router = useRouter()
    const [leads, setLeads] = React.useState<Lead[]>([])
    const [loading, setLoading] = React.useState(true)
    const [search, setSearch] = React.useState("")
    const [filter, setFilter] = React.useState<string>("all")
    const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)
    const [selectedIds, setSelectedIds] = React.useState<string[]>([])
    const [viewMode, setViewMode] = React.useState<"list" | "analytics">("list")

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/admin/leads")
            const data = await res.json()
            if (Array.isArray(data)) {
                setLeads(data)
            }
        } catch (error) {
            toast.error("Failed to fetch leads")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchLeads()
        }
    }, [router])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return
        
        try {
            const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" })
            if (res.ok) {
                setLeads(leads.filter(l => l.id !== id))
                toast.success("Lead deleted")
            }
        } catch (error) {
            toast.error("Failed to delete lead")
        }
    }

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch("/api/admin/leads", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status })
            })
            if (res.ok) {
                setLeads(leads.map(l => l.id === id ? { ...l, status: status as any } : l))
                if (selectedLead?.id === id) {
                    setSelectedLead({ ...selectedLead, status: status as any })
                }
            }
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    const downloadCSV = () => {
        const headers = ["Name", "Email", "Phone", "Type", "Status", "Date", "Job Title", "Company"]
        const rows = filteredLeads.map(l => [
            l.name || l.customerName || "",
            l.email || "",
            l.phone || l.phoneNumber || "",
            l.type,
            l.status,
            new Date(l.createdAt).toLocaleDateString(),
            l.jobTitle || "",
            l.company || l.companyName || ""
        ])

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `merit-leads-${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const toggleShortlist = async (id: string) => {
        const lead = leads.find(l => l.id === id)
        const isShortlisted = !lead?.isShortlisted
        
        try {
            const res = await fetch("/api/admin/leads", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, isShortlisted })
            })
            if (res.ok) {
                setLeads(leads.map(l => l.id === id ? { ...l, isShortlisted } : l))
                if (selectedLead?.id === id) {
                    setSelectedLead({ ...selectedLead, isShortlisted })
                }
                toast.success(isShortlisted ? "Added to shortlist" : "Removed from shortlist")
            }
        } catch (error) {
            toast.error("Failed to update shortlist")
        }
    }

    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} leads?`)) return
        
        try {
            for (const id of selectedIds) {
                await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" })
            }
            setLeads(leads.filter(l => !selectedIds.includes(l.id)))
            setSelectedIds([])
            toast.success(`${selectedIds.length} leads deleted`)
        } catch (error) {
            toast.error("Failed to delete some leads")
        }
    }

    const handleBulkStatus = async (status: string) => {
        try {
            for (const id of selectedIds) {
                await fetch("/api/admin/leads", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, status })
                })
            }
            setLeads(leads.map(l => selectedIds.includes(l.id) ? { ...l, status: status as any } : l))
            setSelectedIds([])
            toast.success(`Updated ${selectedIds.length} leads`)
        } catch (error) {
            toast.error("Failed to update some leads")
        }
    }

    const analyticsData = React.useMemo(() => {
        const counts: any = {}
        leads.forEach(l => {
            counts[l.type] = (counts[l.type] || 0) + 1
        })
        
        const typeData = Object.entries(counts).map(([name, value]) => ({ name: name.toUpperCase(), value }))
        
        const statusCounts: any = {}
        leads.forEach(l => {
            statusCounts[l.status] = (statusCounts[l.status] || 0) + 1
        })
        const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name: name.toUpperCase(), value }))

        const degreeCounts: any = {}
        leads.filter(l => l.type === 'recruitment').forEach(l => {
            const d = l.degree || "Unknown"
            degreeCounts[d] = (degreeCounts[d] || 0) + 1
        })
        const degreeData = Object.entries(degreeCounts).map(([name, value]) => ({ name, value }))

        return { typeData, statusData, degreeData }
    }, [leads])

    const filteredLeads = leads.filter(l => {
        const matchesSearch = 
            (l.name?.toLowerCase().includes(search.toLowerCase()) || 
             l.email?.toLowerCase().includes(search.toLowerCase()) ||
             l.company?.toLowerCase().includes(search.toLowerCase()) ||
             l.companyName?.toLowerCase().includes(search.toLowerCase()) ||
             l.customerName?.toLowerCase().includes(search.toLowerCase()))
        
        const matchesFilter = filter === "all" || l.type === filter
        
        return matchesSearch && matchesFilter
    })

    const getLeadIcon = (type: string) => {
        switch (type) {
            case "recruitment": return <Briefcase className="h-4 w-4" />
            case "demo": return <LayoutDashboard className="h-4 w-4" />
            case "questionnaire": return <ClipboardCheck className="h-4 w-4" />
            case "webinar": return <Calendar className="h-4 w-4" />
            default: return <Mail className="h-4 w-4" />
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "new": return <Badge className="bg-red-50 text-red-600 border-none font-black text-[10px] uppercase">New</Badge>
            case "read": return <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] uppercase">Read</Badge>
            case "handled": return <Badge className="bg-green-50 text-green-600 border-none font-black text-[10px] uppercase">Handled</Badge>
            default: return null
        }
    }

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Business Leads</h1>
                    <p className="text-slate-500 font-medium">Monitor and manage all incoming inquiries and applications.</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex bg-white p-1 rounded-2xl shadow-sm mr-2">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "list" ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            <Inbox className="h-4 w-4 inline-block mr-2" />
                            List
                        </button>
                        <button
                            onClick={() => setViewMode("analytics")}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "analytics" ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            <BarChart3 className="h-4 w-4 inline-block mr-2" />
                            Analytics
                        </button>
                    </div>

                    <Button 
                        variant="outline" 
                        className="h-14 rounded-2xl bg-white border-none shadow-sm px-6 font-black uppercase text-[10px] tracking-widest text-slate-600 hover:bg-slate-50"
                        onClick={downloadCSV}
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                    </Button>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Search leads..." 
                            className="pl-12 h-14 w-full md:w-80 rounded-2xl bg-white border-none shadow-sm font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Sub-header with Filter and Bulk Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex bg-white p-1 rounded-2xl shadow-sm">
                    {["all", "recruitment", "demo", "questionnaire", "webinar", "contact"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? "bg-[#b22222] text-white shadow-lg shadow-red-200" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
                        <span className="text-xs font-black uppercase text-slate-400 mr-2">{selectedIds.length} Selected</span>
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="rounded-full h-10 px-4 font-bold border-slate-200"
                            onClick={() => handleBulkStatus('handled')}
                        >
                            Mark Handled
                        </Button>
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="rounded-full h-10 px-4 font-bold border-red-100 text-red-500 hover:bg-red-50"
                            onClick={handleBulkDelete}
                        >
                            Delete Selected
                        </Button>
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            className="rounded-full h-10 w-10 p-0"
                            onClick={() => setSelectedIds([])}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            {viewMode === "analytics" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in duration-500">
                    <Card className="p-8 border-none shadow-sm rounded-[2.5rem] bg-white">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                            <Filter className="h-4 w-4 text-blue-500" />
                            Leads by Category
                        </h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analyticsData.typeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {[0, 1, 2, 3, 4, 5].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#1e4e8c', '#b22222', '#f59e0b', '#10b981', '#6366f1'][index % 5]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="p-8 border-none shadow-sm rounded-[2.5rem] bg-white">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-500" />
                            Lead Status Overview
                        </h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analyticsData.statusData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                    <RechartsTooltip />
                                    <Bar dataKey="value" fill="#b22222" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="p-8 border-none shadow-sm rounded-[2.5rem] bg-white">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-purple-500" />
                            Recruitment Degrees
                        </h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analyticsData.degreeData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                        dataKey="value"
                                    >
                                        {analyticsData.degreeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#6366f1', '#ec4899', '#8b5cf6', '#3b82f6'][index % 4]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <Card key={i} className="h-24 animate-pulse bg-white border-none rounded-2xl shadow-sm" />
                        ))
                    ) : filteredLeads.length === 0 ? (
                        <Card className="py-24 text-center border-dashed border-2 border-slate-200 bg-white rounded-[2.5rem]">
                            <div className="flex flex-col items-center gap-4 text-slate-300">
                                <Inbox className="h-16 w-16 opacity-20" />
                                <p className="font-black uppercase text-xs tracking-widest">No leads found in this category</p>
                            </div>
                        </Card>
                    ) : (
                        filteredLeads.map((lead) => (
                            <Card 
                                key={lead.id} 
                                className={`p-6 border-none shadow-sm hover:shadow-md transition-all rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer ${lead.status === 'new' ? 'bg-white ring-1 ring-red-100' : 'bg-white'} ${selectedIds.includes(lead.id) ? 'ring-2 ring-red-500' : ''}`}
                                onClick={() => {
                                    setSelectedLead(lead)
                                    setIsDetailsOpen(true)
                                    if (lead.status === 'new') updateStatus(lead.id, 'read')
                                }}
                            >
                                <div className="flex items-center gap-6">
                                    <div 
                                        className="h-6 w-6 rounded-md border-2 border-slate-200 flex items-center justify-center transition-colors hover:border-red-500"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            if (selectedIds.includes(lead.id)) {
                                                setSelectedIds(selectedIds.filter(id => id !== lead.id))
                                            } else {
                                                setSelectedIds([...selectedIds, lead.id])
                                            }
                                        }}
                                    >
                                        {selectedIds.includes(lead.id) ? <CheckSquare className="h-5 w-5 text-red-500" /> : <Square className="h-5 w-5 text-transparent" />}
                                    </div>

                                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-colors ${
                                        lead.type === 'recruitment' ? 'bg-purple-50 text-purple-600' :
                                        lead.type === 'demo' ? 'bg-blue-50 text-blue-600' :
                                        lead.type === 'questionnaire' ? 'bg-amber-50 text-amber-600' :
                                        'bg-red-50 text-red-600'
                                    }`}>
                                        {getLeadIcon(lead.type)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-black text-slate-900 leading-none">{lead.name || lead.customerName}</h3>
                                            {getStatusBadge(lead.status)}
                                            {lead.isShortlisted && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                                            {lead.aiCategory && (
                                                <Badge className={`border-none font-black text-[10px] uppercase ${
                                                    lead.aiCategory === 'Top Talent' ? 'bg-green-100 text-green-700' :
                                                    lead.aiCategory === 'Qualified' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                    <Sparkles className="h-3 w-3 mr-1" />
                                                    {lead.aiCategory}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="h-3 w-3" />
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Filter className="h-3 w-3" />
                                                {lead.type}
                                            </span>
                                            {lead.jobTitle && <span className="text-[#b22222] font-black">{lead.jobTitle}</span>}
                                            {lead.aiScore && <span className="text-slate-900 font-black">AI Score: {lead.aiScore}%</span>}
                                        </div>
                                    </div>
                                </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-bold text-slate-600">{lead.email}</p>
                                    <p className="text-xs font-medium text-slate-400">{lead.phone || lead.phoneNumber}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(lead.id)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
            )}

            {/* Lead Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-2xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <div className="flex items-center justify-between mb-6">
                            <Badge className="bg-slate-100 text-slate-500 border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
                                {selectedLead?.type} Submission
                            </Badge>
                            <div className="flex items-center gap-2">
                                <Button 
                                    size="sm" 
                                    variant={selectedLead?.isShortlisted ? "default" : "outline"} 
                                    className={`rounded-full font-bold h-8 ${selectedLead?.isShortlisted ? 'bg-amber-400 hover:bg-amber-500 text-white' : ''}`}
                                    onClick={() => toggleShortlist(selectedLead!.id)}
                                >
                                    <Star className={`h-3.5 w-3.5 mr-2 ${selectedLead?.isShortlisted ? 'fill-current' : ''}`} />
                                    {selectedLead?.isShortlisted ? "Shortlisted" : "Shortlist"}
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="rounded-full font-bold h-8"
                                    onClick={() => updateStatus(selectedLead!.id, 'handled')}
                                >
                                    Mark Handled
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setIsDetailsOpen(false)} className="rounded-full h-8 w-8 p-0">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
                            {selectedLead?.name || selectedLead?.customerName}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-8 mt-8">
                        {/* AI Intelligence Card (Recruitment only) */}
                        {selectedLead?.type === 'recruitment' && selectedLead.aiScore && (
                            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] text-white overflow-hidden relative group">
                                <Sparkles className="absolute top-4 right-4 h-12 w-12 text-white/10 group-hover:scale-110 transition-transform" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                                            <TrendingUp className="h-6 w-6 text-green-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase text-[10px] tracking-widest text-white/50">AI Qualification Score</h4>
                                            <p className="text-3xl font-black">{selectedLead.aiScore}% Match</p>
                                        </div>
                                        <Badge className={`ml-auto border-none font-black text-xs px-4 py-1.5 rounded-full ${
                                            selectedLead.aiCategory === 'Top Talent' ? 'bg-green-500 text-white' :
                                            selectedLead.aiCategory === 'Qualified' ? 'bg-blue-500 text-white' :
                                            'bg-slate-500 text-white'
                                        }`}>
                                            {selectedLead.aiCategory}
                                        </Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-black uppercase tracking-widest text-white/40">Key AI Insights</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {selectedLead.aiInsights?.map((insight, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm font-medium text-white/80">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                                                    {insight}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contact Info Grid */}
                        <div className="grid grid-cols-2 gap-6 p-8 bg-slate-50 rounded-[2rem]">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</p>
                                <p className="font-bold text-slate-900">{selectedLead?.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</p>
                                <p className="font-bold text-slate-900">{selectedLead?.phone || selectedLead?.phoneNumber}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organization</p>
                                <p className="font-bold text-slate-900">{selectedLead?.company || selectedLead?.companyName || "N/A"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Submitted On</p>
                                <p className="font-bold text-slate-900">{selectedLead && new Date(selectedLead.createdAt).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Specific Details */}
                        {selectedLead?.type === 'recruitment' && (
                            <div className="space-y-4">
                                <h4 className="font-black uppercase text-xs tracking-widest text-red-500">Application Details</h4>
                                <div className="p-8 border border-slate-100 rounded-[2rem] space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Applying For</p>
                                            <p className="font-bold text-slate-900">{selectedLead.jobTitle}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Highest Degree</p>
                                            <p className="font-bold text-slate-900">{selectedLead.degree}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">CV / Resume File</p>
                                        {selectedLead.cvUrl ? (
                                            <Button 
                                                variant="outline" 
                                                className="w-full justify-start gap-3 rounded-2xl py-6 border-slate-100 hover:bg-red-50 hover:text-red-600 transition-all group"
                                                asChild
                                            >
                                                <a href={selectedLead.cvUrl} download>
                                                    <FileText className="h-5 w-5 text-slate-400 group-hover:text-red-500" />
                                                    <div className="text-left">
                                                        <p className="font-bold leading-none">Download CV Document</p>
                                                        <p className="text-[10px] text-slate-400 font-medium">Click to save to your device</p>
                                                    </div>
                                                </a>
                                            </Button>
                                        ) : (
                                            <p className="text-slate-400 text-sm font-medium italic">No CV file uploaded</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Additional Info / Intro</p>
                                        <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line bg-slate-50 p-6 rounded-2xl">{selectedLead.resumeText || "No additional information provided."}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedLead?.type === 'demo' && (
                            <div className="space-y-4">
                                <h4 className="font-black uppercase text-xs tracking-widest text-blue-500">Demo Request Details</h4>
                                <div className="p-8 border border-slate-100 rounded-[2rem] space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Requested System</p>
                                        <p className="font-bold text-lg text-slate-900">{selectedLead.system}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Message</p>
                                        <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl">{selectedLead.message || "No message provided."}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedLead?.type === 'questionnaire' && (
                            <div className="space-y-4">
                                <h4 className="font-black uppercase text-xs tracking-widest text-amber-500">Project Questionnaire Details</h4>
                                <div className="p-8 border border-slate-100 rounded-[2rem] grid grid-cols-2 gap-6">
                                    <div className="col-span-full">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Interest Area</p>
                                        <p className="font-bold text-lg text-slate-900">{selectedLead.interest}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Employees</p>
                                        <p className="font-bold">{selectedLead.numEmployees}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Branches</p>
                                        <p className="font-bold">{selectedLead.numBranches}</p>
                                    </div>
                                    <div className="col-span-full">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Locations</p>
                                        <p className="font-bold">{selectedLead.cities}</p>
                                    </div>
                                    <div className="col-span-full">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Brief Need</p>
                                        <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl">{selectedLead.briefNeed}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedLead?.type === 'contact' && (
                            <div className="space-y-4">
                                <h4 className="font-black uppercase text-xs tracking-widest text-slate-900">General Message Details</h4>
                                <div className="p-8 border border-slate-100 rounded-[2rem] space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Category</p>
                                        <Badge className="bg-slate-100 text-slate-700 border-none font-black text-[10px] uppercase">{selectedLead.category}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Subject</p>
                                        <p className="font-bold text-lg text-slate-900">{selectedLead.subject}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Message</p>
                                        <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl">{selectedLead.message}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedLead?.type === 'webinar' && (
                            <div className="space-y-4">
                                <h4 className="font-black uppercase text-xs tracking-widest text-emerald-500">Webinar Registration</h4>
                                <div className="p-8 border border-slate-100 rounded-[2rem] space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Webinar Title</p>
                                        <p className="font-bold text-lg text-slate-900">{selectedLead.webinarTitle}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
