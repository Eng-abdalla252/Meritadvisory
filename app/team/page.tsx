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
                {/* Hero Section with Background Image */}
                <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                            alt="Merit Advisory Team"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                    </div>

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
                    
                    {/* Mission Section for Professionalism */}
                    <section className="bg-accent/5 py-24 border-y border-border">
                        <div className="mx-auto max-w-4xl px-6 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Our Shared Commitment</h2>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                At Merit Advisory, we believe that technology is the bridge to a more prosperous future for Somalia. Our team is united by a single mission: to deliver excellence in every implementation and to be the most trusted partner for digital transformation in the region.
                            </p>
                            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div>
                                    <div className="text-3xl font-bold text-primary">100%</div>
                                    <div className="text-sm text-muted-foreground">Local Commitment</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">50+</div>
                                    <div className="text-sm text-muted-foreground">Experts</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">Global</div>
                                    <div className="text-sm text-muted-foreground">Standards</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">Proven</div>
                                    <div className="text-sm text-muted-foreground">Integrity</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
