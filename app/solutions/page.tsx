import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Solutions } from "@/components/solutions"
import { Process } from "@/components/process"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Our Solutions | Merit Advisory Services",
    description: "Explore our comprehensive suite of technological solutions designed to modernize your enterprise.",
}

export default function SolutionsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-32">
                <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Innovation & Growth
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Enterprise Solutions
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                            Cutting-edge technology strategies tailored to solve your most complex business challenges.
                        </p>
                    </div>
                </section>
                <div className="">
                    <Solutions />
                    <Process />
                </div>
            </main>
            <Footer />
        </div>
    )
}
