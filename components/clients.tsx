"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"
import { clientsData } from "@/lib/clients-data"
import { cn } from "@/lib/utils"
import { useMedia } from "@/hooks/use-media"

export function Clients({ showHeader = true }: { showHeader?: boolean }) {
    const { ref, isVisible } = useScrollAnimation()
    const { media: dynamicClients } = useMedia('clients')

    const allClients = [
        ...clientsData,
        ...dynamicClients.map(file => ({
            name: file.name.split('.')[0].replace(/-/g, ' '),
            industry: "Partner Client",
            logo: file.url
        }))
    ]

    return (
        <section id="clients" className={cn("py-24 bg-background", !showHeader && "py-12 md:py-16")}>
            <div ref={ref} className="mx-auto max-w-7xl px-6">
                {showHeader && (
                    <div className="mx-auto max-w-2xl text-center mb-20">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Our Portfolio
                        </Badge>
                        <h2
                            className={`text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Trusted Partners & Clients
                        </h2>
                        <p
                            className={`mt-4 text-lg text-muted-foreground transition-all duration-700 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Over the years, we've had the privilege of working with a diverse range of
                            organizations, from innovative startups to large-scale enterprises.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {allClients.map((client, i) => (
                        <div
                            key={`${client.name}-${i}`}
                            className={`group relative flex flex-col items-center justify-center rounded-xl bg-card border border-border/50 p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 grayscale hover:grayscale-0 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                                }`}
                            style={{ transitionDelay: `${Math.min(i * 30, 800)}ms` }}
                        >
                            {/* Logo Center */}
                            <div className="h-20 w-full flex items-center justify-center relative z-10 p-2">
                                {client.logo ? (
                                    <img
                                        src={client.logo}
                                        alt={`${client.name} Logo`}
                                        className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <span className="text-lg font-black tracking-tighter text-[#1f2933]/60 group-hover:text-primary transition-colors">
                                        {client.name.toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className="mt-4 overflow-hidden h-4 relative z-10 text-center">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#0f55ba] opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {client.industry}
                                </span>
                            </div>

                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
