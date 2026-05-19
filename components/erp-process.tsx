"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"
import { 
  RefreshCw, Settings, Wifi, ClipboardList, 
  Users, Wrench, CircleDollarSign, UserCheck, 
  Database, Lightbulb, Network, BarChart3,
  Search, Code2, Settings2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: Search,
    title: "Business Process Analysis",
    description: "Our ERP Systems Analyst will analyze your business workflow identifying the indicators and transactions important for your business.",
  },
  {
    icon: Code2,
    title: "Customization & Development",
    description: "Common Odoo ERP workflow / Interface will be customized developing it matching to your business needs.",
  },
  {
    icon: Settings2,
    title: "Deployment & Training",
    description: "The implementation team sets the ERP system for your operation business usage after Training.",
  },
  {
    icon: Wrench,
    title: "Technical / Functional Support",
    description: "Our ERP Implementation team stays stand-by while your company users starts walking on new Business software.",
  }
]

const modules = [
  { name: "Supply Chain Management", icon: RefreshCw },
  { name: "Manufacturing", icon: Settings },
  { name: "Internet of Things", icon: Wifi },
  { name: "Project Management", icon: ClipboardList },
  { name: "Customer Relationship Management", icon: Users },
  { name: "Service Management", icon: Wrench },
  { name: "Sales & Marketing", icon: CircleDollarSign },
  { name: "Human Resource Management", icon: UserCheck },
  { name: "Asset Management", icon: Database },
  { name: "Business Intelligence", icon: Lightbulb },
  { name: "Big Data Analytics", icon: Network },
  { name: "Financial Management", icon: BarChart3 }
]

export function ERPProcess() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1e4e8c]/5 rounded-l-[100px] blur-3xl pointer-events-none" />
      
      <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Left Column - Text */}
        <div className={cn(
          "lg:w-5/12 transition-all duration-1000 z-20",
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
        )}>
          <h2 className="text-4xl font-black tracking-tight text-[#1e4e8c] sm:text-5xl mb-6 leading-tight">
            Our ERP Software <br/>
            <span className="text-[#b22222]">Implementation Process</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Our process is highly collaborative – with us, you are a partner with a key seat at the table. We aim to understand you and your idea so that what we craft together is perfectly customized for your unique concept.
          </p>
        </div>

        {/* Right Column - Hub and Spoke Diagram */}
        <div className={cn(
          "lg:w-7/12 relative flex justify-center items-center min-h-[500px] sm:min-h-[600px] w-full transition-all duration-1000 delay-300",
          isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
        )}>
          
          <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center scale-75 sm:scale-100">
            {/* Central ERP Node */}
            <div className="absolute z-30 w-32 h-32 bg-gradient-to-br from-[#b22222] to-[#8b0000] rounded-2xl shadow-[0_0_40px_rgba(178,34,34,0.4)] flex items-center justify-center border-4 border-white transform hover:scale-110 transition-transform duration-500">
              <span className="text-white text-4xl font-black tracking-wider">ERP</span>
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 600">
              {modules.map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180)
                const radius = 180
                const centerX = 300
                const centerY = 300
                const x = Math.round((centerX + Math.cos(angle) * radius) * 1000) / 1000
                const y = Math.round((centerY + Math.sin(angle) * radius) * 1000) / 1000
                
                return (
                  <g key={`line-${i}`}>
                    <line 
                      x1={centerX} 
                      y1={centerY} 
                      x2={x} 
                      y2={y} 
                      stroke="#b22222" 
                      strokeWidth="2" 
                      strokeDasharray="6 6"
                      className="opacity-40"
                    />
                    {/* Animated dot on the line */}
                    <circle cx={x} cy={y} r="4" fill="#1e4e8c" className="animate-ping" style={{ animationDuration: '3s', animationDelay: `${i * 0.2}s` }} />
                  </g>
                )
              })}
            </svg>

            {/* Satellites */}
            {modules.map((mod, i) => {
              const angle = (i * 30) * (Math.PI / 180)
              const iconRadius = 180
              const labelRadius = 250 // Further out for the label
              const centerX = 300
              const centerY = 300
              
              const iconX = Math.round((centerX + Math.cos(angle) * iconRadius) * 1000) / 1000
              const iconY = Math.round((centerY + Math.sin(angle) * iconRadius) * 1000) / 1000
              
              const labelX = Math.round((centerX + Math.cos(angle) * labelRadius) * 1000) / 1000
              const labelY = Math.round((centerY + Math.sin(angle) * labelRadius) * 1000) / 1000

              return (
                <div key={mod.name}>
                  {/* Icon Node */}
                  <div 
                    className="absolute z-20 group"
                    style={{
                      left: `${((iconX / 600) * 100).toFixed(4)}%`,
                      top: `${((iconY / 600) * 100).toFixed(4)}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#1e4e8c]/10 group-hover:border-[#b22222] group-hover:shadow-[0_0_20px_rgba(178,34,34,0.2)] transition-all duration-300 group-hover:scale-110 cursor-default">
                      <mod.icon className="w-6 h-6 text-[#1e4e8c] group-hover:text-[#b22222] transition-colors" />
                    </div>
                  </div>
                  
                  {/* Label Node */}
                  <div 
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `${((labelX / 600) * 100).toFixed(4)}%`,
                      top: `${((labelY / 600) * 100).toFixed(4)}%`,
                    }}
                  >
                    <span className="text-[11px] leading-tight font-bold text-slate-700 text-center block w-[80px]">
                      {mod.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Restored Steps & Banner */}
      <div className="relative mt-32 mx-auto max-w-7xl px-6 z-10">
        {/* Curved SVG Arrows for Desktop */}
        <div className="hidden lg:block absolute top-12 left-0 w-full pointer-events-none">
          <svg width="100%" height="80" viewBox="0 0 1000 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M125 40 Q 250 0 375 40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M375 40 Q 500 80 625 40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M625 40 Q 750 0 875 40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="grid gap-16 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <div 
              key={step.title}
              className={cn(
                "relative flex flex-col items-center text-center transition-all duration-1000",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              )}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="relative z-10 w-24 h-24 rounded-full bg-[#1e4e8c] flex items-center justify-center text-white shadow-[0_0_40px_rgba(30,78,140,0.2)] mb-10 ring-8 ring-white">
                <step.icon className="w-10 h-10" />
              </div>

              <div className="space-y-4 max-w-xs">
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                  {step.title}
                </h3>
                <div className="w-12 h-1 bg-[#b22222] mx-auto rounded-full" />
                <p className="text-sm leading-relaxed text-slate-500 font-medium px-4">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-32 p-12 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e4e8c]/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h4 className="text-3xl font-black mb-2">Ready to transform your business?</h4>
            <p className="text-slate-400 font-medium">Join 800+ enterprises who trust our implementation process.</p>
          </div>
          <Button 
            className="relative z-10 bg-[#b22222] hover:bg-[#8b0000] text-white px-10 py-8 rounded-2xl font-black transition-all shadow-xl shadow-red-900/20 active:scale-95 text-lg"
            asChild
          >
            <Link href="https://wa.me/16725723750" target="_blank" rel="noopener noreferrer">
              Get Started Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
