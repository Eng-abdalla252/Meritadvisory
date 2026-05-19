"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BrainCircuit, Cpu, CloudCog, LayoutPanelLeft, Box } from "lucide-react"
import { cn } from "@/lib/utils"

const expertiseData = [
    {
        id: "ai",
        title: "Artificial Intelligence & Machine Learning",
        desc: "Merit Advisory AI/ML services to experience the transformative potential of automation, cost reduction, and a wide range of business opportunities to catalyze transformative growth & innovation.",
        icon: BrainCircuit,
        nodeLabel: "AI/ML",
        subServices: [
            { name: "Generative AI", icon: "https://cdn-icons-png.flaticon.com/512/8644/8644438.png" },
            { name: "Deep Learning", icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png" },
            { name: "Predictive Analysis", icon: "https://cdn-icons-png.flaticon.com/512/2620/2620601.png" },
            { name: "NLP", icon: "https://cdn-icons-png.flaticon.com/512/6122/6122171.png" },
            { name: "Computer Vision", icon: "https://cdn-icons-png.flaticon.com/512/2592/2592271.png" }
        ]
    },
    {
        id: "agentic",
        title: "Agentic AI",
        desc: "Empower autonomous, goal-driven intelligence with Merit Advisory to adapt, reason, and act independently while delivering consistent, measurable business impact.",
        icon: Cpu,
        nodeLabel: "Agentic AI",
        subServices: [
            { name: "Consulting", icon: "https://cdn-icons-png.flaticon.com/512/921/921347.png" },
            { name: "Development", icon: "https://cdn-icons-png.flaticon.com/512/1157/1157109.png" },
            { name: "Orchestration", icon: "https://cdn-icons-png.flaticon.com/512/2463/2463492.png" },
            { name: "Integration", icon: "https://cdn-icons-png.flaticon.com/512/5969/5969165.png" },
            { name: "Support & Maintenance", icon: "https://cdn-icons-png.flaticon.com/512/561/561127.png" }
        ]
    },
    {
        id: "salesforce",
        title: "Salesforce Solutions",
        desc: "Merit Advisory covers the entire gamut of personalized solutions, starting right from the Salesforce rollout to implementation and customization.",
        icon: LayoutPanelLeft,
        nodeLabel: "Salesforce",
        subServices: [
            { name: "Salesforce CPQ", icon: "https://cdn-icons-png.flaticon.com/512/732/732245.png" },
            { name: "Marketing Cloud", icon: "https://cdn-icons-png.flaticon.com/512/1162/1162933.png" },
            { name: "Sales Cloud", icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" },
            { name: "Commerce Cloud", icon: "https://cdn-icons-png.flaticon.com/512/1170/1170577.png" },
            { name: "Einstein Analytics", icon: "https://cdn-icons-png.flaticon.com/512/2103/2103533.png" }
        ]
    },
    {
        id: "devops",
        title: "DevOps Consulting",
        desc: "Merit Advisory DevOps Consulting Services provides end-to-end solutions designed to overcome the hurdles presented by constant market upgrades.",
        icon: CloudCog,
        nodeLabel: "DevOps",
        subServices: [
            { name: "Docker", icon: "https://cdn-icons-png.flaticon.com/512/919/919853.png" },
            { name: "Kubernetes", icon: "https://cdn-icons-png.flaticon.com/512/3890/3890666.png" },
            { name: "Azure", icon: "https://cdn-icons-png.flaticon.com/512/732/732221.png" },
            { name: "Data Visualization", icon: "https://cdn-icons-png.flaticon.com/512/427/427735.png" },
            { name: "App Monitoring", icon: "https://cdn-icons-png.flaticon.com/512/1162/1162456.png" }
        ]
    },
    {
        id: "odoo",
        title: "Odoo Enterprise",
        desc: "We have a team of highly trained Odoo specialists who help us build, deploy, and design ERP systems that assist our customers.",
        icon: Box,
        nodeLabel: "Odoo",
        subServices: [
            { name: "Customization", icon: "https://cdn-icons-png.flaticon.com/512/3132/3132084.png" },
            { name: "Implementation", icon: "https://cdn-icons-png.flaticon.com/512/2618/2618576.png" },
            { name: "Integration", icon: "https://cdn-icons-png.flaticon.com/512/5969/5969165.png" },
            { name: "Migration", icon: "https://cdn-icons-png.flaticon.com/512/1170/1170667.png" },
            { name: "Consultancy", icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png" }
        ]
    }
]

export function VerticalTreeServices() {
    const { ref, isVisible } = useScrollAnimation()

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div ref={ref} className="mx-auto max-w-7xl px-6 relative">
                {/* Vertical Center Line */}
                <div className="absolute left-1/2 top-0 h-full w-px bg-border -translate-x-1/2 hidden lg:block" />

                <div className="flex flex-col items-center text-center mb-24">
                    <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                        Our Capabilities
                    </Badge>
                    <h2 className="text-3xl font-bold md:text-5xl lg:text-6xl text-foreground max-w-4xl">
                        End-to-End Digital Transformation <span className="text-primary italic">Expertise</span>
                    </h2>
                </div>

                <div className="space-y-32">
                    {expertiseData.map((section, idx) => (
                        <div key={section.id} className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
                            
                            {/* Left Side: Text */}
                            <div className={`w-full lg:w-[42%] text-center lg:text-left transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                                <h3 className="text-3xl font-bold text-foreground mb-4">{section.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {section.desc}
                                </p>
                            </div>

                            {/* Center: Node and Connecting Line */}
                            <div className="relative z-10 w-full lg:w-[16%] flex flex-col items-center justify-center">
                                {/* Node */}
                                <div className="relative group">
                                    <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative h-20 w-20 rounded-full border border-border bg-background shadow-lg flex items-center justify-center transition-all duration-500 group-hover:border-primary group-hover:scale-110">
                                        <section.icon className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/20 bg-background px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                        {section.nodeLabel}
                                    </div>
                                </div>
                                
                                {/* Connecting horizontal line to right side (Desktop) */}
                                <div className="absolute left-1/2 top-10 w-full h-px bg-border hidden lg:block -z-10" />
                                <div className="absolute right-0 top-10 h-3 w-3 rounded-full border-2 border-primary bg-background hidden lg:block translate-x-1/2 -translate-y-1/2" />
                            </div>

                            {/* Right Side: Grid of Sub-Services */}
                            <div className={`w-full lg:w-[42%] transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {section.subServices.map((sub, sIdx) => (
                                        <div key={sub.name} className="group relative flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1">
                                            <div className="h-10 w-10 mb-3 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
                                                <img src={sub.icon} alt={sub.name} className="h-full w-full object-contain" />
                                            </div>
                                            <span className="text-[10px] font-bold text-muted-foreground text-center group-hover:text-foreground transition-colors uppercase tracking-tight leading-tight">
                                                {sub.name}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-center p-4">
                                        <Link href={`/services/${section.id}`} className="flex items-center gap-1 text-[10px] font-black uppercase text-primary hover:text-accent transition-colors group">
                                            View More <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

import Link from "next/link"
