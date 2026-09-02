import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ImplementationEstimator from "@/components/implementation-estimator"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Calculator, Calendar, DollarSign, Target } from "lucide-react"

export const metadata: Metadata = {
    title: "Implementation Blueprint & Budget Planner | Merit Advisory",
    description: "Estimate the cost and timeline for your ERP implementation with our interactive blueprint planner.",
}

export default function EstimatorPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            <InternalPageHero
                badge="Blueprint & Budget Planner"
                title="Plan Your Project With Confidence"
                description="Plan your digital transformation with precision. Select the modules and services your business needs to get an instant cost and timeline estimation."
                primaryCTA={{
                    label: "Create Your Blueprint",
                    href: "#estimator"
                }}
                visual={
                    <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded-xl p-4">
                                <Calculator className="h-8 w-8 text-primary mb-2" />
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estimation</p>
                                <p className="text-2xl font-bold text-foreground">Instant</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4">
                                <Calendar className="h-8 w-8 text-primary mb-2" />
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeline</p>
                                <p className="text-2xl font-bold text-foreground">Clear</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4">
                                <DollarSign className="h-8 w-8 text-primary mb-2" />
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Budget</p>
                                <p className="text-2xl font-bold text-foreground">Accurate</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4">
                                <Target className="h-8 w-8 text-primary mb-2" />
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Planning</p>
                                <p className="text-2xl font-bold text-foreground">Strategic</p>
                            </div>
                        </div>
                    </div>
                }
                variant="split-image"
            />

            <div className="relative z-20 mx-auto max-w-7xl px-6 pb-24">
                <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                <ImplementationEstimator />
            </div>

            <Footer />
        </main>
    )
}
