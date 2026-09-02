import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ProjectQuestionnaireForm from "@/components/project-questionnaire"
import { InternalPageHero } from "@/components/internal-page-hero"
import { FileText, ClipboardCheck, Target, Clock } from "lucide-react"

export const metadata = {
    title: "Project Questionnaire | Merit Advisory Services",
    description: "Submit your project requirements through our comprehensive business needs assessment form to help us understand your goals.",
}

export default function QuestionnairePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <InternalPageHero
                    badge="Project Questionnaire"
                    title="Tell Us About Your Project"
                    description="We value your time. Providing these details upfront allows our experts to conduct preliminary research and arrive prepared for our first consultation."
                    primaryCTA={{
                        label: "Start Questionnaire",
                        href: "#form"
                    }}
                    visual={
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <FileText className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Form</p>
                                    <p className="text-2xl font-bold text-foreground">Comprehensive</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <ClipboardCheck className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Process</p>
                                    <p className="text-2xl font-bold text-foreground">Streamlined</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Target className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Focus</p>
                                    <p className="text-2xl font-bold text-foreground">Your Goals</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <Clock className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</p>
                                    <p className="text-2xl font-bold text-foreground">Save</p>
                                </div>
                            </div>
                        </div>
                    }
                    variant="split-image"
                />
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <ProjectQuestionnaireForm />
                </div>
            </main>
            <Footer />
        </div>
    )
}
