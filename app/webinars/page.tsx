"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
    Play, 
    Calendar, 
    Clock, 
    User, 
    ArrowRight,
    Video,
    Search,
    Filter,
    Star,
    CheckCircle2,
    X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface Webinar {
    id: string
    title: string
    description: string
    image: string
    videoUrl: string
    date: string
    time: string
    speaker: string
    speakerRole: string
    category: string
    status: "upcoming" | "recorded"
}

export default function WebinarsPage() {
    const [webinars, setWebinars] = React.useState<Webinar[]>([])
    const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null)
    const [activeTab, setActiveTab] = React.useState<"upcoming" | "recorded">("upcoming")
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch("/data/webinars.json")
            .then(res => res.json())
            .then(data => {
                setWebinars(data)
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
    }, [])

    const filteredWebinars = webinars.filter(w => w.status === activeTab)

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-20">
                {/* Hero Section */}
                <section className="relative mb-16 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-50" />
                        <div className="absolute inset-0 bg-[url('https://www.ksolves.com/static/images/webinar-bg.png')] bg-cover bg-center opacity-20" />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 py-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-6 backdrop-blur-md border border-red-500/20"
                        >
                            <Video className="h-4 w-4" />
                            Merit Knowledge Series
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6"
                        >
                            Webinars
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed"
                        >
                            Explore our webinars to learn how modern technologies, like Odoo ERP, AI, and Big Data, 
                            are transforming businesses. Led by industry experts, our sessions offer a mix of 
                            thought leadership and technical walkthroughs.
                        </motion.p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6">
                    {/* Tabs */}
                    <div className="flex items-center justify-center gap-4 mb-16">
                        <button
                            onClick={() => setActiveTab("upcoming")}
                            className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                                activeTab === "upcoming" 
                                ? "bg-slate-900 text-white shadow-2xl scale-105" 
                                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                            }`}
                        >
                            Upcoming Sessions
                        </button>
                        <button
                            onClick={() => setActiveTab("recorded")}
                            className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                                activeTab === "recorded" 
                                ? "bg-slate-900 text-white shadow-2xl scale-105" 
                                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                            }`}
                        >
                            On-Demand Recordings
                        </button>
                    </div>

                    {/* Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2].map(i => (
                                <div key={i} className="h-[500px] rounded-[3rem] bg-slate-50 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {filteredWebinars.map((webinar, i) => (
                                <motion.div
                                    key={webinar.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="group relative overflow-hidden rounded-[3rem] border-none bg-white shadow-2xl shadow-slate-200 transition-all hover:shadow-red-500/10 flex flex-col h-full">
                                        {/* Thumbnail Area */}
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <img 
                                                src={webinar.image} 
                                                alt={webinar.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                {webinar.status === "recorded" ? (
                                                    <button 
                                                        onClick={() => setSelectedVideo(webinar.videoUrl)}
                                                        className="h-24 w-24 rounded-full bg-[#e31e24] flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110"
                                                    >
                                                        <Play className="h-10 w-10 fill-current ml-1" />
                                                    </button>
                                                ) : (
                                                    <Link 
                                                        href={`/webinars/${webinar.id}`}
                                                        className="px-10 py-5 rounded-full bg-white text-slate-900 font-black uppercase text-sm tracking-widest hover:bg-[#e31e24] hover:text-white transition-all shadow-2xl"
                                                    >
                                                        Register Now
                                                    </Link>
                                                )}
                                            </div>
                                            <Badge className="absolute top-8 left-8 bg-white/90 backdrop-blur-md text-slate-900 border-none font-black text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-full">
                                                {webinar.category}
                                            </Badge>
                                            {webinar.status === "upcoming" && (
                                                <Badge className="absolute bottom-8 right-8 bg-[#e31e24] text-white border-none font-black text-xs px-5 py-2.5 rounded-2xl flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {webinar.date}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-10 lg:p-14 flex-1 flex flex-col">
                                            <div className="flex-1 space-y-6">
                                                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight group-hover:text-[#e31e24] transition-colors">
                                                    {webinar.title}
                                                </h3>
                                                <p className="text-slate-500 font-medium text-lg leading-relaxed line-clamp-2">
                                                    {webinar.description}
                                                </p>
                                            </div>

                                            <div className="pt-10 mt-10 border-t border-slate-50 flex flex-wrap items-center justify-between gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                                        <User className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 uppercase text-sm leading-none mb-1">{webinar.speaker}</p>
                                                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{webinar.speakerRole}</p>
                                                    </div>
                                                </div>
                                                
                                                {webinar.status === "upcoming" ? (
                                                    <Link 
                                                        href={`/webinars/${webinar.id}`}
                                                        className="inline-flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-widest hover:text-[#e31e24] transition-colors group/btn"
                                                    >
                                                        Secure Spot
                                                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                ) : (
                                                    <button 
                                                        onClick={() => setSelectedVideo(webinar.videoUrl)}
                                                        className="inline-flex items-center gap-3 text-sm font-black text-[#e31e24] uppercase tracking-widest hover:text-slate-900 transition-colors"
                                                    >
                                                        Watch Now
                                                        <Play className="h-4 w-4 fill-current" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/98 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            <button 
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/10 hover:bg-[#e31e24] text-white flex items-center justify-center z-10 transition-colors backdrop-blur-md"
                            >
                                <X className="h-6 w-6" />
                            </button>
                            <iframe 
                                src={selectedVideo} 
                                className="w-full h-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    )
}
