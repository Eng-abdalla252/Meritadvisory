import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Services } from "@/components/services"
import { ProductShowcase } from "@/components/product-showcase"
import { SolvingStages } from "@/components/solving-stages"
import { CTASection } from "@/components/cta-section"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Our Services & Expertise | Merit Advisory Somalia",
    description: "Explore our comprehensive suite of ERP solutions, software engineering, and digital advisory services powered by global technology standards.",
}

export default function ServicesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                    </div>
                    
                    <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                            Solutions Portfolio
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                            World-Class <span className="text-primary italic">Expertise</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                            Empowering organizations with high-end digital engineering, strategic ERP implementations, and comprehensive advisory services.
                        </p>
                    </div>
                </section>

                <div className="bg-background">
                    <Services />
                    <ProductShowcase />
                    <SolvingStages />
                    <CTASection />
                </div>
            </main>
            <Footer />
        </div>
    )
}
