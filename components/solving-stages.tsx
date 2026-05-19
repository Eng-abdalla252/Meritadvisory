"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"
import { 
    Search, 
    Lightbulb, 
    Settings2, 
    Rocket, 
    RefreshCcw,
    ChevronRight
} from "lucide-react"

const stages = [
    {
        title: "Strategic Discovery",
        desc: "We analyze your business ecosystem, identifying bottlenecks and opportunities for digital disruption.",
        icon: Search,
        color: "bg-blue-500"
    },
    {
        title: "Architectural Blueprint",
        desc: "Our experts design a scalable roadmap, selecting the perfect tech stack and ERP framework for your needs.",
        icon: Lightbulb,
        color: "bg-purple-500"
    },
    {
        title: "Agile Development",
        desc: "We execute through rapid, iterative cycles, ensuring transparency and continuous delivery of value.",
        icon: Settings2,
        color: "bg-emerald-500"
    },
    {
        title: "Quality Engineering",
        desc: "Rigorous automated testing and security audits ensure a resilient, production-ready solution.",
        icon: ShieldCheck,
        color: "bg-amber-500"
    },
    {
        title: "Deployment & Scaling",
        desc: "Smooth migration, user training, and ongoing optimization to ensure your systems grow with your business.",
        icon: Rocket,
        color: "bg-rose-500"
    }
]

import { ShieldCheck } from "lucide-react"

export function SolvingStages() {
    const { ref, isVisible } = useScrollAnimation()

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                        Methodology
                    </Badge>
                    <h2 className={`text-3xl font-bold tracking-tight text-foreground md:text-5xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        Our Stages of Solving
                    </h2>
                    <p className={`mt-6 max-w-2xl text-lg text-muted-foreground transition-all duration-700 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        A structured, world-class approach to project delivery, ensuring every implementation is a strategic success.
                    </p>
                </div>

                <div className="relative">
                    {/* Progress line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border hidden lg:block -translate-y-1/2" />
                    
                    <div className="grid gap-8 lg:grid-cols-5">
                        {stages.map((stage, idx) => (
                            <div 
                                key={stage.title} 
                                className={`relative flex flex-col items-center text-center group transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                                style={{ transitionDelay: `${200 + idx * 100}ms` }}
                            >
                                <div className={`relative z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-full ${stage.color} text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                                    <stage.icon className="h-8 w-8" />
                                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-border text-xs font-bold text-foreground">
                                        0{idx + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {stage.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed px-4">
                                    {stage.desc}
                                </p>
                                
                                {idx < stages.length - 1 && (
                                    <div className="absolute top-10 -right-4 hidden lg:block text-border group-hover:text-primary transition-colors">
                                        <ChevronRight className="h-6 w-6" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
