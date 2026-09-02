import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CaseStudies } from "@/components/case-studies"
import { Projects } from "@/components/projects"
import { InternalPageHero } from "@/components/internal-page-hero"
import { BarChart3, TrendingUp, Target, Award } from "lucide-react"

export const metadata = {
    title: "Insights | Merit Advisory Somalia",
    description: "Read about our successful projects and the real-world impact we've delivered for our clients across East Africa.",
}

export default function CaseStudiesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                <InternalPageHero
                    badge="Case Studies"
                    title="Real Solutions. Measurable Results."
                    description="Discover how Merit Advisory is driving the digital revolution in Somalia, helping organizations overcome complex challenges and achieve sustainable growth."
                    primaryCTA={{
                        label: "Explore Case Studies",
                        href: "#cases"
                    }}
                    visual={
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <BarChart3 className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</p>
                                    <p className="text-2xl font-bold text-foreground">200+</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <TrendingUp className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ROI</p>
                                    <p className="text-2xl font-bold text-foreground">3x Avg</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Target className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Success Rate</p>
                                    <p className="text-2xl font-bold text-foreground">98%</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Award className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impact</p>
                                    <p className="text-2xl font-bold text-foreground">Global</p>
                                </div>
                            </div>
                        </div>
                    }
                    variant="split-image"
                />
                <div className="bg-background">
                    <CaseStudies showHeader={false} />
                    <div className="border-t border-border">
                        <Projects />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
