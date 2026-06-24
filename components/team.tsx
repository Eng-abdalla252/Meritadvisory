"use client"

import * as React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Mail, Star, Facebook, Linkedin, Award, Users, Globe, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TeamMember {
    name: string
    role: string
    image?: string
    expHeader?: string
    yearsExp?: string
    qualification?: string
    qualLabel?: string
    bio?: string
    email?: string
    facebook?: string
    linkedin?: string
}

const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"

function getMemberImage(image?: string): string {
    if (!image) return FALLBACK_AVATAR
    // Accept base64, absolute URLs, and relative paths
    if (image.startsWith("data:") || image.startsWith("http") || image.startsWith("/")) {
        return image
    }
    return `/${image}`
}

async function fetchJson(url: string): Promise<TeamMember[]> {
    try {
        const res = await fetch(url, { cache: "no-store" })
        if (!res.ok) return []
        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch {
        return []
    }
}

export function Team({ showHeader = true }: { showHeader?: boolean }) {
    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([])
    const [otherTeamMembers, setOtherTeamMembers] = React.useState<TeamMember[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        // Fetch from static JSON files in /public/data/ — works everywhere (dev, prod, Vercel)
        // Also try API route as fallback for fresh data after admin saves
        const ts = Date.now()
        Promise.all([
            // Try API first (returns fresh data), fall back to static JSON
            fetch(`/api/admin/data-api?type=team&_=${ts}`, { cache: "no-store" })
                .then(r => r.json())
                .catch(() => fetch(`/data/team.json?_=${ts}`).then(r => r.json()).catch(() => [])),
            fetch(`/api/admin/data-api?type=other-team&_=${ts}`, { cache: "no-store" })
                .then(r => r.json())
                .catch(() => fetch(`/data/other-team.json?_=${ts}`).then(r => r.json()).catch(() => [])),
        ]).then(([team, other]) => {
            setTeamMembers(Array.isArray(team) ? team : [])
            setOtherTeamMembers(Array.isArray(other) ? other : [])
        }).catch(() => {
            setTeamMembers([])
            setOtherTeamMembers([])
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) return (
        <section className="py-24 bg-slate-50/50">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="animate-pulse flex flex-col items-center gap-4">
                            <div className="h-48 w-48 rounded-full bg-slate-200" />
                            <div className="h-4 w-32 rounded bg-slate-200" />
                            <div className="h-3 w-24 rounded bg-slate-100" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

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

                {/* Leadership Partners Section */}
                {teamMembers.length > 0 && (
                    <div className={`grid gap-10 mb-32 ${teamMembers.length <= 2 ? 'md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.name + i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative flex flex-col items-center"
                            >
                                <div className="relative mb-8">
                                    <div className="h-48 w-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-slate-200">
                                        <Image
                                            src={getMemberImage(member.image)}
                                            alt={member.name}
                                            width={192}
                                            height={192}
                                            unoptimized
                                            className="h-full w-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                            onError={(e: any) => { e.target.src = FALLBACK_AVATAR }}
                                        />
                                    </div>
                                </div>

                                {member.expHeader && (
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                        {member.expHeader}
                                    </p>
                                )}
                                <h3 className="text-2xl font-black text-slate-900 text-center mb-2 group-hover:text-[#b22222] transition-colors">{member.name}</h3>
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-6">{member.role}</p>

                                {/* Stats Grid */}
                                {(member.yearsExp || member.qualification) && (
                                    <div className="grid grid-cols-2 w-full gap-2 mb-6">
                                        {member.yearsExp && (
                                            <div className="bg-slate-100/80 rounded-lg p-3 text-center border border-slate-200">
                                                <div className="text-lg font-black text-primary">{member.yearsExp}</div>
                                                <div className="text-[9px] font-bold text-red-600 uppercase">Years Exp</div>
                                            </div>
                                        )}
                                        {member.qualification && (
                                            <div className="bg-slate-100/80 rounded-lg p-3 text-center border border-slate-200">
                                                <div className="text-lg font-black text-primary">{member.qualification}</div>
                                                <div className="text-[9px] font-bold text-red-600 uppercase">{member.qualLabel}</div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {member.bio && (
                                    <p className="text-sm leading-relaxed text-slate-600 text-center mb-6 px-2">
                                        {member.bio}
                                    </p>
                                )}

                                {/* Social Links */}
                                {(member.facebook || member.linkedin) && (
                                    <div className="flex gap-4 mb-8">
                                        {member.facebook && (
                                            <a 
                                                href={member.facebook} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1e4e8c]/5 text-[#1e4e8c] hover:bg-[#1e4e8c] hover:text-white transition-all duration-300"
                                            >
                                                <Facebook className="h-5 w-5" />
                                            </a>
                                        )}
                                        {member.linkedin && (
                                            <a 
                                                href={member.linkedin} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1e4e8c]/5 text-[#1e4e8c] hover:bg-[#1e4e8c] hover:text-white transition-all duration-300"
                                            >
                                                <Linkedin className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                )}

                                {member.email && (
                                    <a 
                                        href={`mailto:${member.email}`}
                                        className="mt-auto w-full flex items-center justify-center gap-2 bg-[#b22222] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#8b0000] transition-colors shadow-md shadow-red-900/10"
                                    >
                                        <Mail className="h-4 w-4" />
                                        {member.email}
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Associate Team Section */}
                {otherTeamMembers.length > 0 && (
                    <div className={cn(teamMembers.length > 0 ? "mt-40" : "mt-0")}>
                        <div className="flex flex-col items-center text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-[#1e4e8c] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg mb-6"
                            >
                                <Star className="h-4 w-4 fill-white" />
                                Meet the Team Behind Merit
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                viewport={{ once: true }}
                                className="text-3xl font-extrabold text-[#b22222]"
                            >
                                Driven by Expertise. Focused on Results.
                            </motion.h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {otherTeamMembers.map((member, i) => (
                                <motion.div
                                    key={member.name + i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                                        <Image
                                            src={getMemberImage(member.image)}
                                            alt={member.name}
                                            fill
                                            unoptimized
                                            className="h-full w-full object-cover"
                                            onError={(e: any) => { e.target.src = FALLBACK_AVATAR }}
                                        />
                                    </div>
                                    <div className="bg-[#b22222] p-4 text-center">
                                        <p className="font-black text-white text-base">{member.name}</p>
                                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">{member.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="mt-20 text-center"
                        >
                            <p className="text-slate-500 text-lg italic max-w-4xl mx-auto px-6">
                                Merit Advisory Services LLP, our team brings strong expertise in finance, audit, advisory, and ERP solutions, delivering practical and reliable services that support compliance, efficiency, and sustainable growth.
                            </p>
                        </motion.div>
                    </div>
                )}

                {/* Empty state only when both arrays are empty after loading */}
                {!loading && teamMembers.length === 0 && otherTeamMembers.length === 0 && (
                    <div className="text-center py-24 text-slate-400">
                        <p className="text-lg">No team members published yet.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
