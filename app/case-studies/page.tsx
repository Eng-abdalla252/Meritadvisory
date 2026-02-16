import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CaseStudies } from "@/components/case-studies"
import { Projects } from "@/components/projects"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Insights | Merit Advisory Services",
    description: "Read about our successful projects and the real-world impact we've delivered for our clients.",
}

export default function CaseStudiesPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-32">
                <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Proven Excellence
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Insights
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            Discover how we've helped organizations overcome challenges, optimize operations, and drive growth through strategic digital initiatives.
                        </p>
                    </div>
                </section>
                <div className="">
                    <CaseStudies showHeader={false} />
                    <Projects />
                </div>
            </main>
            <Footer />
        </div>
    )
}
