"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { partnershipsData } from "@/lib/partnerships-data"
import { Handshake, CalendarDays, Maximize2 } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Partnerships() {
    const { ref, isVisible } = useScrollAnimation()

    return (
        <section id="partnerships" className="py-24 md:py-32 bg-background">
            <div ref={ref} className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                        Strategic Alliances
                    </Badge>
                    <h2
                        className={`text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        Partnership & Agreement Signings
                    </h2>
                    <p
                        className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        We collaborate with industry leaders and government bodies to drive innovation.
                    </p>
                </div>

                <div className={`transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {partnershipsData.map((item, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="group cursor-pointer">
                                                <Card className="overflow-hidden border-border bg-card">
                                                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                                        {/* Placeholder for Image */}
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 text-muted-foreground group-hover:scale-105 transition-transform duration-500">
                                                            <Handshake className="h-16 w-16 mb-2 opacity-20" />
                                                            <span className="text-xs font-medium opacity-40">Event Photo</span>
                                                        </div>

                                                        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                                                            <Maximize2 className="h-8 w-8 text-white drop-shadow-md" />
                                                        </div>
                                                    </div>
                                                    <CardContent className="p-6">
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                                            <CalendarDays className="h-3 w-3" />
                                                            {item.date}
                                                        </div>
                                                        <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                                                            {item.partner}
                                                        </h3>
                                                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                                            {item.description}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-transparent shadow-none">
                                            <div className="relative aspect-video w-full bg-background rounded-lg overflow-hidden flex items-center justify-center">
                                                {/* Large Placeholder */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center">
                                                    <Handshake className="h-32 w-32 text-primary/20" />
                                                    <h3 className="mt-4 text-2xl font-bold text-foreground/50">{item.partner}</h3>
                                                    <p className="text-foreground/40">{item.date}</p>
                                                </div>
                                            </div>
                                            <div className="bg-background/95 backdrop-blur p-6 rounded-b-lg -mt-2 relative z-10 mx-auto max-w-2xl text-center">
                                                <h3 className="text-xl font-bold text-foreground">{item.description}</h3>
                                                <p className="mt-2 text-muted-foreground">{item.details}</p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12" />
                        <CarouselNext className="hidden md:flex -right-12" />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
