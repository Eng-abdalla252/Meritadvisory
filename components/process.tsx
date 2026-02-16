"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Search, Lightbulb, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Search,
    number: "1",
    title: "Analysis",
    description:
      "We begin by understanding your business objectives, current systems, pain points, and growth vision through comprehensive stakeholder workshops.",
  },
  {
    icon: Lightbulb,
    number: "2",
    title: "Strategy",
    description:
      "Our team crafts a tailored roadmap with clear milestones, technology recommendations, and an architecture blueprint aligned with your goals.",
  },
  {
    icon: TrendingUp,
    number: "3",
    title: "Performance",
    description:
      "We execute with agile methodology, delivering iterative releases with rigorous testing, data migration, and seamless integrations.",
  },
  {
    icon: CheckCircle,
    number: "4",
    title: "Delivered",
    description:
      "Post-launch, we provide ongoing support, performance monitoring, user training, and continuous optimization to maximize your ROI.",
  },
]

export function Process() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="process" className="bg-gradient-to-br from-primary/5 via-accent/5 to-background py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            Our Process
          </p>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-primary md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            We take you through a smooth experience:
          </h2>
          <p
            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            A proven, structured approach that ensures every project is delivered on time, on budget, and above expectations.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative mt-16">
          {/* Desktop: Horizontal connecting line with arrows */}
          <div className="absolute top-12 left-0 right-0 hidden lg:flex items-center justify-between px-[10%]">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-primary/50" />
            <ArrowRight className="h-5 w-5 text-primary/50 mx-2" />
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/50 to-primary/50" />
            <ArrowRight className="h-5 w-5 text-primary/50 mx-2" />
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/50 to-primary/50" />
            <ArrowRight className="h-5 w-5 text-primary/50 mx-2" />
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/50 to-primary/30" />
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`group relative flex flex-col items-center text-center transition-all duration-600 ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                  }`}
                style={{
                  transitionDelay: isVisible ? `${300 + i * 150}ms` : "0ms",
                }}
              >
                {/* Mobile: Vertical arrow */}
                {i < steps.length - 1 && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:hidden">
                    <ArrowRight className="h-5 w-5 rotate-90 text-primary/50" />
                  </div>
                )}

                {/* Circular number badge */}
                <div className="relative z-10 mb-6">
                  {/* Glow effect */}
                  <div className="absolute inset-0 -m-2 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />

                  {/* Circle */}
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 shadow-lg transition-all group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-110">
                    <span className="text-4xl font-bold text-primary">
                      {step.number}
                    </span>
                  </div>

                  {/* Small icon badge */}
                  <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`mt-16 text-center transition-all duration-600 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-card p-8 shadow-lg sm:flex-row">
            <div className="flex-1 text-left">
              <h3 className="text-xl font-bold text-foreground">
                Ready to start your journey?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Let's discuss how we can transform your business together.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

