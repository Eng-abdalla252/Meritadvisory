"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Blog } from "@/components/blog"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { motion } from "framer-motion"


export default function BlogPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 overflow-hidden bg-slate-50">
                    <div className="absolute inset-0 bg-[url('https://www.ksolves.com/static/images/webinar-bg.png')] bg-cover bg-center opacity-5 mix-blend-overlay" />
                    <div className="mx-auto max-w-7xl px-6 relative z-10">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#e31e24] font-black text-[10px] uppercase tracking-[0.2em] mb-6"
                            >
                                <Star className="h-4 w-4 fill-current" />
                                Insights & Analysis
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
                            >
                                The Merit <br />
                                <span className="text-[#e31e24]">Perspective</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-slate-500 font-medium leading-relaxed"
                            >
                                Exploring the intersection of technology, strategy, and regional growth. 
                                Our experts share deep insights to help you navigate the evolving digital landscape in Somalia and beyond.
                            </motion.p>
                        </div>
                    </div>
                </section>

                <div className="bg-background">
                    <Blog />
                </div>
            </main>
            <Footer />
        </div>
    )
}
