"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Server,
  Calculator,
  Rocket,
  Cog,
  Blocks,
  Lightbulb,
  ArrowRight,
  ClipboardCheck,
  BookOpen,
  Receipt,
} from "lucide-react"
import Link from "next/link"

import { servicesDetail } from "@/lib/services-data"
import { iconMap } from "@/lib/icon-map"

const services = servicesDetail.map((service, index) => ({
  ...service,
  icon: iconMap[service.iconName as string], // Cast to string to avoid index type issues
  description: service.heroDescription.split(".")[0] + ".", // Use first sentence for card
  features: service.keyBenefits.slice(0, 4), // Use first 4 benefits
  accent: index % 2 !== 0, // Alternating accent style
}))

export { services }

export function Services() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="services" className="bg-card py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            What We Do
          </p>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            End-to-End Enterprise Services
          </h2>
          <p
            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            From ERP and digital transformation to audit, taxation, and corporate training -- we cover every dimension of enterprise growth.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Link
              href={`/services/${service.slug}`}
              key={service.title}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
                }`}
              style={{ transitionDelay: isVisible ? `${200 + i * 80}ms` : "0ms" }}
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 right-0 left-0 h-1 transition-all duration-300 group-hover:h-1.5 ${service.accent ? "bg-accent" : "bg-primary"
                  }`}
              />

              {/* Hover glow */}
              <div
                className={`pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 ${service.accent ? "bg-accent" : "bg-primary"
                  }`}
              />

              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${service.accent
                  ? "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-lg group-hover:shadow-accent/25"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25"
                  }`}
              >
                <service.icon className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div
                className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${service.accent
                  ? "text-accent group-hover:text-accent/80"
                  : "text-primary group-hover:text-primary/80"
                  }`}
              >
                Explore Service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
