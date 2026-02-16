"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Award, Shield, BadgeCheck, Star, Trophy, Medal } from "lucide-react"

const certifications = [
  { icon: Shield, label: "Odoo Gold Partner", sublabel: "Certified Excellence" },
  { icon: BadgeCheck, label: "ISO 27001", sublabel: "Information Security" },
  { icon: Award, label: "CMMI Level 3", sublabel: "Process Maturity" },
  { icon: Trophy, label: "Top ERP Consultants", sublabel: "Industry Recognized" },
  { icon: Star, label: "Microsoft Partner", sublabel: "Silver Competency" },
  { icon: Medal, label: "SAP Certified", sublabel: "Implementation Partner" },
]

export function Awards() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="awards" className="border-y border-border bg-card py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            Certifications & Recognition
          </p>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            Awards That Define Our Journey
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.label}
              className={`group flex flex-col items-center rounded-2xl border border-border bg-background p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md ${isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
                }`}
              style={{
                transitionDelay: isVisible ? `${200 + i * 80}ms` : "0ms",
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <cert.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">
                {cert.label}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {cert.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
