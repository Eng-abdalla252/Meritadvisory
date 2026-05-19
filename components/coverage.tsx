"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card } from "@/components/ui/card"
import { MapPin, Globe, Users, Building2 } from "lucide-react"
import Image from "next/image"

const coverage = [
    {
        icon: Building2,
        title: "4 Office Locations",
        description: "Strategic offices across Somalia",
        color: "from-[#0f55ba] to-[#c11e1e]",
    },
    {
        icon: MapPin,
        title: "Regional Coverage",
        description: "Serving clients across the region",
        color: "from-[#c11e1e] to-[#0f55ba]",
    },
    {
        icon: Users,
        title: "500+ Clients",
        description: "Trusted by businesses region-wide",
        color: "from-[#0f55ba] via-[#c11e1e] to-[#0f55ba]",
    },
    {
        icon: Globe,
        title: "Regional Expertise",
        description: "Deep understanding of local markets",
        color: "from-[#c11e1e] via-[#0f55ba] to-[#c11e1e]",
    },
]

const offices = [
    {
        city: "Mogadishu",
        region: "Somalia",
        position: { top: "45%", left: "72%" },
        isHeadquarters: true,
    },
    {
        city: "Hargeisa",
        region: "Somaliland",
        position: { top: "28%", left: "60%" },
        isHeadquarters: false,
    },
    {
        city: "Garowe",
        region: "Puntland",
        position: { top: "32%", left: "68%" },
        isHeadquarters: false,
    },
    {
        city: "Bosaso",
        region: "Puntland",
        position: { top: "22%", left: "75%" },
        isHeadquarters: false,
    },
]

const countries = [
    "Somalia",
    "Kenya",
    "Ethiopia",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Burundi",
    "South Sudan",
    "Mozambique",
    "Zambia",
    "Congo (DRC)",
]

export function Coverage() {
    const { ref, isVisible } = useScrollAnimation()

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background py-24 md:py-32">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div ref={ref} className="relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <p
                        className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        Our Reach
                    </p>
                    <h2
                        className={`text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        Serving Africa
                    </h2>
                    <p
                        className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        With strategic offices across Somalia and expertise spanning East, Central, and Southern Africa, we're positioned to serve your business wherever you are.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {coverage.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <Card
                                key={item.title}
                                className={`group relative overflow-hidden p-6 text-center transition-all duration-600 hover:-translate-y-2 hover:shadow-xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${300 + i * 100}ms` }}
                            >
                                {/* Gradient glow */}
                                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${item.color} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`} />

                                {/* Icon */}
                                <div className={`relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                                    <Icon className="h-8 w-8" />
                                </div>

                                {/* Content */}
                                <h3 className="relative text-2xl font-bold text-foreground">
                                    {item.title}
                                </h3>
                                <p className="relative mt-2 text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </Card>
                        )
                    })}
                </div>

                {/* Map Section */}
                <div
                    className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                >
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        {/* Map */}
                        <div className="relative">
                            <div className="relative aspect-[3/4] max-w-md mx-auto">
                                {/* Map container with shadow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />

                                {/* Map background */}
                                <div className="relative rounded-2xl border-2 border-border bg-card p-8 shadow-2xl">
                                    {/* SVG Map placeholder - East Africa outline */}
                                    <div className="relative aspect-[3/4] w-full">
                                        <svg viewBox="0 0 400 600" className="h-full w-full" fill="none">
                                            {/* Simplified East Africa map shape */}
                                            <path
                                                d="M200 50 L250 80 L280 120 L300 180 L310 240 L300 300 L280 360 L250 420 L220 480 L200 540 L180 500 L160 460 L140 400 L120 340 L110 280 L120 220 L140 160 L160 100 L180 70 Z"
                                                fill="currentColor"
                                                className="text-muted-foreground/20"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                            />

                                            {/* Country borders (simplified) */}
                                            <path
                                                d="M200 50 L200 540"
                                                stroke="currentColor"
                                                strokeWidth="0.5"
                                                className="text-border"
                                                strokeDasharray="4 4"
                                            />
                                            <path
                                                d="M120 180 L300 180"
                                                stroke="currentColor"
                                                strokeWidth="0.5"
                                                className="text-border"
                                                strokeDasharray="4 4"
                                            />
                                            <path
                                                d="M120 340 L280 340"
                                                stroke="currentColor"
                                                strokeWidth="0.5"
                                                className="text-border"
                                                strokeDasharray="4 4"
                                            />
                                        </svg>

                                        {/* Office location pins */}
                                        {offices.map((office, i) => (
                                            <div
                                                key={office.city}
                                                className="absolute group/pin"
                                                style={{
                                                    top: office.position.top,
                                                    left: office.position.left,
                                                    transform: "translate(-50%, -100%)",
                                                }}
                                            >
                                                {/* Pin */}
                                                <div className="relative animate-bounce-slow" style={{ animationDelay: `${i * 200}ms`, animationDuration: "2s" }}>
                                                    <MapPin className={`h-8 w-8 ${office.isHeadquarters ? "text-accent" : "text-primary"} drop-shadow-lg`} fill="currentColor" />
                                                </div>

                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block">
                                                    <div className="whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background shadow-xl">
                                                        {office.city}
                                                        {office.isHeadquarters && " (HQ)"}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Legend */}
                                    <div className="mt-6 flex items-center justify-center gap-6 text-xs">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-accent" fill="currentColor" />
                                            <span className="text-muted-foreground">Headquarters</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-primary" fill="currentColor" />
                                            <span className="text-muted-foreground">Branch Office</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Countries List */}
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6">
                                Countries We Serve
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {countries.map((country, i) => (
                                    <div
                                        key={country}
                                        className={`group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                                            }`}
                                        style={{ transitionDelay: `${700 + i * 80}ms` }}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <Globe className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{country}</p>
                                            <p className="text-xs text-muted-foreground">Africa</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                                <h4 className="text-lg font-bold text-foreground">
                                    Expand Your Business Across Africa
                                </h4>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Partner with us to unlock opportunities in one of Africa's fastest-growing regions.
                                </p>
                                <a
                                    href="#contact"
                                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
                                >
                                    Get Started
                                    <MapPin className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}
