"use client"

import * as React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    TrendingUp,
    Users,
    Award,
    Zap,
    Shield,
    Target,
    FileText,
    Download,
    BookOpen,
} from "lucide-react"
import Link from "next/link"
import { iconMap } from "@/lib/icon-map"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PDFViewer } from "@/components/pdf-viewer"

interface ServiceDetail {
    slug: string
    iconName: string
    title: string
    subtitle: string
    heroDescription: string
    imageUrl: string
    keyBenefits: string[]
    approach: Array<{ step: string; detail: string }>
    technologies: string[]
    stats: Array<{ value: string; label: string }>
}

interface ServiceDetailClientProps {
    service: ServiceDetail
    related: ServiceDetail[]
}

interface Document {
  id: string
  title: string
  description: string
  category: string
  fileType: string
  fileSize: string
  thumbnail: string
  fileUrl: string
  serviceId: string | null
  featured: boolean
}

export function ServiceDetailClient({ service, related }: ServiceDetailClientProps) {
    const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation()
    const { ref: approachRef, isVisible: approachVisible } = useScrollAnimation()
    const { ref: techRef, isVisible: techVisible } = useScrollAnimation()
    const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()
    const { ref: relatedRef, isVisible: relatedVisible } = useScrollAnimation()
    const { ref: docsRef, isVisible: docsVisible } = useScrollAnimation()

    const Icon = iconMap[service.iconName] || Target
    const [relatedDocuments, setRelatedDocuments] = React.useState<Document[]>([])
    const [pdfViewer, setPdfViewer] = React.useState<{
        isOpen: boolean
        documentUrl: string
        documentTitle: string
    }>({ isOpen: false, documentUrl: "", documentTitle: "" })

    React.useEffect(() => {
        fetch("/data/documents.json")
            .then(res => res.json())
            .then((data: Document[]) => {
                // Filter documents that match this service's slug
                const serviceDocs = data.filter(doc => doc.serviceId === service.slug)
                setRelatedDocuments(serviceDocs)
            })
            .catch(() => {})
    }, [service.slug])

    const handleReadDocument = (doc: Document) => {
        setPdfViewer({
            isOpen: true,
            documentUrl: doc.fileUrl,
            documentTitle: doc.title,
        })
    }

    const handleDownload = (doc: Document) => {
        const link = document.createElement("a")
        link.href = doc.fileUrl
        link.download = doc.title
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <InternalPageHero
                badge={service.title}
                title={service.subtitle}
                description={service.heroDescription}
                primaryCTA={{
                    label: "Get Started",
                    href: "https://wa.me/16725723750"
                }}
                secondaryCTA={{
                    label: "Schedule Consultation",
                    href: "https://wa.me/16725723750"
                }}
                visual={
                    <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                        <div className="grid grid-cols-2 gap-4">
                            {service.stats.slice(0, 4).map((stat, i) => (
                                <div key={i} className="bg-slate-50 rounded-xl p-4">
                                    <TrendingUp className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                variant="split-image"
            />

            {/* Stats Section */}
            <section ref={statsRef} className="border-y bg-card py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 md:grid-cols-3">
                        {service.stats.map((stat, i) => (
                            <div
                                key={i}
                                className={`text-center transition-all duration-600 ${statsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div className="text-4xl font-bold text-primary md:text-5xl">{stat.value}</div>
                                <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Benefits Section */}
            <section ref={benefitsRef} className="py-20 md:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2
                            className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${benefitsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Key Benefits
                        </h2>
                        <p
                            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${benefitsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Discover the transformative advantages our {service.title.toLowerCase()} brings to your organization
                        </p>
                    </div>

                    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {service.keyBenefits.map((benefit, i) => (
                            <Card
                                key={i}
                                className={`group relative overflow-hidden p-6 transition-all duration-600 hover:-translate-y-1 hover:shadow-xl ${benefitsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${200 + i * 80}ms` }}
                            >
                                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-accent/10 blur-2xl transition-all group-hover:bg-accent/20" />
                                <div className="relative flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Approach Section */}
            <section ref={approachRef} className="bg-card py-20 md:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2
                            className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${approachVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Our Proven Approach
                        </h2>
                        <p
                            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${approachVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            A systematic methodology that ensures successful delivery every time
                        </p>
                    </div>

                    <div className="mt-16 space-y-8">
                        {service.approach.map((step, i) => (
                            <div
                                key={i}
                                className={`group relative transition-all duration-600 ${approachVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${200 + i * 100}ms` }}
                            >
                                <div className="flex gap-6">
                                    {/* Step Number */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-bold text-primary-foreground shadow-lg">
                                                {i + 1}
                                            </div>
                                            {i < service.approach.length - 1 && (
                                                <div className="absolute left-1/2 top-12 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-accent/50 to-transparent" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Step Content */}
                                    <Card className="flex-1 p-6 transition-all group-hover:shadow-lg">
                                        <h3 className="text-xl font-semibold text-foreground">{step.step}</h3>
                                        <p className="mt-3 leading-relaxed text-muted-foreground">{step.detail}</p>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section ref={techRef} className="py-20 md:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2
                            className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${techVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Technologies We Work With
                        </h2>
                        <p
                            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${techVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            Industry-leading platforms and tools that power our solutions
                        </p>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {service.technologies.map((tech, i) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className={`px-6 py-3 text-base transition-all duration-600 hover:border-accent hover:bg-accent/10 hover:text-accent ${techVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-primary to-accent py-20 text-primary-foreground">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">Ready to Transform Your Business?</h2>
                    <p className="mt-4 text-lg opacity-90">
                        Let's discuss how our {service.title.toLowerCase()} can drive measurable results for your organization.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button size="lg" variant="secondary" className="group" asChild>
                            <Link href="https://wa.me/16725723750" target="_blank" rel="noopener noreferrer">
                                Schedule a Free Consultation
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                            <Link href="https://wa.me/16725723750" target="_blank" rel="noopener noreferrer">
                                Download Service Brief
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {related.length > 0 && (
                <section ref={relatedRef} className="bg-card py-20 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2
                                className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${relatedVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                Related Services
                            </h2>
                            <p
                                className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${relatedVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                Explore other ways we can help your business grow
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-3">
                            {related.map((relatedService, i) => {
                                const RelatedIcon = iconMap[relatedService.iconName] || Target
                                return (
                                    <Link
                                        key={relatedService.slug}
                                        href={`/services/${relatedService.slug}`}
                                        className={`group transition-all duration-600 ${relatedVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                            }`}
                                        style={{ transitionDelay: `${200 + i * 100}ms` }}
                                    >
                                        <Card className="h-full p-6 transition-all hover:-translate-y-2 hover:shadow-xl">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                                                <RelatedIcon className="h-6 w-6" />
                                            </div>
                                            <h3 className="mt-4 text-xl font-semibold text-foreground">
                                                {relatedService.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                                                {relatedService.heroDescription}
                                            </p>
                                            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                                                Learn More
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Documents & Resources */}
            {relatedDocuments.length > 0 && (
                <section ref={docsRef} className="py-20 md:py-32 bg-card/50">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2
                                className={`text-3xl font-bold text-foreground md:text-4xl transition-all duration-600 ${docsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                Related Documents & Resources
                            </h2>
                            <p
                                className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${docsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                            >
                                Download brochures, capability statements, and resources specific to {service.title.toLowerCase()}
                            </p>
                        </div>

                        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedDocuments.map((doc, i) => (
                                <Card
                                    key={doc.id}
                                    className={`group relative overflow-hidden border-border bg-card transition-all duration-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 rounded-2xl ${docsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                                    style={{ transitionDelay: `${i * 80}ms` }}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <FileText className="h-6 w-6" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2">
                                                    {doc.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                                                    {doc.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                                    <span className="font-medium">{doc.fileType}</span>
                                                    <span>•</span>
                                                    <span>{doc.fileSize}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        className="flex-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                                                        onClick={() => handleReadDocument(doc)}
                                                    >
                                                        <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                                                        Read
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="rounded-lg border-border hover:bg-accent/10 text-xs"
                                                        onClick={() => handleDownload(doc)}
                                                    >
                                                        <Download className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />

            {/* PDF Viewer Modal */}
            <PDFViewer
                isOpen={pdfViewer.isOpen}
                onClose={() => setPdfViewer({ isOpen: false, documentUrl: "", documentTitle: "" })}
                documentUrl={pdfViewer.documentUrl}
                documentTitle={pdfViewer.documentTitle}
            />
        </div>
    )
}
