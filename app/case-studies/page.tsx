import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CaseStudies } from "@/components/case-studies"
import { Projects } from "@/components/projects"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Insights | Merit Advisory Somalia",
    description: "Read about our successful projects and the real-world impact we've delivered for our clients across East Africa.",
}

export default function CaseStudiesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section with Background Image */}
                <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/modern_office_mogadishu_1777450373996.png" 
                            alt="Merit Advisory Base"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent backdrop-blur-sm">
                            Proven Excellence
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
                            Insights & Success
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
                            Discover how Merit Advisory is driving the digital revolution in Somalia, helping organizations overcome complex challenges and achieve sustainable growth.
                        </p>
                    </div>
                </section>

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
