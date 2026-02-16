"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Target, Eye, Shield, Users, Zap, Handshake, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const reasons = [
  {
    icon: Shield,
    title: "Proven Expertise",
    description:
      "Over 15 years of enterprise consulting with deep domain knowledge across ERP, accounting, and digital transformation.",
  },
  {
    icon: Users,
    title: "Client-Centric Approach",
    description:
      "We embed within your teams to ensure tailored solutions that align with your specific business objectives and goals.",
  },
  {
    icon: Zap,
    title: "Results-Driven",
    description:
      "Every engagement is measured by tangible business outcomes: faster operations, reduced costs, and improved ROI.",
  },
  {
    icon: Handshake,
    title: "End-to-End Support",
    description:
      "From strategy and planning to implementation and post-launch support, we are with you every step of the way.",
  },
]

export function About({ brief = false }: { brief?: boolean }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" className={cn("py-24 md:py-32", brief && "py-16 md:py-24")}>
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={cn("grid items-center gap-16 lg:grid-cols-2", brief && "lg:grid-cols-1 max-w-4xl mx-auto text-center")}>
          <div
            className={`transition-all duration-700 ${isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
              }`}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              About Merit Advisory
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Your Trusted Partner in Enterprise Transformation
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Merit Advisory Services is a premier digital transformation and
              enterprise technology consulting firm. We specialize in helping
              organizations navigate the complexities of modern business systems
              through expert ERP implementation, accounting modernization, and
              strategic advisory services.
            </p>

            {!brief && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 text-left">
                <div className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">Our Mission</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    To empower enterprises with innovative technology solutions
                    that drive sustainable growth and operational excellence.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Eye className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">Our Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    To be the most trusted advisory partner for enterprises
                    seeking to lead their industries through digital transformation.
                  </p>
                </div>
              </div>
            )}

            {brief && (
              <div className="mt-10">
                <Button asChild className="rounded-full" size="lg">
                  <Link href="/about">
                    Learn More Our Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {!brief && (
            <div
              className={`transition-all duration-700 delay-200 ${isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
                }`}
            >
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent">
                Why Choose Us
              </p>
              <div className="flex flex-col gap-4">
                {reasons.map((reason, i) => (
                  <div
                    key={reason.title}
                    className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <reason.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">
                        {reason.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
