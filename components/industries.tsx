"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Building2,
  Factory,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Landmark,
  Truck,
  Wheat,
  Utensils,
  Fuel,
} from "lucide-react"

const industries = [
  {
    icon: Building2,
    name: "Real Estate & Construction",
    description: "Unified project management, financials, and resource allocation.",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Streamlined production, inventory management, and supply chain.",
  },
  {
    icon: Stethoscope,
    name: "Healthcare",
    description: "Compliant systems for patient management and operations.",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "Administrative efficiency and student lifecycle management.",
  },
  {
    icon: ShoppingBag,
    name: "Retail & E-Commerce",
    description: "Omnichannel commerce with integrated inventory and POS.",
  },
  {
    icon: Landmark,
    name: "Financial Services",
    description: "Regulatory compliance, risk management, and reporting.",
  },
  {
    icon: Truck,
    name: "Logistics & Distribution",
    description: "End-to-end supply chain visibility and warehouse management.",
  },
  {
    icon: Wheat,
    name: "Agriculture",
    description: "Farm management, procurement, and traceability solutions.",
  },
  {
    icon: Utensils,
    name: "Hospitality & Food",
    description: "POS, reservation systems, and restaurant management.",
  },
  {
    icon: Fuel,
    name: "Oil & Gas",
    description: "Asset management, compliance, and operational efficiency.",
  },
]

export function Industries() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="industries" className="py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Industries We Serve
          </p>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Industry-Wise Solutions
          </h2>
          <p
            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            We have expertise in delivering solutions that cater to the needs
            of each industry, whether you are a startup or an industry leader.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry, i) => (
            <div
              key={industry.name}
              className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? `${200 + i * 60}ms` : "0ms" }}
            >
              {/* Hover background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <industry.icon className="h-7 w-7" />
              </div>
              <h3 className="relative mt-4 text-sm font-semibold text-foreground">
                {industry.name}
              </h3>
              <p className="relative mt-2 text-xs leading-relaxed text-muted-foreground">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
