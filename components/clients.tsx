"use client"

import { useState, useMemo } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"
import { useClients } from "@/hooks/use-clients"
import { Loader2, Quote } from "lucide-react"
import { useMedia } from "@/hooks/use-media"
import { cn } from "@/lib/utils"

const categories = [
  "All",
  "Petroleum and Logistics",
  "Construction",
  "Manufacturing",
  "Utility",
  "Healthcare",
  "Hotel and Cafes",
  "Public Sectors",
  "Retailers & Wholesalers",
  "General Services",
  "Investment"
]

export function Clients({ showHeader = true }: { showHeader?: boolean }) {
    const { clients: clientsData, loading } = useClients()
    const { ref, isVisible } = useScrollAnimation()
    const [activeCategory, setActiveCategory] = useState("All")
    const { media: dynamicLogos } = useMedia('clients')

    const allClients = useMemo(() => {
        const dynamic = (dynamicLogos || []).map(m => ({
            name: m.name.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' '),
            industry: "General Services",
            logo: m.url,
            country: "Somalia"
        }))
        
        const seenLogos = new Set(clientsData.map(c => c.logo.toLowerCase().trim()))
        const seenNames = new Set(clientsData.map(c => c.name.toLowerCase().trim()))

        const uniqueDynamic = dynamic.filter(d => {
            const logoNorm = d.logo.toLowerCase().trim()
            const nameNorm = d.name.toLowerCase().trim()
            
            if (seenLogos.has(logoNorm) || seenNames.has(nameNorm)) {
                return false
            }
            
            seenLogos.add(logoNorm)
            seenNames.add(nameNorm)
            return true
        })
        
        return [...clientsData, ...uniqueDynamic]
    }, [clientsData, dynamicLogos])

    const filteredClients = useMemo(() => {
        if (activeCategory === "All") return allClients
        return allClients.filter(c => c.industry === activeCategory)
    }, [activeCategory, allClients])

    return (
        <section id="clients" className="bg-white relative overflow-hidden">
            {showHeader && (
                <div className="relative bg-gradient-to-r from-[#1e4e8c] via-[#1e4e8c] to-[#2b6cb0] pt-40 pb-32 overflow-hidden mb-20 shadow-inner">
                    {/* Hero Background Logo Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none select-none overflow-hidden">
                        <img 
                            src="/logo.png" 
                            alt="Merit Background" 
                            className="w-full max-w-5xl object-contain translate-x-1/4 scale-125"
                        />
                    </div>
                    
                    <div className="mx-auto max-w-7xl px-6 relative z-10">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
                                All Clients
                            </h1>
                        </div>
                    </div>

                    {/* Modern Wavy Divider */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-1.11,1200,0V120H0Z" fill="#ffffff"></path>
                        </svg>
                    </div>
                </div>
            )}

            {/* Subtle Grid Watermark (only if no hero) */}
            {!showHeader && (
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                    <img 
                        src="/logo.png" 
                        alt="Merit Background" 
                        className="w-full max-w-4xl object-contain"
                    />
                </div>
            )}

            <div ref={ref} className={cn("mx-auto max-w-7xl px-6 relative z-10", !showHeader && "py-24")}>
                {/* Industry Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-20">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border",
                                activeCategory === category
                                    ? "bg-[#1e4e8c] text-white border-[#1e4e8c] shadow-lg shadow-blue-900/20"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-[#1e4e8c] hover:text-[#1e4e8c]"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Loader2 className="h-10 w-10 animate-spin text-[#1e4e8c] mb-4" />
                        <p className="font-medium">Loading partner portfolio...</p>
                    </div>
                ) : (
                    <>

                {/* Industry Header (Example: General Trade) */}
                <div className="relative mb-12 overflow-hidden rounded-xl bg-[#1e4e8c] py-4 px-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent skew-x-12 transform translate-x-1/2" />
                    <h3 className="relative z-10 text-xl font-black text-white uppercase tracking-widest">
                        Strategic Partnerships
                    </h3>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {filteredClients.map((client, i) => (
                        <div
                            key={`${client.name}-${i}`}
                            className={cn(
                                "group relative flex flex-col items-center justify-center rounded-3xl bg-white border border-slate-100 p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
                                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                            )}
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            <div className="h-24 w-full flex items-center justify-center relative z-10">
                                {client.logo ? (
                                    <img
                                        src={client.logo}
                                        alt={`${client.name} Logo`}
                                        className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <div className="text-xl font-black text-slate-300">{client.name[0]}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">{client.name}</div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Location Badge */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                                    {client.country}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredClients.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-400 text-lg italic">
                            Exploring new opportunities in the {activeCategory} sector. New partnerships coming soon.
                        </p>
                    </div>
                )}
                    </>
                )}

                {/* CEO Endorsement Section */}
                <div className="mt-32 pt-24 border-t border-slate-100">
                    <div className="bg-[#1e4e8c] rounded-[3rem] overflow-hidden shadow-2xl relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <img src="/logo.png" alt="" className="w-full h-full object-contain scale-150 translate-x-1/4" />
                        </div>

                        <div className="flex flex-col lg:flex-row items-center relative z-10">
                            <div className="w-full lg:w-1/2 p-12 lg:p-20">
                                <Quote className="h-12 w-12 text-white/20 mb-8" />
                                <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-8">
                                    "Our solutions are designed to <span className="text-blue-200 italic">empower</span> your vision and drive sustainable growth."
                                </h2>
                                <div className="space-y-4">
                                    <div className="h-1 w-20 bg-blue-400 rounded-full" />
                                    <div>
                                        <p className="text-2xl font-bold text-white uppercase tracking-wider">Burhan Ismael Hassan</p>
                                        <p className="text-blue-200 font-bold uppercase tracking-[0.2em] text-sm mt-1">Managing Partner & CEO</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto lg:h-[600px] relative">
                                <img 
                                    src="/team/burhan-ismail.jpeg" 
                                    alt="CEO Burhan Ismael Hassan" 
                                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e4e8c] via-transparent to-transparent lg:bg-gradient-to-l" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
