"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { productsData, Product } from "@/lib/products-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, Search, LayoutGrid, List } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DemoModal } from "@/components/demo-modal"

const categories = ["All", "General Services", "Healthcare", "Hospitality", "Industry Specific", "Public Sector", "Retail & Service", "Specialized"]

export function ProductShowcase() {
    const { ref, isVisible } = useScrollAnimation()
    const [activeCategory, setActiveCategory] = useState("All")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState("")
    
    const filteredProducts = productsData.filter(product => {
        return activeCategory === "All" || product.category === activeCategory
    })

    return (
        <section id="products" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <div ref={ref} className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                        Our Proprietary Solutions
                    </Badge>
                    <h2 className={cn(
                        "text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-700",
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}>
                        Enterprise <span className="text-primary italic">Management Systems</span>
                    </h2>
                    <p className={cn(
                        "mt-6 max-w-3xl text-lg text-muted-foreground transition-all duration-700 delay-100",
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}>
                        We provide deeply specialized management platforms designed to automate and optimize every vertical of your organization.
                    </p>
                </div>

                <div className="flex justify-center mb-12 w-full">
                    <Tabs defaultValue="All" className="w-full lg:w-auto" onValueChange={setActiveCategory}>
                        <TabsList className="bg-muted/50 p-1 rounded-full overflow-x-auto flex-nowrap lg:flex-wrap h-auto">
                            {categories.map(cat => (
                                <TabsTrigger key={cat} value={cat} className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    {cat}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product, idx) => (
                        <div 
                            key={product.id}
                            className={cn(
                                "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20",
                                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                            )}
                            style={{ transitionDelay: `${100 + (idx % 6) * 100}ms` }}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <Badge className="bg-primary/90 text-white border-none shadow-lg">
                                        {product.category}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex flex-1 flex-col p-8">
                                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                    {product.title}
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                    {product.description}
                                </p>
                                
                                <div className="mt-8 space-y-3">
                                    <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">Key Benefits for Customers</p>
                                    {product.benefits.map(benefit => (
                                        <div key={benefit} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                            <span className="text-sm text-muted-foreground">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-auto pt-8">
                                    <Button 
                                        className="w-full rounded-full group/btn" 
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedProduct(product.title)
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        Learn More & Request Demo
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-muted-foreground">No systems found matching your search.</p>
                    </div>
                )}
            </div>

            <DemoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                productName={selectedProduct} 
            />
        </section>
    )
}
