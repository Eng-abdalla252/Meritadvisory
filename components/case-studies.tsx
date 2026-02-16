"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { useMedia } from "@/hooks/use-media"

const hardcodedCaseStudies = [
  {
    industry: "Manufacturing",
    title: "Global Manufacturing ERP Overhaul",
    description:
      "Implemented a unified ERP system across 12 facilities in 5 countries, consolidating legacy systems and reducing operational costs by 35%.",
    results: ["35% Cost Reduction", "12 Facilities", "6 Month Timeline"],
    color: "bg-primary",
  },
  {
    industry: "Financial Services",
    title: "Accounting Modernization for Regional Bank",
    description:
      "Migrated a 50-year-old accounting infrastructure to a modern cloud-based platform with real-time reporting and regulatory compliance.",
    results: ["99.9% Uptime", "Real-time Reports", "Full Compliance"],
    color: "bg-accent",
  },
  {
    industry: "Retail",
    title: "Omnichannel Digital Transformation",
    description:
      "Delivered a complete digital transformation for a national retail chain, integrating POS, e-commerce, and warehouse management into one platform.",
    results: ["45% Revenue Growth", "200+ Stores", "Unified Platform"],
    color: "bg-navy",
  },
]

export function CaseStudies({ showHeader = true }: { showHeader?: boolean }) {
  const { ref, isVisible } = useScrollAnimation()
  const { media: dynamicProjects } = useMedia('projects')

  const allCaseStudies = [
    ...hardcodedCaseStudies,
    ...dynamicProjects.map(file => ({
      industry: "Featured Project",
      title: file.name.split('.')[0].replace(/-/g, ' '),
      description: "Successfully delivered strategic digital initiative involving enterprise systems and process optimization.",
      results: ["Deployed", "Enterprise-wide"],
      color: "bg-primary",
      image: file.url
    }))
  ]

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
              Proven Results Across Industries
            </h2>
          </div>
        )}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {allCaseStudies.map((study: any, i: number) => (
            <div
              key={study.title}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
                }`}
              style={{ transitionDelay: isVisible ? `${200 + i * 150}ms` : "0ms" }}
            >
              <div className={`${study.color} p-6`}>
                <span className="rounded-full bg-background/20 px-3 py-1 text-xs font-medium text-primary-foreground">
                  {study.industry}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {study.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {study.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.results.map((result: string) => (
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
