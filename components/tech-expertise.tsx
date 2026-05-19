"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"
import { 
    Cpu, 
    Database, 
    Cloud, 
    Monitor, 
    Layers, 
    Zap, 
    ShieldCheck, 
    LineChart,
    Terminal,
    Code2,
    Workflow,
    Smartphone
} from "lucide-react"

const techCategories = [
    {
        name: "Enterprise ERP",
        description: "Specialized implementation and customization of global ERP ecosystems.",
        icon: Terminal,
        items: [
            { name: "Odoo Enterprise", logo: "https://cdn.worldvectorlogo.com/logos/odoo.svg" },
            { name: "SAP S/4HANA", logo: "https://cdn.worldvectorlogo.com/logos/sap-3.svg" },
            { name: "Oracle NetSuite", logo: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg" },
            { name: "Microsoft Dynamics", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-dynamics-365.svg" }
        ]
    },
    {
        name: "Modern Software Engineering",
        description: "Full-stack development using the latest frameworks for speed and scale.",
        icon: Code2,
        items: [
            { name: "Next.js / React", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
            { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
            { name: "Python / Django", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
            { name: "Go / Rust", logo: "https://cdn.worldvectorlogo.com/logos/gopher.svg" }
        ]
    },
    {
        name: "Cloud & Intelligent Infra",
        description: "Robust, secure, and automated cloud architectures.",
        icon: Cloud,
        items: [
            { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
            { name: "Azure", logo: "https://cdn.worldvectorlogo.com/logos/azure-2.svg" },
            { name: "Docker / K8s", logo: "https://cdn.worldvectorlogo.com/logos/kubernetes.svg" },
            { name: "Terraform", logo: "https://cdn.worldvectorlogo.com/logos/terraform-enterprise.svg" }
        ]
    },
    {
        name: "Mobility & UX",
        description: "User-centric mobile experiences and interface design.",
        icon: Smartphone,
        items: [
            { name: "Flutter", logo: "https://cdn.worldvectorlogo.com/logos/flutter.svg" },
            { name: "React Native", logo: "https://cdn.worldvectorlogo.com/logos/react-native-1.svg" },
            { name: "Swift / Kotlin", logo: "https://cdn.worldvectorlogo.com/logos/swift-15.svg" },
            { name: "Figma", logo: "https://cdn.worldvectorlogo.com/logos/figma-1.svg" }
        ]
    }
]

export function TechExpertise() {
    const { ref, isVisible } = useScrollAnimation()

    return (
        <section className="py-24 bg-card relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
            <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                        Technology & Expertise
                    </Badge>
                    <h2 className={`text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        Our Global Tech Stack
                    </h2>
                    <p className={`mt-6 max-w-2xl text-lg text-muted-foreground transition-all duration-700 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        Taking inspiration from Ksolves and global tech leaders, we maintain mastery over the tools that drive modern business.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {techCategories.map((cat, idx) => (
                        <div 
                            key={cat.name} 
                            className={`group rounded-2xl border border-border bg-background p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                            style={{ transitionDelay: `${200 + idx * 100}ms` }}
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <cat.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{cat.name}</h3>
                            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                                {cat.description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-3">
                                {cat.items.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center justify-center rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-white hover:shadow-md">
                                        <img src={item.logo} alt={item.name} className="h-6 w-auto grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                                        <span className="mt-2 text-[8px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
