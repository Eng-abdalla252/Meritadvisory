"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"

const techCategories = [
    {
        name: "Enterprise ERP",
        items: [
            { name: "Odoo Enterprise", icon: "https://cdn.worldvectorlogo.com/logos/odoo.svg" },
            { name: "SAP S/4HANA", icon: "https://cdn.worldvectorlogo.com/logos/sap-3.svg" },
            { name: "Oracle NetSuite", icon: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg" },
            { name: "Microsoft Dynamics", icon: "https://cdn.worldvectorlogo.com/logos/microsoft-dynamics-365.svg" }
        ]
    },
    {
        name: "Digital Innovation",
        items: [
            { name: "React / Next.js", icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
            { name: "Node.js", icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
            { name: "Python", icon: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
            { name: "PostgreSQL", icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" }
        ]
    },
    {
        name: "Cloud & DevOps",
        items: [
            { name: "AWS", icon: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
            { name: "Microsoft Azure", icon: "https://cdn.worldvectorlogo.com/logos/azure-2.svg" },
            { name: "Docker", icon: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
            { name: "Kubernetes", icon: "https://cdn.worldvectorlogo.com/logos/kubernetes.svg" }
        ]
    }
]

export function TechStack() {
    const { ref, isVisible } = useScrollAnimation()

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div ref={ref} className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                        Our Technology Stack
                    </Badge>
                    <h2 className={`text-3xl font-bold tracking-tight text-foreground md:text-5xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        World-Class Tools for Modern Enterprise
                    </h2>
                </div>

                <div className="grid gap-12 md:grid-cols-3">
                    {techCategories.map((category, idx) => (
                        <div 
                            key={category.name} 
                            className={`space-y-8 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                            style={{ transitionDelay: `${200 + idx * 150}ms` }}
                        >
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-l-2 border-primary pl-4">
                                {category.name}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {category.items.map((item) => (
                                    <div key={item.name} className="group flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                                        <div className="h-10 w-10 grayscale group-hover:grayscale-0 transition-all">
                                            <img src={item.icon} alt={item.name} className="h-full w-full object-contain" />
                                        </div>
                                        <span className="mt-3 text-[10px] font-semibold text-muted-foreground group-hover:text-foreground">
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
