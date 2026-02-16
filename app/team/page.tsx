import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Team } from "@/components/team"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Our Team | Merit Advisory Services",
    description: "Meet the experts behind our successful digital transformations and ERP implementations.",
}

export default function TeamPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-32">
                <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Expert Leadership
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Meet Our Team
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            A diverse group of strategists, technologists, and consultants dedicated to empowering your business with cutting-edge solutions.
                        </p>
                    </div>
                </section>
                <Team showHeader={false} />
            </main>
            <Footer />
        </div>
    )
}
