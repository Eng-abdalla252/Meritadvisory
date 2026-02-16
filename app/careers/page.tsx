"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Briefcase, MapPin, Users, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

interface Job {
    id: number
    name: string
    description: string
    no_of_recruitment: number
    address_id: [number, string] | false
    department_id: [number, string] | false
}

export default function CareersPage() {
    const [jobs, setJobs] = React.useState<Job[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch("/api/jobs")
            .then(res => res.json())
            .then(data => {
                setJobs(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-32 pb-24">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Work With Us
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                            Build the Future of Enterprise Technology
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            Join a team of elite consultants and engineers dedicated to solving the
                            world's most complex business challenges through digital transformation.
                        </p>
                    </div>
                </section>

                {/* Jobs Grid */}
                <div className="mx-auto max-w-7xl px-6 mt-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground">Open Positions</h2>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                            {jobs.length} Positions Available
                        </Badge>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                            <p>Fetching live openings from our ERP...</p>
                        </div>
                    ) : jobs.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {jobs.map((job) => (
                                <Card key={job.id} className="group p-6 transition-all hover:shadow-lg hover:border-primary/20">
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Briefcase className="h-6 w-6" />
                                        </div>
                                        <Badge variant="outline" className="text-xs">Full-Time</Badge>
                                    </div>

                                    <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {job.name}
                                    </h3>

                                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4" />
                                            {job.address_id ? job.address_id[1] : "Remote / Hybrid"}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="h-4 w-4" />
                                            {job.department_id ? job.department_id[1] : "Advisory Team"}
                                        </div>
                                    </div>

                                    <p className="mt-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                                        {job.description ? job.description.replace(/<[^>]*>?/gm, '') : "Join our team and help us deliver excellence in enterprise solutions."}
                                    </p>

                                    <Button className="mt-6 w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground" variant="outline" asChild>
                                        <Link href={`/careers/${job.id}`}>
                                            View Details & Apply
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
                            <p className="text-lg text-muted-foreground">No open positions at the moment.</p>
                            <p className="text-sm text-muted-foreground mt-2">Follow our LinkedIn for updates on new opportunities.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
