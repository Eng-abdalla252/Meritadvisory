import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Solutions } from "@/components/solutions"
import { Process } from "@/components/process"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Server, Bot, BarChart3, Link2 } from "lucide-react"

export const metadata = {
    title: "Our Solutions | Merit Advisory Services",
    description: "Explore our comprehensive suite of technological solutions designed to modernize your enterprise.",
}

export default function SolutionsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <InternalPageHero
                    badge="Our Solutions"
                    title="Smart Solutions Built for a Digital World"
                    description="Cutting-edge technology strategies tailored to solve your most complex business challenges with enterprise-grade ERP, automation, and analytics."
                    primaryCTA={{
                        label: "Explore Solutions",
                        href: "#solutions"
                    }}
                    visual={
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Server className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ERP Platforms</p>
                                    <p className="text-sm text-foreground mt-1">SAP, Oracle, Odoo</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Bot className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Automation</p>
                                    <p className="text-sm text-foreground mt-1">RPA & AI Workflows</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <BarChart3 className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Analytics</p>
                                    <p className="text-sm text-foreground mt-1">BI & Data Insights</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Link2 className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Integrations</p>
                                    <p className="text-sm text-foreground mt-1">Seamless Connectivity</p>
                                </div>
                            </div>
                        </div>
                    }
                    variant="split-image"
                />
                <div className="">
                    <Solutions />
                    <Process />
                </div>
            </main>
            <Footer />
        </div>
    )
}
