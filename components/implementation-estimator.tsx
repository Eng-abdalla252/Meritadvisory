"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { 
    Calculator, 
    Clock, 
    DollarSign, 
    ArrowRight, 
    CheckCircle2, 
    Info,
    ChevronRight,
    Sparkles,
    ShieldCheck,
    Wand2,
    LayoutGrid,
    Settings2,
    Zap,
    Briefcase,
    Activity
} from "lucide-react"
import estimatorData from "@/data/estimator-services.json"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const categoryIcons: Record<string, any> = {
    core: LayoutGrid,
    advanced: Settings2,
    integrations: Zap,
    implementation: Briefcase
}

export default function ImplementationEstimator() {
    const { ref, isVisible } = useScrollAnimation()
    const [data, setData] = React.useState(estimatorData)
    const [selectedServices, setSelectedServices] = React.useState<string[]>([])
    const [activeTab, setActiveTab] = React.useState(estimatorData.categories[0].id)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch("/api/admin/estimator")
            .then(res => res.json())
            .then(fetchedData => {
                if (fetchedData && fetchedData.categories && fetchedData.categories.length > 0) {
                    setData(fetchedData)
                    setActiveTab(fetchedData.categories[0].id)
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const toggleService = (id: string) => {
        setSelectedServices(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const totals = React.useMemo(() => {
        let price = 0
        let hours = 0
        
        data.categories.forEach(cat => {
            cat.services.forEach(service => {
                if (selectedServices.includes(service.id)) {
                    price += service.price
                    hours += service.hours
                }
            })
        })
        
        return { price, hours }
    }, [selectedServices, data])

    const activeCategory = data.categories.find(c => c.id === activeTab) || data.categories[0]

    return (
        <div ref={ref} className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Side Navigation for Categories */}
                <div className="lg:w-72 shrink-0 space-y-2">
                    <div className="px-4 mb-6">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Project Scope</div>
                        <h3 className="text-xl font-bold text-[#0f4c9c]">Configuration</h3>
                    </div>
                    {data.categories.map((category) => {
                        const Icon = categoryIcons[category.id] || LayoutGrid
                        const count = category.services.filter(s => selectedServices.includes(s.id)).length
                        
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group",
                                    activeTab === category.id 
                                        ? "bg-white shadow-xl shadow-[#0f4c9c]/5 border border-[#0f4c9c]/10 text-[#0f4c9c]" 
                                        : "hover:bg-slate-50 text-slate-500"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-9 w-9 rounded-xl flex items-center justify-center transition-colors",
                                        activeTab === category.id ? "bg-[#0f4c9c] text-white" : "bg-slate-100 group-hover:bg-slate-200"
                                    )}>
                                        <Icon className="h-4.5 w-4.5" />
                                    </div>
                                    <span className="font-bold text-xs tracking-tight">{category.name}</span>
                                </div>
                                {count > 0 && (
                                    <Badge className="bg-[#b22222] text-white rounded-full h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                                        {count}
                                    </Badge>
                                )}
                            </button>
                        )
                    })}

                    <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-br from-[#0f4c9c] to-[#b22222] text-white overflow-hidden relative group">
                        <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                            <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="relative z-10">
                            <Sparkles className="h-5 w-5 text-blue-200 mb-3" />
                            <p className="text-[11px] font-black leading-relaxed mb-4 opacity-90">
                                Need a custom module or complex integration?
                            </p>
                            <a href="/questionnaire" className="text-xs font-black flex items-center gap-2 group">
                                Talk to Expert <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Configurator Area */}
                <div className="flex-1 space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex justify-between items-end px-2">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeCategory?.name}</h2>
                                    <p className="text-slate-500 text-xs mt-1">Select the features you want to include in your project.</p>
                                </div>
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border-slate-200 bg-white shadow-sm">
                                    {activeCategory?.services.length} Options Available
                                </Badge>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {activeCategory?.services.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => toggleService(service.id)}
                                        className={cn(
                                            "group relative p-5 rounded-2xl border-2 transition-all duration-500 cursor-pointer overflow-hidden",
                                            selectedServices.includes(service.id)
                                                ? "bg-white border-[#0f4c9c] shadow-2xl shadow-[#0f4c9c]/10"
                                                : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-xl shadow-slate-200/20"
                                        )}
                                    >
                                        {/* Glow Background */}
                                        {selectedServices.includes(service.id) && (
                                            <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#0f4c9c]/5 rounded-full blur-3xl" />
                                        )}
                                        
                                        <div className="flex justify-between items-center mb-3 relative z-10">
                                            <div className={cn(
                                                "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500",
                                                selectedServices.includes(service.id) 
                                                    ? "bg-[#0f4c9c] text-white rotate-[10deg]" 
                                                    : "bg-slate-50 text-slate-400 group-hover:scale-110"
                                            )}>
                                                {selectedServices.includes(service.id) ? (
                                                    <CheckCircle2 className="h-5 w-5" />
                                                ) : (
                                                    <Zap className="h-4.5 w-4.5" />
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <span className={cn(
                                                    "text-[13px] font-black px-2.5 py-1 rounded-full transition-all duration-500 inline-block border",
                                                    selectedServices.includes(service.id) 
                                                        ? "text-white bg-[#0f4c9c] border-[#0f4c9c] shadow-md shadow-blue-500/10" 
                                                        : "text-[#b22222] bg-[#b22222]/5 border-[#b22222]/10"
                                                )}>
                                                    ${service.price.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative z-10 space-y-1">
                                            <h4 className="font-bold text-sm text-slate-900 leading-tight">{service.name}</h4>
                                            <p className="text-[11px] text-slate-400 font-medium leading-normal line-clamp-2 group-hover:line-clamp-none transition-all">
                                                {service.description}
                                            </p>
                                        </div>
                                        
                                        {/* Meta Hour Information on hover/select */}
                                        <div className="mt-3 flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest relative z-10">
                                            <Clock className="h-3 w-3 text-slate-300" />
                                            Estimated duration: {service.hours} hours
                                        </div>
                                        
                                        {/* Bottom Progress Bar Indicator */}
                                        {selectedServices.includes(service.id) && (
                                            <div className="absolute bottom-0 left-0 h-1 w-full bg-[#0f4c9c] origin-left animate-in slide-in-from-left duration-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Premium Floating Summary */}
                <div className="lg:w-96 shrink-0 lg:sticky lg:top-24">
                    <div className="relative">
                        {/* Decorative Glows */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0f4c9c]/5 rounded-full blur-3xl pointer-events-none" />

                        <Card className="overflow-hidden border-0 shadow-[0_32px_64px_-16px_rgba(15,76,156,0.15)] rounded-[2.5rem] bg-white relative z-10">
                            <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c9c] to-slate-950 opacity-95" />
                                <div className="absolute top-0 right-0 p-4 opacity-15">
                                    <Activity className="h-16 w-16 text-white" />
                                </div>
                                
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 w-8 bg-[#b22222] rounded-full" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-200">Blueprint Summary</span>
                                    </div>
                                    
                                    <div>
                                        <div className="text-blue-100/50 text-[9px] font-black uppercase tracking-widest mb-1">Total Investment</div>
                                        <div className="flex items-start">
                                            <span className="text-xl font-bold mt-1.5 mr-0.5 text-blue-300">$</span>
                                            <span className="text-5xl font-black tracking-tighter tabular-nums">{totals.price.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                                        <div>
                                            <div className="text-blue-200/50 text-[9px] font-black uppercase tracking-widest mb-0.5">Timeline</div>
                                            <div className="text-lg font-bold flex items-center gap-1.5">
                                                <Clock className="h-4.5 w-4.5 text-blue-400" />
                                                {totals.hours}<span className="text-xs opacity-50 ml-0.5">hrs</span>
                                            </div>
                                        </div>
                                        <div className="border-l border-white/10 pl-4">
                                            <div className="text-blue-200/50 text-[9px] font-black uppercase tracking-widest mb-0.5">Selection</div>
                                            <div className="text-lg font-bold flex items-center gap-1.5">
                                                <LayoutGrid className="h-4.5 w-4.5 text-blue-400" />
                                                {selectedServices.length}<span className="text-xs opacity-50 ml-0.5">items</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-6 bg-white">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="h-9 w-9 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                                            <ShieldCheck className="h-4.5 w-4.5 text-green-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black text-slate-900 leading-tight">Elite Support Included</div>
                                            <div className="text-[10px] text-slate-500 mt-0.5">Post-launch functional support & training</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-1">
                                        <Info className="h-3.5 w-3.5 text-[#0f4c9c] opacity-50" />
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pricing accurate for current qtr</span>
                                    </div>
                                </div>

                                <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 text-md font-black group relative overflow-hidden" asChild>
                                    <a href="/questionnaire">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f4c9c] to-[#b22222] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative z-10 flex items-center justify-center gap-1.5">
                                            Secure This Estimate
                                            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1.5" />
                                        </span>
                                    </a>
                                </Button>
                                
                                {selectedServices.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="h-px bg-slate-100" />
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedServices.slice(0, 3).map(id => {
                                                const service = data.categories
                                                    .flatMap(c => c.services)
                                                    .find(s => s.id === id)
                                                return (
                                                    <Badge key={id} variant="secondary" className="bg-slate-100 text-slate-600 border-0 text-[10px] font-bold px-2 py-0.5">
                                                        {service?.name}
                                                    </Badge>
                                                )
                                            })}
                                            {selectedServices.length > 3 && (
                                                <Badge className="bg-[#0f4c9c] text-white text-[10px] font-bold px-2 py-0.5">+{selectedServices.length - 3} more</Badge>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
