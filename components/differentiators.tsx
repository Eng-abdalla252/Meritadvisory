"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
    Server,
    ClipboardCheck,
    Receipt,
    BookOpen,
    Users,
    Zap,
    DollarSign,
    Shield,
    Award,
    TrendingUp,
} from "lucide-react"

const differentiators = [
    {
        icon: Server,
        title: "End-to-End ERP Solutions",
        description: "Complete ERP lifecycle from selection to optimization",
        color: "text-[#0f55ba]",
        bgColor: "bg-[#0f55ba]/10",
    },
    {
        icon: ClipboardCheck,
        title: "Audit & Assurance Excellence",
        description: "Comprehensive audit services ensuring full compliance",
        color: "text-[#c11e1e]",
        bgColor: "bg-[#c11e1e]/10",
    },
    {
        icon: Receipt,
        title: "Tax Optimization Strategies",
        description: "Proactive tax planning saving you up to 35%",
        color: "text-[#0f55ba]",
        bgColor: "bg-[#0f55ba]/10",
    },
    {
        icon: BookOpen,
        title: "Corporate Training Hub",
        description: "Expert-led programs upskilling 2000+ professionals",
        color: "text-[#c11e1e]",
        bgColor: "bg-[#c11e1e]/10",
    },
    {
        icon: Users,
        title: "Seasoned Consultants",
        description: "Industry veterans with 15+ years average experience",
        color: "text-[#0f55ba]",
        bgColor: "bg-[#0f55ba]/10",
    },
    {
        icon: Zap,
        title: "Fast Implementation",
        description: "Rapid deployment with 99% on-time delivery rate",
        color: "text-[#c11e1e]",
        bgColor: "bg-[#c11e1e]/10",
    },
    {
        icon: DollarSign,
        title: "Affordable Pricing",
        description: "Enterprise solutions accessible to all organizations",
        color: "text-[#0f55ba]",
        bgColor: "bg-[#0f55ba]/10",
    },
    {
        icon: Shield,
        title: "Compliance Guaranteed",
        description: "100% regulatory adherence across jurisdictions",
        color: "text-[#c11e1e]",
        bgColor: "bg-[#c11e1e]/10",
    },
    {
        icon: Award,
        title: "Odoo Gold Partner",
        description: "Certified expertise in the complete Odoo ecosystem",
        color: "text-[#0f55ba]",
        bgColor: "bg-[#0f55ba]/10",
    },
    {
        icon: TrendingUp,
        title: "Proven Track Record",
        description: "500+ successful projects across 15+ industries",
        color: "text-[#c11e1e]",
        bgColor: "bg-[#c11e1e]/10",
    },
]

export function Differentiators() {
    const { ref, isVisible } = useScrollAnimation()

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background py-24 md:py-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div ref={ref} className="relative mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <p
                        className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        Why Choose Merit Advisory
                    </p>
                    <h2
                        className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        What Differentiates Merit Advisory?
                    </h2>
                    <p
                        className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        We're not just another consulting firm. We deliver collaborative, supportive, and results-driven solutions
                        that set us apart from the competition.
                    </p>
                </div>

                {/* Central Logo/Icon */}
                <div className="relative mx-auto my-16 flex items-center justify-center">
                    <div
                        className={`relative transition-all duration-1000 delay-300 ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                            }`}
                    >
                        {/* Animated Rings */}
                        <div className="absolute inset-0 -m-8 animate-ping-slow rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
                        <div className="absolute inset-0 -m-4 animate-ping-slow rounded-full bg-gradient-to-br from-accent/20 to-primary/20" style={{ animationDelay: "1s" }} />

                        {/* Central Platform */}
                        <div className="relative">
                            <div className="flex h-32 w-48 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-border/50 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 p-6">
                                <img src="/logo.png" alt="Merit Logo" className="w-full h-auto object-contain mix-blend-multiply" />
                            </div>

                            {/* Hexagonal Border Effect */}
                            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-xl opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Differentiators Grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {differentiators.map((item, i) => {
                        const Icon = item.icon
                        const row = Math.floor(i / 5)
                        const col = i % 5

                        return (
                            <div
                                key={i}
                                className={`group relative transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                    }`}
                                style={{
                                    transitionDelay: `${400 + i * 60}ms`,
                                    gridColumn: row === 1 && col < 5 ? "auto" : "auto"
                                }}
                            >
                                <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10">
                                    {/* Top Accent Line */}
                                    <div className={`absolute left-0 right-0 top-0 h-1 ${item.color.replace('text-', 'bg-')}`} />

                                    {/* Glow Effect */}
                                    <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${item.bgColor} blur-2xl opacity-0 transition-opacity group-hover:opacity-100`} />

                                    {/* Icon */}
                                    <div className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${item.bgColor} ${item.color} transition-all group-hover:scale-110`}>
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="relative text-base font-semibold text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>

                                    {/* Connection Line to Center (visible on hover) */}
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-0 bg-gradient-to-r from-accent/50 to-transparent opacity-0 transition-all group-hover:w-32 group-hover:opacity-100" />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <div
                    className={`mt-16 text-center transition-all duration-600 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}
                >
                    <p className="text-lg text-muted-foreground">
                        Ready to experience the Merit Advisory difference?
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#0f55ba] px-6 py-3 font-semibold text-white transition-all hover:bg-[#0c4494] hover:shadow-lg"
                        >
                            Get Started Today
                        </a>
                        <a
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 font-semibold text-[#1f2933] transition-all hover:bg-[#0f55ba]/10"
                        >
                            Explore Our Services
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
        </section>
    )
}
