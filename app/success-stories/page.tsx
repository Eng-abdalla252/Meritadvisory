"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
    Play, 
    Quote, 
    ChevronRight, 
    Search, 
    Filter, 
    ArrowUpRight,
    Star,
    CheckCircle2,
    X,
    Maximize2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface Testimonial {
    id: string
    title: string
    client: string
    author: string
    role: string
    quote: string
    image: string
    videoUrl: string
    category: string
    impact: string
}

export default function SuccessStoriesPage() {
    const [stories, setStories] = React.useState<Testimonial[]>([])
    const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null)
    const [activeCategory, setActiveCategory] = React.useState("All")

    React.useEffect(() => {
        fetch("/data/testimonials.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to load testimonials")
                return res.json()
            })
            .then(data => {
                console.log("Loaded stories:", data)
                setStories(data)
            })
            .catch((err) => {
                console.error("Error loading success stories:", err)
            })
    }, [])

    const categories = ["All", ...new Set(stories.map(s => s.category))]

    const filteredStories = activeCategory === "All" 
        ? stories 
        : stories.filter(s => s.category === activeCategory)

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative mb-16 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-50 -z-10" />
                    <div className="mx-auto max-w-7xl px-6 py-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6"
                        >
                            <Star className="h-4 w-4 fill-current" />
                            Client Success Stories
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6"
                        >
                            Empowering Growth Through <br />
                            <span className="text-[#e31e24]">Strategic Innovation</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-500 font-medium max-w-3xl mx-auto"
                        >
                            Discover how Merit Advisory partners with leading organizations across Africa and beyond to deliver transformative ERP solutions and strategic advisory.
                        </motion.p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all ${
                                    activeCategory === cat 
                                    ? "bg-slate-900 text-white shadow-xl scale-105" 
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Success Stories Grid */}
                    {stories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <div className="h-12 w-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-xl font-bold">Synchronizing Success Stories...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredStories.map((story, i) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white shadow-2xl shadow-slate-200 transition-all hover:shadow-red-500/10">
                                    {/* Video / Image Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(story.videoUrl)}>
                                        {!story.videoUrl.includes("youtube.com") && !story.videoUrl.includes("vimeo.com") ? (
                                            <video 
                                                src={story.videoUrl} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                muted
                                                loop
                                                onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                                                onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                                                poster={story.image}
                                            />
                                        ) : (
                                            <img 
                                                src={story.image} 
                                                alt={story.client}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                                            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/30 group-hover:bg-[#e31e24] group-hover:border-none transition-all scale-90 group-hover:scale-100 shadow-2xl">
                                                <Play className="h-8 w-8 fill-current ml-1" />
                                            </div>
                                        </div>
                                        <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-slate-900 border-none font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">
                                            {story.category}
                                        </Badge>
                                        {story.impact && (
                                            <Badge className="absolute bottom-6 right-6 bg-[#e31e24] text-white border-none font-black text-xs px-4 py-2 rounded-xl flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4" />
                                                {story.impact}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 space-y-8">
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black text-slate-900 leading-tight">
                                                {story.title}
                                            </h3>
                                            <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">{story.client}</p>
                                        </div>

                                        <div className="relative">
                                            <Quote className="absolute -top-4 -left-4 h-12 w-12 text-slate-50 opacity-10" />
                                            <p className="text-lg text-slate-600 font-medium italic leading-relaxed relative z-10">
                                                "{story.quote}"
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm">
                                                    <img src={story.image} alt={story.author} className="h-full w-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 uppercase text-sm leading-none mb-1">{story.author}</p>
                                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{story.role}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => setSelectedVideo(story.videoUrl)}
                                                className="inline-flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest hover:text-red-500 transition-colors"
                                            >
                                                Watch Story
                                                <ArrowUpRight className="h-4 w-4" />
                                            </button>
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
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            <button 
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-[#e31e24] text-white flex items-center justify-center z-10 transition-colors backdrop-blur-md"
                            >
                                <X className="h-6 w-6" />
                            </button>
                            {selectedVideo.includes("youtube.com") || selectedVideo.includes("vimeo.com") ? (
                                <iframe 
                                    src={selectedVideo} 
                                    className="w-full h-full"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video 
                                    src={selectedVideo} 
                                    className="w-full h-full"
                                    controls 
                                    autoPlay
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    )
}
