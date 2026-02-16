import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { Awards } from "@/components/awards"
import { Benefits } from "@/components/benefits"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "About Us | Merit Advisory Services",
    description: "Learn more about Merit Advisory Services, our mission, vision, and the core values that drive our success.",
}

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-32">
                <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Our Story
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            About Merit Advisory
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                            Leading the way in digital transformation and enterprise excellence across Africa.
                        </p>
                    </div>
                </section>
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
