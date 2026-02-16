"use client"

import { useState } from "react"
import { projectsData, projectCategories } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Layers } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Projects() {
    const { ref, isVisible } = useScrollAnimation()
    const [activeCategory, setActiveCategory] = useState("All")

    const filteredProjects = projectsData.filter(
        (project) => activeCategory === "All" || project.category === activeCategory
    )

    return (
        <section id="projects" className="bg-muted/30 py-24 md:py-32">
            <div ref={ref} className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                        Our Portfolio
                    </Badge>
                    <h2
                        className={`text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        Projects Implemented
                    </h2>
                    <p
                        className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        Explore our successful implementations across various industries and regions.
                    </p>
                </div>

                <Tabs defaultValue="All" className="mt-12 w-full" onValueChange={setActiveCategory}>
                    <div className="flex justify-center">
                        <TabsList className="grid h-auto w-full max-w-2xl grid-cols-2 gap-2 bg-background p-1 md:grid-cols-5">
                            {projectCategories.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div
                        key={activeCategory}
                        className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredProjects.map((project) => (
                                <Dialog key={project.id}>
                                    <DialogTrigger asChild>
                                        <Card className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                                            <div className="relative aspect-video overflow-hidden bg-muted">
                                                {/* Placeholder Image */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                                                    <Layers className="h-10 w-10 opacity-50" />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                                <div className="absolute bottom-4 left-4 right-4 translate-y-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                    <span className="text-sm font-medium">Click for details</span>
                                                </div>
                                            </div>
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <Badge variant="secondary" className="text-xs font-semibold">
                                                        {project.category}
                                                    </Badge>
                                                    <span className="flex items-center text-xs text-muted-foreground">
                                                        <MapPin className="mr-1 h-3 w-3" />
                                                        {project.location}
                                                    </span>
                                                </div>
                                                <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                                    {project.description}
                                                </p>
                                                <p className="mt-4 text-sm font-medium text-primary">
                                                    {project.client}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-muted">
                                                <div className="flex h-full w-full items-center justify-center bg-accent/10 text-accent">
                                                    <Layers className="h-16 w-16 opacity-50" />
                                                </div>
                                            </div>
                                            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                                            <DialogDescription className="text-base text-muted-foreground mt-2">
                                                {project.client} • {project.location} • {project.year}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="mt-4 space-y-4">
                                            <p className="text-foreground leading-relaxed">
                                                {project.details || project.description}
                                            </p>

                                            <div>
                                                <h4 className="mb-2 font-semibold text-foreground">Key Technologies:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies?.map((tech) => (
                                                        <Badge key={tech} variant="outline">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </div>
                </Tabs>
            </div>
        </section>
    )
}
