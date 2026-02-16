"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Code2, GraduationCap, Clock } from "lucide-react"
import Link from "next/link"

const highlights = [
  {
    icon: Users,
    value: "100+",
    label: "Certified Consultants",
  },
  {
    icon: Code2,
    value: "50+",
    label: "Odoo Engineers",
  },
  {
    icon: GraduationCap,
    value: "300+",
    label: "Certifications Held",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Dedicated Support",
  },
]

export function HireTeam() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="bg-primary py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground/60">
              Hire Top Talent
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-primary-foreground text-balance md:text-4xl lg:text-5xl">
              Scale Your Team With Our Expert Developers
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/70">
              Need dedicated Odoo developers, ERP consultants, or digital
              transformation specialists? Our team of 100+ certified
              professionals is ready to integrate with your organization and
              deliver results.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-accent px-8 text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90"
                asChild
              >
                <Link href="#contact">
                  Hire Dedicated Developers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className="group flex flex-col items-center rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center backdrop-blur-sm transition-all hover:bg-primary-foreground/10"
              >
                <item.icon className="h-8 w-8 text-primary-foreground/70" />
                <span className="mt-3 text-2xl font-bold text-primary-foreground md:text-3xl">
                  {item.value}
                </span>
                <span className="mt-1 text-sm text-primary-foreground/60">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
