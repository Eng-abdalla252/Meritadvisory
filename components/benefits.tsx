"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useCounter } from "@/hooks/use-counter"
import { Zap, TrendingDown, SlidersHorizontal, LineChart } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    metric: 100,
    suffix: "%",
    title: "Faster Operations",
    description:
      "Accelerate business processes with optimized workflows and automated systems that eliminate bottlenecks.",
  },
  {
    icon: TrendingDown,
    metric: 60,
    suffix: "%",
    title: "Reduced Costs",
    description:
      "Significantly lower operational expenses through smarter resource allocation and process automation.",
  },
  {
    icon: SlidersHorizontal,
    metric: 80,
    suffix: "%",
    title: "Better Control",
    description:
      "Gain comprehensive visibility and control over every aspect of your enterprise operations.",
  },
  {
    icon: LineChart,
    metric: 10,
    suffix: "x",
    title: "Data-Driven Decisions",
    description:
      "Make faster, more informed strategic decisions powered by real-time analytics and insights.",
  },
]

function BenefitCard({
  benefit,
  index,
  isVisible,
}: {
  benefit: (typeof benefits)[0]
  index: number
  isVisible: boolean
}) {
  const count = useCounter(benefit.metric, 1800, isVisible)

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: isVisible ? `${200 + index * 150}ms` : "0ms" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <benefit.icon className="h-6 w-6" />
        </div>
        <span className="text-3xl font-bold text-accent md:text-4xl">
          {count}
          {benefit.suffix}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-foreground">
        {benefit.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {benefit.description}
      </p>
    </div>
  )
}

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="bg-card py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Business Impact
          </p>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Measurable Results That Matter
          </h2>
          <p
            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Our implementations deliver tangible outcomes that transform
            organizations and drive meaningful growth.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <BenefitCard
              key={benefit.title}
              benefit={benefit}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
