import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Simple placeholder mapping for demo
    const title = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="mx-auto max-w-3xl px-6">
                    <Link
                        href="/#blog"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        Article
                    </span>

                    <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground md:text-5xl">
                        {title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
                        <span>Published recently</span>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <p className="lead text-xl text-foreground font-medium mb-8">
                            This is a placeholder for the blog post content. In a production environment, this would be fetched from a CMS or markdown file.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Key Takeaways</h2>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 my-6">
                            <li>Strategic implementation of digital tools</li>
                            <li>Change management best practices</li>
                            <li>ROI measurement and analytics</li>
                        </ul>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>

                    <div className="mt-16 border-t border-border pt-8">
                        <h3 className="text-xl font-bold text-foreground mb-4">Ready to learn more?</h3>
                        <Button asChild size="lg">
                            <Link href="#contact">Contact Our Experts</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
