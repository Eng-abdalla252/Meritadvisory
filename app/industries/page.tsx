import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Industries } from "@/components/industries"
import { CaseStudies } from "@/components/case-studies"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Industries We Serve | Merit Advisory Services",
    description: "Discover how we deliver specialized expertise across manufacturing, finance, healthcare, and more.",
}

export default function IndustriesPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-32">
                <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Sector Expertise
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Industries We Serve
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                            Deep industry knowledge combined with technical excellence to deliver results that matter in your specific sector.
                        </p>
                    </div>
                </section>
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
