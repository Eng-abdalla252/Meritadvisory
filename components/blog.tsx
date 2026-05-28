"use client"

import * as React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
export function Blog() {
  const { ref, isVisible } = useScrollAnimation()
  const [posts, setPosts] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/admin/data-api?type=blog")
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <section id="blog" className="bg-card py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              Insights & Thought Leadership
            </p>
            <h2
              className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              The Merit Perspective
            </h2>
          </div>
          <Link
            href="/blog"
            className={`inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            Explore All Perspectives
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <article
              key={post.title}
              className={`group flex flex-col overflow-hidden bg-white rounded-2xl border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 ${isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
                }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-8 lg:p-10">
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e31e24] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#e31e24]" />
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black leading-tight text-slate-900 group-hover:text-[#e31e24] transition-colors mb-6">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-100">
                      <img src={post.authorImage} alt={post.author} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900 leading-none mb-1">{post.author}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{post.authorRole}</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black text-[#e31e24] uppercase tracking-widest group/link"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
