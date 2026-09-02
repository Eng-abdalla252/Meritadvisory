import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Services } from "@/components/services"
import { ProductShowcase } from "@/components/product-showcase"
import { SolvingStages } from "@/components/solving-stages"
import { CTASection } from "@/components/cta-section"
import { InternalPageHero } from "@/components/internal-page-hero"
import { iconMap } from "@/lib/icon-map"
import { servicesDetail } from "@/lib/services-data"

export const metadata = {
    title: "Our Services & Expertise | Merit Advisory Somalia",
    description: "Explore our comprehensive suite of ERP solutions, software engineering, and digital advisory services powered by global technology standards.",
}

export default function ServicesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                <InternalPageHero
                    badge="Our Services"
                    title="Comprehensive Services for Your Business Growth"
                    description="Empowering organizations with high-end digital engineering, strategic ERP implementations, and comprehensive advisory services tailored to your unique needs."
                    primaryCTA={{
                        label: "View All Services",
                        href: "#services"
                    }}
                    visual={
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-6">
                            <div className="grid grid-cols-2 gap-3">
                                {servicesDetail.slice(0, 6).map((service) => {
                                    const ServiceIcon = iconMap[service.iconName]
                                    return (
                                        <div key={service.slug} className="bg-slate-50 rounded-xl p-3 hover:bg-primary/5 transition-colors">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                                                {ServiceIcon && <ServiceIcon className="h-4 w-4" />}
                                            </div>
                                            <p className="text-xs font-semibold text-foreground line-clamp-2">{service.title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                    variant="split-image"
                />
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
