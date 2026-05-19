"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { caseStudies } from "@/lib/insights-data"

export function CaseStudies({ showHeader = true }: { showHeader?: boolean }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="case-studies" className={cn("py-24 md:py-32", !showHeader && "py-12 md:py-16")}>
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {showHeader && (
          <div className="mx-auto max-w-2xl text-center">
            <p
              className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              Success Stories
            </p>
            <h2
              className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              Proven Results Across East Africa
            </h2>
          </div>
        )}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <div
              key={study.title}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
                }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={study.imageUrl} 
                  alt={study.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                    {study.industry}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {study.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {study.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.results.map((result) => (
                    <span
                      key={result}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="rounded-full px-8" asChild>
            <Link href="/case-studies">
              Explore All Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
