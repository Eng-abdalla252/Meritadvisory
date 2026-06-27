import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Team } from "@/components/team"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Our Team | Merit Advisory Somalia",
    description: "Meet the experts behind Somalia's leading digital transformations and ERP implementations.",
}

export default function TeamPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section without Background Image */}
                <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-900">
                    <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent backdrop-blur-sm">
                            Expert Leadership
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
                            Our Global Experts
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
                            A diverse group of strategists, technologists, and consultants dedicated to empowering Somali businesses with world-class expertise.
                        </p>
                    </div>
                </section>

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
