import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Clients } from "@/components/clients"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Building2, Globe, Handshake, Award } from "lucide-react"

export const metadata = {
    title: "Our Clients | Merit Advisory Services",
    description: "Explore the organizations we've partnered with to deliver innovative digital solutions.",
}

export default function ClientsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <InternalPageHero
                    badge="Trusted Partnerships"
                    title="Our Clients"
                    description="We've had the privilege of working with industry leaders across various sectors, helping them achieve their digital transformation goals."
                    visual={
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Building2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Enterprises</p>
                                        <p className="text-xl font-bold text-foreground">500+</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Globe className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Countries</p>
                                        <p className="text-xl font-bold text-foreground">10+</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Handshake className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Partnerships</p>
                                        <p className="text-xl font-bold text-foreground">Long-term</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Satisfaction</p>
                                        <p className="text-xl font-bold text-foreground">98%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    variant="split-image"
                />
                <Clients showHeader={false} />
            </main>
            <Footer />
        </div>
    )
}
