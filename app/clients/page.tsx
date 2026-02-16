import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Clients } from "@/components/clients"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Our Clients | Merit Advisory Services",
    description: "Explore the organizations we've partnered with to deliver innovative digital solutions.",
}

export default function ClientsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-32">
                <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Trusted Partnerships
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Our Clients
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            We've had the privilege of working with industry leaders across various sectors, helping them achieve their digital transformation goals.
                        </p>
                    </div>
                </section>
                <Clients showHeader={false} />
            </main>
            <Footer />
        </div>
    )
}
