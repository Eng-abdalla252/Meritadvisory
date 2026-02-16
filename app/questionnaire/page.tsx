import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ProjectQuestionnaireForm from "@/components/project-questionnaire"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Project Questionnaire | Merit Advisory Services",
    description: "Submit your project requirements through our comprehensive business needs assessment form to help us understand your goals.",
}

export default function QuestionnairePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-32 pb-24">
                <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5 text-accent">
                            Intake Process
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Project Questionnaire
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            We value your time. Providing these details upfront allows our experts to
                            conduct preliminary research and arrive prepared for our first consultation.
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6">
                    <ProjectQuestionnaireForm />
                </div>
            </main>
            <Footer />
        </div>
    )
}
