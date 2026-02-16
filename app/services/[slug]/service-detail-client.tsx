"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    TrendingUp,
    Users,
    Award,
    Zap,
    Shield,
    Target,
} from "lucide-react"
import Link from "next/link"
import { iconMap } from "@/lib/icon-map"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface ServiceDetail {
    slug: string
    iconName: string
    title: string
    subtitle: string
    heroDescription: string
    keyBenefits: string[]
    approach: Array<{ step: string; detail: string }>
    technologies: string[]
    stats: Array<{ value: string; label: string }>
}

interface ServiceDetailClientProps {
    service: ServiceDetail
    related: ServiceDetail[]
}

export function ServiceDetailClient({ service, related }: ServiceDetailClientProps) {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation()
    const { ref: approachRef, isVisible: approachVisible } = useScrollAnimation()
    const { ref: techRef, isVisible: techVisible } = useScrollAnimation()
    const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()
    const { ref: relatedRef, isVisible: relatedVisible } = useScrollAnimation()

    const Icon = iconMap[service.iconName] || Target

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background pt-32 pb-20 md:pt-40 md:pb-32">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div ref={heroRef} className="relative mx-auto max-w-7xl px-6">
                    <Button
                        variant="ghost"
                        asChild
                        className="mb-8 pl-0 hover:bg-transparent hover:text-primary transition-colors"
                    >
                        <Link href="/" className="flex items-center gap-2 text-muted-foreground">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>

                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <div
                                className={`inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-primary transition-all duration-600 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-sm font-semibold">{service.title}</span>
                            </div>

                            <h1
                                className={`mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-600 delay-100 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                {service.subtitle}
                            </h1>

                            <p
                                className={`mt-6 text-lg text-muted-foreground leading-relaxed transition-all duration-600 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                {service.heroDescription}
                            </p>

                            <div
                                className={`mt-8 flex flex-wrap gap-4 transition-all duration-600 delay-300 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                <Button size="lg" className="group">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <Button size="lg" variant="outline">
                                    Schedule Consultation
                                </Button>
                            </div>
                        </div>

                        {/* Decorative Visualization */}
                        <div
                            className={`relative transition-all duration-1000 delay-400 ${heroVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                                }`}
                        >
                            <div className="relative aspect-square">
                                {/* Central Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 animate-ping-slow rounded-full bg-primary/20" />
                                        <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-2xl">
                                            <Icon className="h-16 w-16 text-primary-foreground" />
                                        </div>
                                    </div>
                                </div>

                                {/* Orbiting Benefits */}
                                {[
                                    { icon: CheckCircle2, label: "Quality", angle: 0 },
                                    { icon: Zap, label: "Speed", angle: 60 },
                                    { icon: Shield, label: "Security", angle: 120 },
                                    { icon: Target, label: "Precision", angle: 180 },
                                    { icon: Award, label: "Excellence", angle: 240 },
                                    { icon: Users, label: "Support", angle: 300 },
                                ].map((item, i) => {
                                    const OrbitIcon = item.icon
                                    const radius = 180
                                    const x = Math.cos((item.angle * Math.PI) / 180) * radius
                                    const y = Math.sin((item.angle * Math.PI) / 180) * radius

                                    return (
                                        <div
                                            key={i}
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                                                animationDelay: `${i * 0.2}s`,
                                            }}
                                        >
                                            <div className="group relative">
                                                <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl transition-all group-hover:bg-accent/40" />
                                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent/30 bg-background shadow-lg">
                                                    <OrbitIcon className="h-7 w-7 text-accent" />
                                                </div>
                                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                                                    {item.label}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="border-y bg-card py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 md:grid-cols-3">
                        {service.stats.map((stat, i) => (
                            <div
                                key={i}
                                className={`text-center transition-all duration-600 ${statsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div className="text-4xl font-bold text-primary md:text-5xl">{stat.value}</div>
                                <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Benefits Section */}
            <section ref={benefitsRef} className="py-20 md:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2
                            className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${benefitsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Key Benefits
                        </h2>
                        <p
                            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${benefitsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Discover the transformative advantages our {service.title.toLowerCase()} brings to your organization
                        </p>
                    </div>

                    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {service.keyBenefits.map((benefit, i) => (
                            <Card
                                key={i}
                                className={`group relative overflow-hidden p-6 transition-all duration-600 hover:-translate-y-1 hover:shadow-xl ${benefitsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${200 + i * 80}ms` }}
                            >
                                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-accent/10 blur-2xl transition-all group-hover:bg-accent/20" />
                                <div className="relative flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Approach Section */}
            <section ref={approachRef} className="bg-card py-20 md:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2
                            className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${approachVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Our Proven Approach
                        </h2>
                        <p
                            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${approachVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            A systematic methodology that ensures successful delivery every time
                        </p>
                    </div>

                    <div className="mt-16 space-y-8">
                        {service.approach.map((step, i) => (
                            <div
                                key={i}
                                className={`group relative transition-all duration-600 ${approachVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${200 + i * 100}ms` }}
                            >
                                <div className="flex gap-6">
                                    {/* Step Number */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-bold text-primary-foreground shadow-lg">
                                                {i + 1}
                                            </div>
                                            {i < service.approach.length - 1 && (
                                                <div className="absolute left-1/2 top-12 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-accent/50 to-transparent" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Step Content */}
                                    <Card className="flex-1 p-6 transition-all group-hover:shadow-lg">
                                        <h3 className="text-xl font-semibold text-foreground">{step.step}</h3>
                                        <p className="mt-3 leading-relaxed text-muted-foreground">{step.detail}</p>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section ref={techRef} className="py-20 md:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2
                            className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${techVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Technologies We Work With
                        </h2>
                        <p
                            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${techVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Industry-leading platforms and tools that power our solutions
                        </p>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {service.technologies.map((tech, i) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className={`px-6 py-3 text-base transition-all duration-600 hover:border-accent hover:bg-accent/10 hover:text-accent ${techVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-primary to-accent py-20 text-primary-foreground">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">Ready to Transform Your Business?</h2>
                    <p className="mt-4 text-lg opacity-90">
                        Let's discuss how our {service.title.toLowerCase()} can drive measurable results for your organization.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button size="lg" variant="secondary" className="group">
                            Schedule a Free Consultation
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                            Download Service Brief
                        </Button>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {related.length > 0 && (
                <section ref={relatedRef} className="bg-card py-20 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2
                                className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${relatedVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                Related Services
                            </h2>
                            <p
                                className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${relatedVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                Explore other ways we can help your business grow
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-3">
                            {related.map((relatedService, i) => {
                                const RelatedIcon = iconMap[relatedService.iconName] || Target
                                return (
                                    <Link
                                        key={relatedService.slug}
                                        href={`/services/${relatedService.slug}`}
                                        className={`group transition-all duration-600 ${relatedVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                            }`}
                                        style={{ transitionDelay: `${200 + i * 100}ms` }}
                                    >
                                        <Card className="h-full p-6 transition-all hover:-translate-y-2 hover:shadow-xl">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                                                <RelatedIcon className="h-6 w-6" />
                                            </div>
                                            <h3 className="mt-4 text-xl font-semibold text-foreground">
                                                {relatedService.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                                                {relatedService.heroDescription}
                                            </p>
                                            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                                                Learn More
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
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
            <Footer />
        </div>
    )
}
