"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMedia } from "@/hooks/use-media"

const hardcodedTeamMembers = [
    {
        name: "Dr. Ahmed Hassan",
        role: "Managing Partner",
        bio: "Over 20 years of experience in strategic consulting and digital transformation across East Africa.",
        image: "/placeholder-team-1.jpg",
        initials: "AH"
    },
    {
        name: "Sarah Williams",
        role: "Head of ERP Solutions",
        bio: "Certified Odoo Expert with a track record of 50+ successful ERP implementations in manufacturing and retail.",
        image: "/placeholder-team-2.jpg",
        initials: "SW"
    },
    {
        name: "Michael Chen",
        role: "Director of Technology",
        bio: "Leading our tech initiatives, Michael specializes in cloud architecture, cybersecurity, and AI integration.",
        image: "/placeholder-team-3.jpg",
        initials: "MC"
    },
    {
        name: "Fatima Ali",
        role: "Senior Financial Consultant",
        bio: "Expert in IFRS compliance and financial modernization, helping clients optimize their accounting processes.",
        image: "/placeholder-team-4.jpg",
        initials: "FA"
    },
]

export function Team({ showHeader = true }: { showHeader?: boolean }) {
    const { ref, isVisible } = useScrollAnimation()
    const { media: dynamicTeam } = useMedia('team')

    const allTeamMembers = [
        ...hardcodedTeamMembers,
        ...dynamicTeam.map(file => ({
            name: file.name.split('.')[0].replace(/-/g, ' '),
            role: "Consultant",
            bio: "Strategic expert at Merit Advisory specializing in enterprise solutions and client success.",
            image: file.url,
            initials: file.name.substring(0, 2).toUpperCase()
        }))
    ]

    return (
        <section id="team" className={cn("py-24 md:py-32", !showHeader && "py-12 md:py-16")}>
            <div ref={ref} className="mx-auto max-w-7xl px-6">
                {showHeader && (
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Our Experts
                        </Badge>
                        <h2
                            className={`text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Meet the Team
                        </h2>
                        <p
                            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            The minds behind our successful digital transformations.
                        </p>
                    </div>
                )}

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {allTeamMembers.map((member: any, i: number) => (
                        <div
                            key={member.name}
                            className={`group relative transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                }`}
                            style={{ transitionDelay: `${200 + i * 100}ms` }}
                        >
                            <Card className="overflow-hidden border-border bg-card hover:shadow-lg transition-shadow">
                                <div className="relative aspect-square overflow-hidden bg-muted">
                                    {member.image && !member.image.includes('placeholder') ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:scale-105 transition-transform duration-500">
                                            <span className="text-4xl font-bold opacity-30">{member.initials}</span>
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                    <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
                                    <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                                        {member.bio}
                                    </p>

                                    <div className="mt-6 flex justify-center gap-4">
                                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Linkedin className="h-4 w-4" />
                                        </Link>
                                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Twitter className="h-4 w-4" />
                                        </Link>
                                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Mail className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
