"use client"

import * as React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Star, Facebook, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
export function Team({ showHeader = true }: { showHeader?: boolean }) {
    const [teamMembers, setTeamMembers] = React.useState<any[]>([])
    const [otherTeamMembers, setOtherTeamMembers] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const normalize = (value: any) => Array.isArray(value) ? value : []

        Promise.all([
            fetch("/data/team.json").then(res => res.json()),
            fetch("/data/other-team.json").then(res => res.json())
        ]).then(([team, other]) => {
            setTeamMembers(normalize(team))
            setOtherTeamMembers(normalize(other))
            setLoading(false)
        }).catch(() => {
            setTeamMembers([])
            setOtherTeamMembers([])
            setLoading(false)
        })
    }, [])

    const getImageSrc = (image?: string) => image ? encodeURI(image) : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"

    if (loading) return null
    return (
        <section id="team" className={cn("py-24 bg-slate-50/50", !showHeader && "py-12")}>
            <div className="mx-auto max-w-7xl px-6">
                {showHeader && (
                    <div className="mx-auto max-w-4xl text-center mb-20">
                        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary px-4 py-1">
                            OUR LEADERSHIP
                        </Badge>
                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            Empowering with <span className="text-primary italic">Expertise</span> & Experience
                        </h2>
                    </div>
                )}

                {/* Leadership Section */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-32">
                    {teamMembers.map((member, i) => (
                        <div
                            key={member.name}
                            className="group relative flex flex-col items-center"
                        >
                            <div className="relative mb-8">
                                <div className="h-48 w-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-slate-200">
                                    <img
                                        src={getImageSrc(member.image)}
                                        alt={member.name}
                                        className="h-full w-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>
                            </div>

                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                {member.expHeader}
                            </p>
                            <h3 className="text-2xl font-black text-slate-900 text-center mb-2">{member.name}</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-6">{member.role}</p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 w-full gap-2 mb-6">
                                <div className="bg-slate-100/80 rounded-lg p-3 text-center border border-slate-200">
                                    <div className="text-lg font-black text-primary">{member.yearsExp}</div>
                                    <div className="text-[9px] font-bold text-red-600 uppercase">Years Exp</div>
                                </div>
                                <div className="bg-slate-100/80 rounded-lg p-3 text-center border border-slate-200">
                                    <div className="text-lg font-black text-primary">{member.qualification}</div>
                                    <div className="text-[9px] font-bold text-red-600 uppercase">{member.qualLabel}</div>
                                </div>
                            </div>

                            <p className="text-sm leading-relaxed text-slate-600 text-center mb-6 px-2">
                                {member.bio}
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-4 mb-8">
                                <a 
                                    href={(member as any).facebook} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1e4e8c]/5 text-[#1e4e8c] hover:bg-[#1e4e8c] hover:text-white transition-all duration-300"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a 
                                    href={(member as any).linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1e4e8c]/5 text-[#1e4e8c] hover:bg-[#1e4e8c] hover:text-white transition-all duration-300"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>

                            <a 
                                href={`mailto:${member.email}`}
                                className="mt-auto w-full flex items-center justify-center gap-2 bg-[#b22222] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#8b0000] transition-colors shadow-md shadow-red-900/10"
                            >
                                <Mail className="h-4 w-4" />
                                {member.email}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Team Behind Merit Section */}
                <div className="mt-40">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#1e4e8c] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg mb-6">
                            <Star className="h-4 w-4 fill-white" />
                            Meet the Team Behind Merit
                        </div>
                        <h3 className="text-3xl font-extrabold text-[#b22222]">Driven by Expertise. Focused on Results.</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {otherTeamMembers.map((member, i) => (
                            <div 
                                key={member.name}
                                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                                    <img 
                                        src={getImageSrc(member.image)} 
                                        alt={member.name} 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="bg-[#b22222] p-4 text-center">
                                    <p className="font-black text-white text-base">{member.name}</p>
                                    <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-slate-500 text-lg italic max-w-4xl mx-auto px-6">
                            Merit Advisory Services LLP, our team brings strong expertise in finance, audit, advisory, and ERP solutions, delivering practical and reliable services that support compliance, efficiency, and sustainable growth.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
