import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Industries } from "@/components/industries"
import { CaseStudies } from "@/components/case-studies"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Factory, Landmark, Stethoscope, ShoppingBag } from "lucide-react"

export const metadata = {
    title: "Industries We Serve | Merit Advisory Services",
    description: "Discover how we deliver specialized expertise across manufacturing, finance, healthcare, and more.",
}

export default function IndustriesPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <InternalPageHero
                    badge="Industries We Serve"
                    title="Industry-Focused Solutions That Make an Impact"
                    description="Deep industry knowledge combined with technical excellence to deliver results that matter in your specific sector."
                    primaryCTA={{
                        label: "Explore Industries",
                        href: "#industries"
                    }}
                    visual={
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                                    <Factory className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manufacturing</p>
                                    <p className="text-sm text-foreground mt-1">Production & Supply Chain</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                                    <Landmark className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Financial Services</p>
                                    <p className="text-sm text-foreground mt-1">Compliance & Risk</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                                    <Stethoscope className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Healthcare</p>
                                    <p className="text-sm text-foreground mt-1">Patient & Operations</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                                    <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Retail & E-Commerce</p>
                                    <p className="text-sm text-foreground mt-1">Omnichannel & POS</p>
                                </div>
                            </div>
                        </div>
                    }
                    variant="split-image"
                />
                <div className="">
                    <Industries />
                    <div className="bg-muted/30">
                        <CaseStudies />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
