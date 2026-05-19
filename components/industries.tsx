"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { industriesDetail } from "@/lib/industries-data"
import { iconMap } from "@/lib/icon-map"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function Industries() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="industries" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(15,85,186,0.03)_0,transparent_70%)]" />

      <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
            Domain Expertise
          </Badge>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Specialized Industry Solutions
          </h2>
          <p
            className={`mt-6 max-w-2xl text-lg text-muted-foreground transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            We deliver high-impact digital strategies tailored to the unique operational challenges of every sector we serve.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {industriesDetail.map((industry, i) => {
            const Icon = iconMap[industry.iconName] || Building2
            return (
              <Link href={`/industries/${industry.slug}`} key={industry.slug} className="group">
                <div
                  className={`relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + i * 50}ms` }}
                >
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {industry.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {industry.subtitle}
                  </p>
                  
                  {/* Subtle hover arrow */}
                  <div className="mt-6 text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Learn More</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
