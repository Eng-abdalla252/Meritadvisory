"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Database,
  BarChart3,
  Link2,
  Bot,
  Cloud,
  Lock,
} from "lucide-react"

const solutions = [
  {
    icon: Database,
    title: "Enterprise ERP Platforms",
    description:
      "SAP, Oracle, Odoo, Microsoft Dynamics, and more. We implement and customize leading ERP platforms for your business.",
  },
  {
    icon: Bot,
    title: "Intelligent Automation",
    description:
      "RPA, AI-powered workflows, and smart process automation to eliminate manual effort and accelerate operations.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Business intelligence dashboards, predictive analytics, and data-driven insights that power better decisions.",
  },
  {
    icon: Link2,
    title: "System Integrations",
    description:
      "Seamless API integrations connecting CRM, HR, finance, and operations into a unified technology ecosystem.",
  },
  {
    icon: Cloud,
    title: "Cloud Migration",
    description:
      "Secure and efficient migration of legacy systems to modern cloud platforms with minimal downtime.",
  },
  {
    icon: Lock,
    title: "Security & Compliance",
    description:
      "Enterprise-grade security frameworks, data governance, and regulatory compliance solutions.",
  },
]

export function Solutions() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="solutions" className="bg-navy py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Solutions & Technologies
          </p>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-navy-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Cutting-Edge Technology Stack
          </h2>
          <p
            className={`mt-4 text-lg text-navy-foreground/60 transition-all duration-600 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Leveraging the best-in-class tools and platforms to deliver robust
            enterprise solutions.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <div
              key={solution.title}
              className={`group rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-navy-foreground/10 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <solution.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy-foreground">
                {solution.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-foreground/60">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
