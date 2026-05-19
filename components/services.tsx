"use client"

import * as React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { 
    Rocket, 
    Receipt, 
    ClipboardCheck, 
    Lightbulb, 
    BookOpen, 
    Shield, 
    ArrowRight,
    Search,
    Monitor,
    Database,
    Zap,
    Cpu
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const iconMap: Record<string, any> = {
    Rocket,
    Receipt,
    ClipboardCheck,
    Lightbulb,
    BookOpen,
    Shield,
    Search,
    Monitor,
    Database,
    Zap,
    Cpu
}

export function Services() {
    const { ref, isVisible } = useScrollAnimation()
    const [servicesList, setServicesList] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch("/api/admin/data?type=services")
            .then(res => res.json())
            .then(data => {
                setServicesList(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading || servicesList.length === 0) return null

    return (
        <section id="services" className="relative py-16 md:py-24 overflow-hidden bg-background">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 -mr-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute bottom-0 left-0 -ml-20 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />

            <div ref={ref} className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-widest font-black">
                        Our Expertise
                    </Badge>
                    <h2
                        className={`text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        Professional IT & Advisory Services
                    </h2>
                    <p
                        className={`mt-4 max-w-2xl text-base text-muted-foreground transition-all duration-700 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        Taking inspiration from global tech leaders, we deliver end-to-end solutions that scale with your ambitions.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {servicesList.map((service, i) => {
                        const Icon = iconMap[service.icon] || Cpu
                        return (
                            <div
                                key={service.title}
                                className={`group relative transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${200 + i * 100}ms` }}
                            >
                                <Card className="h-full overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 rounded-[2rem]">
                                    <CardContent className="p-7">
                                        <div className={cn(
                                            "mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                                            service.color
                                        )}>
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight">
                                            {service.title}
                                        </h3>
                                        
                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-medium">
                                            {service.subtitle}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {service.tags.map((tag: string) => (
                                                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary/60 px-2 py-1 bg-primary/5 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <Link
                                            href={`/services/${service.slug}`}
                                            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary group/link"
                                        >
                                            Explore Solutions
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-2" />
                                        </Link>
                                    </CardContent>
                                    
                                    {/* Subtle Gradient Glow on Hover */}
                                    <div className={cn(
                                        "absolute inset-x-0 bottom-0 h-1 transition-all duration-500 group-hover:h-2 opacity-0 group-hover:opacity-100",
                                        service.color
                                    )} />
                                </Card>
                            </div>
                        )
                    })}
                </div>
                
                <div className="mt-20 text-center">
                    <p className="text-muted-foreground italic">
                        "Delivering excellence with global standards and local expertise."
                    </p>
                </div>
            </div>
        </section>
    )
}
