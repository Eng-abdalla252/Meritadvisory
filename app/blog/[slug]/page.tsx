import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react"
import fs from "fs"
import path from "path"

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), "public", "data", "blog.json")
    const blogPosts = JSON.parse(fs.readFileSync(filePath, "utf8"))
    
    return blogPosts.map((post: any) => ({
        slug: post.slug,
    }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const filePath = path.join(process.cwd(), "public", "data", "blog.json")
    const blogPosts = JSON.parse(fs.readFileSync(filePath, "utf8"))
    const post = blogPosts.find((p: any) => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-32 pb-16 bg-slate-50/30">
                <div className="mx-auto max-w-4xl px-6">
                    <Link
                        href="/blog"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-[#e31e24] transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Insights
                    </Link>

                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] mb-12 shadow-2xl">
                        <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="inline-block rounded-full bg-[#e31e24] px-5 py-2 text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">
                                {post.category}
                            </span>
                            <h1 className="text-3xl font-black leading-tight text-white md:text-5xl lg:text-7xl tracking-tighter">
                                {post.title}
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                                <img src={post.authorImage} alt={post.author} className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 leading-none mb-1 uppercase tracking-wider">{post.author}</p>
                                <p className="text-[10px] font-black text-[#e31e24] uppercase tracking-widest">{post.authorRole}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-300" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-slate-300" />
                                5 min read
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none prose-slate prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:text-slate-600">
                        <p className="text-2xl text-slate-900 font-bold leading-relaxed mb-12 italic border-l-8 border-[#e31e24] pl-10 py-2">
                            {post.excerpt}
                        </p>
                        
                        <p>
                            At Merit Advisory, we believe that understanding the regional economic landscape is the first step toward successful enterprise transformation. This article explores the key drivers behind current market shifts and how organizations can leverage new technologies to stay ahead.
                        </p>

                        <h2 className="text-4xl font-black mt-16 mb-8 tracking-tighter">Strategic Implications</h2>
                        <p>
                            As we navigate through 2026, the integration of advanced ERP systems and real-time data analytics is no longer a luxury but a necessity for multi-location retail and logistics networks. The ability to sync inventory, finance, and operations across diverse geographies provides a competitive edge that defines market leaders.
                        </p>

                        <div className="my-16 p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e31e24]/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                            <h3 className="text-3xl font-black mb-6 relative z-10 text-white uppercase tracking-tight">Expert Insight</h3>
                            <p className="text-xl text-slate-300 mb-0 relative z-10 leading-relaxed font-medium italic">
                                "The most successful digital transformations we've led at Merit focus on people and processes as much as the technology itself. A tool is only as powerful as the organization's ability to utilize it effectively."
                            </p>
                        </div>

                        <p>
                            Furthermore, the shift toward mobile-first financial solutions and cloud-native accounting is reducing operational friction and increasing transparency. This transparency is crucial for building investor confidence and ensuring long-term sustainability in a rapidly evolving economy.
                        </p>

                        <h2 className="text-4xl font-black mt-16 mb-8 tracking-tighter">Conclusion</h2>
                        <p>
                            Whether you are a growing retail chain or a large-scale manufacturing enterprise, the principles of digital agility remain the same. By partnering with experts who understand both the technology and the local context, Somali businesses are well-positioned to lead the region's digital leap.
                        </p>
                    </div>

                    <div className="mt-24 p-12 lg:p-16 rounded-[4rem] bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden border border-slate-100">
                        <div className="relative z-10">
                            <h4 className="text-4xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tighter">Inspired by this insight?</h4>
                            <p className="text-xl text-slate-500 font-medium mb-0">Speak with our consultants about your transformation journey.</p>
                        </div>
                        <Button asChild size="lg" className="relative z-10 bg-[#e31e24] hover:bg-slate-900 text-white px-12 py-8 rounded-[2rem] font-black uppercase text-sm tracking-widest transition-all shadow-2xl shadow-red-500/20 active:scale-95 border-none h-auto">
                            <Link href="/#contact">Connect With Us</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
