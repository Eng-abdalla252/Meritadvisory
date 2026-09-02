import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { Awards } from "@/components/awards"
import { Benefits } from "@/components/benefits"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Building2, TrendingUp, Users, Target } from "lucide-react"

export const metadata = {
    title: "About Us | Merit Advisory Services",
    description: "Learn more about Merit Advisory Services, our mission, vision, and the core values that drive our success.",
}

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <InternalPageHero
                    badge="About Merit Advisory"
                    title="Driving Progress Through Expertise & Innovation"
                    description="Leading the way in digital transformation and enterprise excellence across Africa. We combine deep industry knowledge with cutting-edge technology to help organizations achieve their full potential."
                    primaryCTA={{
                        label: "Learn More About Us",
                        href: "#about"
                    }}
                    visual={
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Building2 className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expertise</p>
                                    <p className="text-2xl font-bold text-foreground">15+ Years</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <TrendingUp className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</p>
                                    <p className="text-2xl font-bold text-foreground">200+</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Users className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team</p>
                                    <p className="text-2xl font-bold text-foreground">50+</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Target className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impact</p>
                                    <p className="text-2xl font-bold text-foreground">Global</p>
                                </div>
                            </div>
                        </div>
                    }
                    variant="split-image"
                />
                <div className="">
                    <About />
                    <Process />
                    <Awards />
                    <Benefits />
                </div>
            </main>
            <Footer />
        </div>
    )
}
