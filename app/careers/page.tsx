"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, MapPin, Briefcase, ArrowRight, Loader2, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

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
}

export default function CareersPage() {
    const [jobs, setJobs] = React.useState<Job[]>([])
    const [loading, setLoading] = React.useState(true)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [typeFilter, setTypeFilter] = React.useState("All")
    const [locationFilter, setLocationFilter] = React.useState("All")

    React.useEffect(() => {
        fetch("/api/jobs")
            .then(res => res.json())
            .then(data => {
                setJobs(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = typeFilter === "All" || job.type.includes(typeFilter)
        const matchesLocation = locationFilter === "All" || job.location.includes(locationFilter)
        return matchesSearch && matchesType && matchesLocation
    })

    const uniqueLocations = ["All", ...new Set(jobs.map(j => j.location.split(',')[0]))]
    const uniqueTypes = ["All", "Full-time", "Remote", "Hybrid"]

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-24">
                <div className="mx-auto max-w-7xl px-6">
                    <h1 className="text-5xl font-bold text-center text-slate-800 mb-16">View Current Openings</h1>

                    {/* Search & Filter Bar */}
                    <Card className="p-8 rounded-2xl shadow-xl shadow-slate-100 border-slate-100 mb-16 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Job Title</label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        placeholder="eg. Software Engineer"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none font-medium"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Job Type</label>
                                <div className="relative">
                                    <select 
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none font-medium appearance-none"
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                    >
                                        {uniqueTypes.map(t => <option key={t} value={t}>{t === "All" ? "Select Job Type" : t}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Location</label>
                                <div className="relative">
                                    <select 
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none font-medium appearance-none"
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                    >
                                        {uniqueLocations.map(l => <option key={l} value={l}>{l === "All" ? "Select Location" : l}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <Button className="bg-[#e31e24] hover:bg-red-700 text-white font-bold py-4 rounded-xl h-auto border-none text-lg">
                                Search
                            </Button>
                        </div>
                    </Card>

                    {/* Jobs Grid */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-red-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="p-8 rounded-3xl border-none shadow-lg shadow-slate-100 hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-300 bg-white group">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-6 group-hover:text-red-600 transition-colors">
                                            {job.title}
                                        </h3>
                                        
                                        <div className="flex flex-wrap gap-4 mb-8">
                                            <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-none px-4 py-2 rounded-lg font-medium text-sm">
                                                {job.location}
                                            </Badge>
                                            <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-none px-4 py-2 rounded-lg font-medium text-sm">
                                                {job.experience}
                                            </Badge>
                                        </div>

                                        <Link 
                                            href={`/careers/${job.id}`}
                                            className="inline-flex items-center text-red-500 font-bold hover:text-red-700 transition-colors group/link"
                                        >
                                            View and Apply Job
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
