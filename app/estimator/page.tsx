import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ImplementationEstimator from "@/components/implementation-estimator"
import { Calculator } from "lucide-react"

export const metadata: Metadata = {
    title: "Implementation Blueprint & Budget Planner | Merit Advisory",
    description: "Estimate the cost and timeline for your ERP implementation with our interactive blueprint planner.",
}

export default function EstimatorPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-[#1e4e8c] via-[#1e4e8c] to-[#2b6cb0] pt-48 pb-32 overflow-hidden shadow-inner">
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b82f6,transparent),radial-gradient(circle_at_0%_100%,#1e4e8c,transparent),radial-gradient(circle_at_100%_100%,#1d4ed8,transparent)] opacity-40 mix-blend-overlay" />
                
                {/* Hero Background Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none select-none overflow-hidden">
                    <img 
                        src="/logo.png" 
                        alt="Merit Background" 
                        className="w-full max-w-5xl object-contain translate-x-1/4 scale-125"
                    />
                </div>
                
                <div className="mx-auto max-w-7xl px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Calculator className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-blue-100 font-bold uppercase tracking-[0.3em] text-sm">Strategic Planning</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
                            Blueprint & <span className="text-blue-200 italic">Budget Planner</span>
                        </h1>
                        <p className="text-xl text-blue-50 leading-relaxed max-w-2xl font-medium">
                            Plan your digital transformation with precision. Select the modules and services 
                            your business needs to get an instant cost and timeline estimation.
                        </p>
                    </div>
                </div>

                {/* Modern Wavy Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-1.11,1200,0V120H0Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </div>

            <div className="relative z-20 mx-auto max-w-7xl px-6 pb-24 -mt-16">
                <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                <ImplementationEstimator />
            </div>

            <Footer />
        </main>
    )
}
