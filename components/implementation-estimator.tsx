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
    const [selectedServices, setSelectedServices] = React.useState<string[]>([])
    const [activeTab, setActiveTab] = React.useState(estimatorData.categories[0].id)

    const toggleService = (id: string) => {
        setSelectedServices(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const totals = React.useMemo(() => {
        let price = 0
        let hours = 0
        
        estimatorData.categories.forEach(cat => {
            cat.services.forEach(service => {
                if (selectedServices.includes(service.id)) {
                    price += service.price
                    hours += service.hours
                }
            })
        })
        
        return { price, hours }
    }, [selectedServices])

    const activeCategory = estimatorData.categories.find(c => c.id === activeTab)

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
                        <h3 className="text-xl font-bold text-[#1e4e8c]">Configuration</h3>
                    </div>
                    {estimatorData.categories.map((category) => {
                        const Icon = categoryIcons[category.id] || LayoutGrid
                        const count = category.services.filter(s => selectedServices.includes(s.id)).length
                        
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                                    activeTab === category.id 
                                        ? "bg-white shadow-xl shadow-[#1e4e8c]/5 border border-[#1e4e8c]/10 text-[#1e4e8c]" 
                                        : "hover:bg-slate-50 text-slate-500"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                        activeTab === category.id ? "bg-[#1e4e8c] text-white" : "bg-slate-100 group-hover:bg-slate-200"
                                    )}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">{category.name}</span>
                                </div>
                                {count > 0 && (
                                    <Badge className="bg-[#1e4e8c] text-white rounded-full h-6 w-6 flex items-center justify-center p-0">
                                        {count}
                                    </Badge>
                                )}
                            </button>
                        )
                    })}

                    <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-br from-[#1e4e8c] to-[#2b6cb0] text-white overflow-hidden relative group">
                        <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                            <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="relative z-10">
                            <Sparkles className="h-6 w-6 text-blue-200 mb-4" />
                            <p className="text-xs font-bold leading-relaxed mb-4 opacity-90">
                                Need a custom module or complex integration?
                            </p>
                            <a href="/questionnaire" className="text-sm font-black flex items-center gap-2 group">
                                Talk to Expert <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{activeCategory?.name}</h2>
                                    <p className="text-slate-500 text-sm mt-1">Select the features you want to include in your project.</p>
                                </div>
                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 border-slate-200 bg-white shadow-sm">
                                    {activeCategory?.services.length} Options Available
                                </Badge>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {activeCategory?.services.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => toggleService(service.id)}
                                        className={cn(
                                            "group relative p-6 rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden",
                                            selectedServices.includes(service.id)
                                                ? "bg-white border-[#1e4e8c] shadow-2xl shadow-[#1e4e8c]/10"
                                                : "bg-white border-slate-50 hover:border-slate-200 hover:shadow-xl shadow-slate-200/20"
                                        )}
                                    >
                                        {/* Glow Background */}
                                        {selectedServices.includes(service.id) && (
                                            <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#1e4e8c]/5 rounded-full blur-3xl" />
                                        )}
                                        
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <div className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                                selectedServices.includes(service.id) 
                                                    ? "bg-[#1e4e8c] text-white rotate-[10deg]" 
                                                    : "bg-slate-50 text-slate-400 group-hover:scale-110"
                                            )}>
                                                {selectedServices.includes(service.id) ? (
                                                    <CheckCircle2 className="h-6 w-6" />
                                                ) : (
                                                    <Zap className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className={cn(
                                                    "text-xl font-black transition-colors duration-500",
                                                    selectedServices.includes(service.id) ? "text-[#1e4e8c]" : "text-slate-900"
                                                )}>${service.price.toLocaleString()}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {service.hours}h
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h4 className="font-bold text-lg text-slate-900 mb-2">{service.name}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                                                {service.description}
                                            </p>
                                        </div>
                                        
                                        {/* Bottom Progress Bar Indicator */}
                                        {selectedServices.includes(service.id) && (
                                            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-[#1e4e8c] origin-left animate-in slide-in-from-left duration-500" />
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
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                        <Card className="overflow-hidden border-0 shadow-[0_32px_64px_-16px_rgba(30,78,140,0.2)] rounded-[2.5rem] bg-white relative z-10">
                            <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1e4e8c] to-slate-900 opacity-90" />
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Activity className="h-20 w-20 text-white" />
                                </div>
                                
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 w-10 bg-blue-400 rounded-full" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Blueprint Summary</span>
                                    </div>
                                    
                                    <div>
                                        <div className="text-blue-100/60 text-[10px] font-black uppercase tracking-widest mb-1">Total Investment</div>
                                        <div className="flex items-start">
                                            <span className="text-2xl font-bold mt-2 mr-1 text-blue-300">$</span>
                                            <span className="text-6xl font-black tracking-tighter tabular-nums">{totals.price.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                                        <div>
                                            <div className="text-blue-200/50 text-[10px] font-black uppercase tracking-widest mb-1">Timeline</div>
                                            <div className="text-xl font-bold flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-blue-400" />
                                                {totals.hours}<span className="text-xs opacity-50 ml-1">hrs</span>
                                            </div>
                                        </div>
                                        <div className="border-l border-white/10 pl-4">
                                            <div className="text-blue-200/50 text-[10px] font-black uppercase tracking-widest mb-1">Selection</div>
                                            <div className="text-xl font-bold flex items-center gap-2">
                                                <LayoutGrid className="h-4 w-4 text-blue-400" />
                                                {selectedServices.length}<span className="text-xs opacity-50 ml-1">items</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 space-y-8 bg-white">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="h-10 w-10 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                                            <ShieldCheck className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 leading-tight">Elite Support Included</div>
                                            <div className="text-[10px] text-slate-500 mt-0.5">Post-launch functional support & training</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-2">
                                        <Info className="h-4 w-4 text-[#1e4e8c] opacity-50" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing accurate for current qtr</span>
                                    </div>
                                </div>

                                <Button className="w-full h-16 rounded-3xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 text-lg font-black group relative overflow-hidden" asChild>
                                    <a href="/questionnaire">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#1e4e8c] to-[#2b6cb0] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Secure This Estimate
                                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                                        </span>
                                    </a>
                                </Button>
                                
                                {selectedServices.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="h-px bg-slate-100" />
                                        <div className="flex flex-wrap gap-2">
                                            {selectedServices.slice(0, 3).map(id => {
                                                const service = estimatorData.categories
                                                    .flatMap(c => c.services)
                                                    .find(s => s.id === id)
                                                return (
                                                    <Badge key={id} variant="secondary" className="bg-slate-100 text-slate-600 border-0">
                                                        {service?.name}
                                                    </Badge>
                                                )
                                            })}
                                            {selectedServices.length > 3 && (
                                                <Badge className="bg-[#1e4e8c] text-white">+{selectedServices.length - 3} more</Badge>
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
