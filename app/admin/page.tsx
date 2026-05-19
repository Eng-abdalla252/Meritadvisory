"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Video, 
    MessageSquare, 
    FileText, 
    Users, 
    ArrowRight,
    TrendingUp,
    Eye,
    Globe,
    Zap,
    Briefcase,
    Award,
    Inbox,
    Settings
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
    const router = useRouter()
    const [stats, setStats] = React.useState([
        { label: "Total Insights", value: "24", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Active Webinars", value: "3", icon: Video, color: "text-red-500", bg: "bg-red-50" },
        { label: "New Leads", value: "0", icon: Inbox, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Page Views", value: "12.4k", icon: Eye, color: "text-purple-500", bg: "bg-purple-50" },
    ])

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
            return
        }

        // Fetch leads count
        fetch("/api/admin/leads")
            .then(res => res.json())
            .then(leads => {
                if (Array.isArray(leads)) {
                    const newLeadsCount = leads.filter((l: any) => l.status === "new").length
                    setStats(prev => prev.map(s => s.label === "New Leads" ? { ...s, value: newLeadsCount.toString() } : s))
                }
            })
            .catch(() => {})
    }, [router])

    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Welcome Back, Admin</h1>
                    <p className="text-slate-500 font-medium">Here's what's happening with Merit Advisory today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">System Status: Optimal</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-8 border-none shadow-xl shadow-slate-200/50 rounded-[2rem]">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                +12%
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Content Quick Actions */}
                <div className="lg:col-span-8 space-y-8">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Quick Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Business Leads", desc: "View and manage new inquiries and job applications.", href: "/admin/leads", icon: Inbox },
                            { title: "Site Settings", desc: "Manage hero text, contact info, and site configuration.", href: "/admin/settings", icon: Settings },
                            { title: "Manage Webinars", desc: "Schedule new sessions and manage recordings.", href: "/admin/webinars", icon: Video },
                            { title: "Update Blog", desc: "Publish new expert insights and industry news.", href: "/admin/blog", icon: FileText },
                            { title: "Client Success", desc: "Add new testimonials and case studies.", href: "/admin/testimonials", icon: MessageSquare },
                            { title: "Team Profiles", desc: "Update leadership team information.", href: "/admin/team", icon: Users },
                        ].map((action) => (
                            <Link key={action.href} href={action.href}>
                                <Card className="p-8 border-slate-100 hover:border-red-500/20 hover:shadow-2xl hover:shadow-red-500/5 transition-all group cursor-pointer rounded-[2.5rem] h-full flex flex-col justify-between">
                                    <div>
                                        <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-[#e31e24] transition-colors">
                                            <action.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">{action.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{action.desc}</p>
                                    </div>
                                    <div className="mt-8 flex items-center gap-2 text-xs font-black text-[#e31e24] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Open Module
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity / System Info */}
                <div className="lg:col-span-4 space-y-8">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">System Info</h2>
                    <Card className="p-8 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-slate-900 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Zap className="h-32 w-32" />
                        </div>
                        <div className="relative space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-[#e31e24]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Environment</span>
                                </div>
                                <p className="text-2xl font-black uppercase tracking-tight">Production</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Server Latency</span>
                                </div>
                                <p className="text-2xl font-black uppercase tracking-tight">24ms</p>
                            </div>
                            <Button className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-black uppercase text-[10px] tracking-widest">
                                View System Logs
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
