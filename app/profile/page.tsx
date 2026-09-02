"use client"

import * as React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  BookOpen,
  Building2,
  GraduationCap,
  Briefcase,
  Filter,
  ArrowRight,
  BarChart3,
  TrendingUp,
  Users,
  Database,
  FileCheck,
  ArrowDown
} from "lucide-react"
import { PDFViewer } from "@/components/pdf-viewer"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

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

const categoryIconMap: Record<string, any> = {
  "Company Profile": Building2,
  "Corporate Brochures": BookOpen,
  "Service Brochures": Briefcase,
  "Technology": FileText,
  "Reports": FileText,
  "Other Resources": FileText,
}

export default function ProfilePage() {
  const { ref: docsRef, isVisible: docsVisible } = useScrollAnimation()
  const [documents, setDocuments] = React.useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = React.useState<Document[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [loading, setLoading] = React.useState(true)
  const [pdfViewer, setPdfViewer] = React.useState<{
    isOpen: boolean
    documentUrl: string
    documentTitle: string
  }>({ isOpen: false, documentUrl: "", documentTitle: "" })

  const categories = ["All", "Company Profile", "Corporate Brochures", "Technology", "ERP & Business Systems"]

  // Only these five official PDF documents should appear on this page.
  // They are served directly from /public/documents.
  const allowedDocuments: Document[] = [
    {
      id: "firm-profile",
      title: "Firm Profile",
      description:
        "An overview of Merit Advisory Services, our capabilities, expertise, and commitment to helping organizations achieve sustainable growth.",
      category: "Company Profile",
      fileType: "PDF",
      fileSize: "PDF",
      thumbnail: "/documents/thumbnails/firm-profile-thumbnail.png",
      fileUrl: "/documents/Firm%20Profile.pdf",
      serviceId: null,
      featured: true,
    },
    {
      id: "merit-service-catalogue",
      title: "Merit Service Catalogue",
      description:
        "Explore Merit Advisory Services' advisory, financial management, technology, ERP, digital transformation, and capacity-building services.",
      category: "Corporate Brochures",
      fileType: "PDF",
      fileSize: "PDF",
      thumbnail: "/documents/thumbnails/merit-service-catalogue-thumbnail.png",
      fileUrl: "/documents/Merit%20Service%20Catalogue%20.pdf",
      serviceId: null,
      featured: true,
    },
    {
      id: "merit-technology-solutions",
      title: "Merit Technology Solutions",
      description:
        "Discover Merit Advisory's technology solutions, ERP implementation, digital transformation, software, and business systems capabilities.",
      category: "Technology",
      fileType: "PDF",
      fileSize: "PDF",
      thumbnail: "/documents/thumbnails/merit-technology-solutions-thumbnail.png",
      fileUrl: "/documents/Merit%20Technology%20solutions%20.pdf",
      serviceId: null,
      featured: true,
    },
    {
      id: "odoo-profile",
      title: "Odoo Profile",
      description:
        "Learn about Merit Advisory's Odoo ERP expertise, implementation capabilities, business systems services, and digital transformation approach.",
      category: "ERP & Business Systems",
      fileType: "PDF",
      fileSize: "PDF",
      thumbnail: "/documents/thumbnails/odoo-profile-thumbnail.png",
      fileUrl: "/documents/Odoo%20profile.pdf",
      serviceId: null,
      featured: true,
    },
    {
      id: "odoo-brochure",
      title: "Odoo Brochure",
      description:
        "A dedicated overview of Odoo ERP solutions and how Merit Advisory helps organizations configure, implement, integrate, and support Odoo.",
      category: "ERP & Business Systems",
      fileType: "PDF",
      fileSize: "PDF",
      thumbnail: "/documents/thumbnails/odoo-brochure-thumbnail.png",
      fileUrl: "/documents/Odoo%20Brochure.pdf",
      serviceId: null,
      featured: true,
    },
  ]

  React.useEffect(() => {
    setDocuments(allowedDocuments)
    setFilteredDocuments(allowedDocuments)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredDocuments(documents)
    } else {
      setFilteredDocuments(documents.filter(doc => doc.category === selectedCategory))
    }
  }, [selectedCategory, documents])

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
        badge="Company Profile & Resources"
        title="Discover Merit Advisory Services"
        description="Explore our company profile, capabilities, solutions, services, and corporate resources designed to help organizations make better decisions, improve performance, and accelerate digital transformation."
        primaryCTA={{
          label: "View Company Profile",
          href: "#documents"
        }}
        secondaryCTA={{
          label: "Browse Brochures",
          href: "#documents"
        }}
        visual={
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profile</p>
                <p className="text-2xl font-bold text-foreground">Corporate</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brochures</p>
                <p className="text-2xl font-bold text-foreground">Service</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <FileText className="h-8 w-8 text-primary mb-2" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Documents</p>
                <p className="text-2xl font-bold text-foreground">Resources</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <Database className="h-8 w-8 text-primary mb-2" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data</p>
                <p className="text-2xl font-bold text-foreground">Insights</p>
              </div>
            </div>
          </div>
        }
        variant="split-image"
      />

      {/* Document Library Section */}
      <section id="documents-section" ref={docsRef} className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className={`text-center mb-12 transition-all duration-600 ${docsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">
              Company Profile & Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our corporate materials, brochures, capability statements, and service resources.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={`mb-12 transition-all duration-600 ${docsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="mt-4 text-muted-foreground">Loading documents...</p>
              </div>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-lg text-muted-foreground">No documents found in this category.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc, i) => {
                const CategoryIcon = categoryIconMap[doc.category] || FileText
                
                return (
                  <Card
                    key={doc.id}
                    className={`group relative overflow-hidden border-border bg-card transition-all duration-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 rounded-2xl ${docsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                      {doc.thumbnail ? (
                        <img
                          src={doc.thumbnail}
                          alt={doc.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CategoryIcon className="h-16 w-16 text-slate-400" />
                        </div>
                      )}
                      {doc.featured && (
                        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-6">
                      {/* Category Badge */}
                      <Badge variant="outline" className="mb-3 text-[10px] uppercase tracking-wider font-semibold border-primary/20 text-primary/70 bg-primary/5">
                        {doc.category}
                      </Badge>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                        {doc.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                        {doc.description}
                      </p>

                      {/* File Info */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <span className="font-medium">{doc.fileType}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => handleReadDocument(doc)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl border-border hover:bg-accent/10"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl mb-4">
            Need More Information?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Contact our team to discuss your specific requirements or request customized documentation.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="group rounded-full"
            asChild
          >
            <a href="https://wa.me/16725723750" target="_blank" rel="noopener noreferrer">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </section>

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
