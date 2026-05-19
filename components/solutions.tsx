"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Database, ArrowRight } from "lucide-react"
import Link from "next/link"
import { solutionsDetail } from "@/lib/solutions-data"
import { iconMap } from "@/lib/icon-map"
import { Badge } from "@/components/ui/badge"

export function Solutions() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="solutions" className="bg-[#1f2933] py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-4 border-white/20 bg-white/5 text-white/80 backdrop-blur-sm">
            Core Competencies
          </Badge>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Digital Ecosystem Solutions
          </h2>
          <p
            className={`mt-6 max-w-2xl text-lg text-white/60 transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Deploying resilient, scalable technology frameworks that integrate seamlessly into your enterprise architecture.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutionsDetail.map((solution, i) => {
            const Icon = iconMap[solution.iconName] || Database
            return (
              <Link href={`/solutions/${solution.slug}`} key={solution.slug} className="group">
                <div
                  className={`relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/20 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-12">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50 line-clamp-3">
                    {solution.heroDescription}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Discover Capability <ArrowRight className="h-3 w-3" />
                  </div>
                  
                  {/* Bottom accent bar */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
