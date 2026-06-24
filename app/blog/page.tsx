"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  date: string
  location?: string
  imageUrl?: string
  category?: string
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/admin/data-api?type=blog")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPosts(data)
                }
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 overflow-hidden bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 relative z-10">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b22222]/10 text-[#b22222] font-black text-[10px] uppercase tracking-[0.2em] mb-6"
                            >
                                <Star className="h-4 w-4 fill-current" />
                                News
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
                            >
                                Latest News & <br />
                                <span className="text-[#b22222]">Updates</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-slate-500 font-medium leading-relaxed"
                            >
                                Stay informed about our latest achievements, partnerships, and industry insights.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* News List */}
                <div className="bg-white py-16">
                    <div className="mx-auto max-w-4xl px-6">
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500">Loading news...</p>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500">No news articles found.</p>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {posts.map((post, i) => (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="border-b border-slate-100 pb-12 last:border-0"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                                <span>{post.date}</span>
                                                {post.location && <span>• {post.location}</span>}
                                            </div>
                                            <Link href={`/blog/${post.slug}`}>
                                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 hover:text-[#b22222] transition-colors">
                                                    {post.title}
                                                </h2>
                                            </Link>
                                            <p className="text-slate-600 font-medium leading-relaxed line-clamp-3">
                                                {post.content}
                                            </p>
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center gap-2 text-sm font-black text-[#b22222] uppercase tracking-widest hover:underline"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <section className="bg-slate-50 py-16">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h3 className="text-2xl font-black text-slate-900 mb-4">
                            Need Advisory Services?
                        </h3>
                        <p className="text-slate-600 mb-8">
                            Join thousands of businesses growing with Merit Advisory's strategic solutions.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#b22222] text-white font-black uppercase tracking-widest rounded-full hover:bg-[#8b1818] transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
