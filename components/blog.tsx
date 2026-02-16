"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    slug: "future-of-erp",
    category: "ERP",
    date: "Jan 15, 2026",
    title: "The Future of ERP: AI-Driven Enterprise Systems",
    excerpt:
      "Explore how artificial intelligence is revolutionizing enterprise resource planning and what it means for your organization.",
  },
  {
    slug: "digital-overhaul",
    category: "Digital Transformation",
    date: "Jan 8, 2026",
    title: "5 Signs Your Business Needs a Digital Overhaul",
    excerpt:
      "Learn the key indicators that your business processes are ripe for digital transformation and how to get started.",
  },
  {
    slug: "modernizing-accounting",
    category: "Accounting",
    date: "Dec 20, 2025",
    title: "Modernizing Legacy Accounting Systems: A Complete Guide",
    excerpt:
      "A step-by-step approach to migrating from outdated financial systems to modern, cloud-based accounting platforms.",
  },
]

export function Blog() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="blog" className="bg-card py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              Insights & Blog
            </p>
            <h2
              className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              Latest Thinking
            </h2>
          </div>
          <Link
            href="/blog"
            className={`inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            View All Articles
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <article
              key={post.title}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
                }`}
              style={{ transitionDelay: isVisible ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className="flex h-48 items-center justify-center bg-muted">
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  Read More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
