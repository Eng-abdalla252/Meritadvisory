"use client"

import * as React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Mail, Star, Facebook, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TeamMember {
    id?: string
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
    status?: "active" | "inactive"
}

// Vector-based inline SVG avatar loader that is 100% reliable offline
const FALLBACK_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f1f5f9'/><circle cx='50' cy='35' r='18' fill='%23cbd5e1'/><path d='M15 85c0-18 15-30 35-30s35 12 35 30z' fill='%23cbd5e1'/></svg>"

function getMemberImage(image?: string): string {
    if (!image) return FALLBACK_AVATAR
    // Accept base64, absolute URLs, and relative paths
    if (image.startsWith("data:") || image.startsWith("http") || image.startsWith("/")) {
        return image
    }
    return `/${image}`
}

export function Team({ showHeader = true }: { showHeader?: boolean }) {
    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([])
    const [otherTeamMembers, setOtherTeamMembers] = React.useState<TeamMember[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const ts = Date.now()
        Promise.all([
            // Try API first (returns fresh data), fall back to static JSON files
            fetch(`/api/admin/data-api?type=team&_=${ts}`, { cache: "no-store" })
                .then(r => r.json())
                .catch(() => fetch(`/data/team.json?_=${ts}`).then(r => r.json()).catch(() => [])),
            fetch(`/api/admin/data-api?type=other-team&_=${ts}`, { cache: "no-store" })
                .then(r => r.json())
                .catch(() => fetch(`/data/other-team.json?_=${ts}`).then(r => r.json()).catch(() => [])),
        ]).then(([team, other]) => {
            const parsedTeam = Array.isArray(team) ? team : []
            const parsedOther = Array.isArray(other) ? other : []
            
            // Filter out inactive (draft) members
            setTeamMembers(parsedTeam.filter((m: any) => m.status !== "inactive"))
            setOtherTeamMembers(parsedOther.filter((m: any) => m.status !== "inactive"))
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.name + i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative flex flex-col sm:flex-row gap-6 p-6 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:border-[#b22222]/30 hover:-translate-y-1 transition-all duration-500"
                            >
                                {/* Portrait Image Wrapper with overlay */}
                                <div className="relative shrink-0 w-full sm:w-44 h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner">
                                    <Image
                                        src={getMemberImage(member.image)}
                                        alt={member.name}
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e: any) => { e.target.src = FALLBACK_AVATAR }}
                                    />
                                    {member.yearsExp && (
                                        <div className="absolute bottom-2 left-2 bg-[#b22222] text-white px-2 py-0.5 rounded-lg text-[9px] font-black tracking-widest uppercase shadow">
                                            {member.yearsExp} Exp
                                        </div>
                                    )}
                                </div>

                                {/* Content Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="mb-2">
                                            <span className="text-[9px] font-black text-[#b22222] tracking-wider uppercase block mb-1">
                                                {member.role}
                                            </span>
                                            <h3 className="text-xl font-black text-slate-900 group-hover:text-[#b22222] transition-colors leading-tight">
                                                {member.name}
                                            </h3>
                                        </div>

                                        {member.qualification && (
                                            <div className="flex gap-2 mb-3">
                                                <Badge className="bg-slate-100 hover:bg-slate-100 text-slate-700 border-none text-[9px] font-bold py-0.5 px-2">
                                                    {member.qualification} {member.qualLabel ? `(${member.qualLabel})` : ''}
                                                </Badge>
                                            </div>
                                        )}

                                        {member.bio && (
                                            <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                                                {member.bio}
                                            </p>
                                        )}
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
                                        <div className="flex gap-2">
                                            {member.linkedin && (
                                                <a 
                                                    href={member.linkedin} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-50 text-[#1e4e8c] hover:bg-[#1e4e8c] hover:text-white transition-colors duration-300 border border-slate-100"
                                                >
                                                    <Linkedin className="h-4 w-4" />
                                                </a>
                                            )}
                                            {member.facebook && (
                                                <a 
                                                    href={member.facebook} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-50 text-[#1e4e8c] hover:bg-[#1e4e8c] hover:text-white transition-colors duration-300 border border-slate-100"
                                                >
                                                    <Facebook className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>

                                        {member.email && (
                                            <a 
                                                href={`mailto:${member.email}`}
                                                className="flex items-center gap-1.5 bg-[#b22222] hover:bg-[#8b0000] text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-colors shadow-md shadow-red-900/10"
                                            >
                                                <Mail className="h-3 w-3" />
                                                Contact
                                            </a>
                                        )}
                                    </div>
                                </div>
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

                        {/* Responsive grid for Associate Team */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {otherTeamMembers.map((member, i) => (
                                <motion.div
                                    key={member.name + i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    {/* FIXED: added 'relative' to aspect wrapper, restricting image overflow */}
                                    <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                                        <Image
                                            src={getMemberImage(member.image)}
                                            alt={member.name}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e: any) => { e.target.src = FALLBACK_AVATAR }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 justify-center">
                                            <span className="text-[10px] text-white font-bold tracking-widest uppercase bg-[#b22222]/80 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-lg">
                                                Merit Consultant
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 text-center bg-slate-50 group-hover:bg-[#b22222] transition-colors duration-300 flex-1 flex flex-col justify-center">
                                        <p className="font-extrabold text-slate-800 text-sm group-hover:text-white transition-colors duration-300 line-clamp-1">{member.name}</p>
                                        <p className="text-[9px] font-bold text-slate-400 group-hover:text-white/80 uppercase tracking-widest mt-1 transition-colors duration-300 line-clamp-1">{member.role}</p>
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
                {teamMembers.length === 0 && otherTeamMembers.length === 0 && (
                    <div className="text-center py-24 text-slate-400">
                        <p className="text-lg">No team members published yet.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
