import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Team } from "@/components/team"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Users, Award, Target, Globe } from "lucide-react"

export const metadata = {
    title: "Our Team | Merit Advisory Somalia",
    description: "Meet the experts behind Somalia's leading digital transformations and ERP implementations.",
}

export default function TeamPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                <InternalPageHero
                    badge="Our Team"
                    title="Meet the People Behind Merit"
                    description="A diverse group of strategists, technologists, and consultants dedicated to empowering Somali businesses with world-class expertise."
                    primaryCTA={{
                        label: "Meet Our Team",
                        href: "#team"
                    }}
                    visual={
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Users className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team Members</p>
                                    <p className="text-2xl font-bold text-foreground">50+</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Award className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expertise</p>
                                    <p className="text-2xl font-bold text-foreground">World-Class</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Target className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Focus</p>
                                    <p className="text-2xl font-bold text-foreground">Results</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Globe className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reach</p>
                                    <p className="text-2xl font-bold text-foreground">Global</p>
                                </div>
                            </div>
                        </div>
                    }
                    variant="split-image"
                />

                <div className="bg-background">
                    <Team showHeader={false} />

                    {/* Stats Section */}
                    <section className="bg-slate-900 py-20">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2">50+</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Team Members</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2">100%</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Local Commitment</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2">15+</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2">200+</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Projects Delivered</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mission Section for Professionalism */}
                    <section className="bg-accent/5 py-24 border-y border-border">
                        <div className="mx-auto max-w-4xl px-6 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Our Shared Commitment</h2>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                At Merit Advisory, we believe that technology is the bridge to a more prosperous future for Somalia. Our team is united by a single mission: to deliver excellence in every implementation and to be the most trusted partner for digital transformation in the region.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
