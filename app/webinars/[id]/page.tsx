"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
    Calendar, 
    Clock, 
    User, 
    ArrowLeft,
    CheckCircle2,
    Video,
    Users,
    Globe,
    Send
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Webinar {
    id: string
    title: string
    description: string
    image: string
    videoUrl: string
    date: string
    time: string
    speaker: string
    speakerRole: string
    category: string
    status: string
}

export default function WebinarDetailPage() {
    const params = useParams()
    const [webinar, setWebinar] = React.useState<Webinar | null>(null)
    const [isSubmitted, setIsSubmitted] = React.useState(false)

    React.useEffect(() => {
        fetch("/data/webinars.json")
            .then(res => res.json())
            .then(data => {
                const found = data.find((w: Webinar) => w.id === params.id)
                setWebinar(found)
            })
            .catch(() => {})
    }, [params.id])

    if (!webinar) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)
        const data = {
            type: "webinar",
            name: formData.get("name"),
            email: formData.get("email"),
            company: formData.get("company"),
            webinarTitle: webinar.title,
            webinarId: webinar.id
        }

        try {
            const response = await fetch("/api/admin/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setIsSubmitted(true)
            }
        } catch (error) {
            console.error("Registration failed:", error)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-24">
                <div className="mx-auto max-w-7xl px-6">
                    <Link 
                        href="/webinars"
                        className="inline-flex items-center gap-2 text-slate-500 font-black uppercase text-xs tracking-widest hover:text-[#e31e24] transition-colors mb-12"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Webinars
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-6">
                                <Badge className="bg-red-50 text-[#e31e24] border-none font-black text-xs uppercase tracking-widest px-6 py-2 rounded-full">
                                    Upcoming Webinar
                                </Badge>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                                    {webinar.title}
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                    {webinar.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-10 bg-slate-50 rounded-[2.5rem]">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#e31e24]">
                                        <Calendar className="h-5 w-5" />
                                        <span className="font-black uppercase text-xs tracking-widest">Date</span>
                                    </div>
                                    <p className="font-bold text-slate-900">{webinar.date}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#e31e24]">
                                        <Clock className="h-5 w-5" />
                                        <span className="font-black uppercase text-xs tracking-widest">Time</span>
                                    </div>
                                    <p className="font-bold text-slate-900">{webinar.time}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#e31e24]">
                                        <Globe className="h-5 w-5" />
                                        <span className="font-black uppercase text-xs tracking-widest">Format</span>
                                    </div>
                                    <p className="font-bold text-slate-900">Live Virtual Session</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-3xl font-black text-slate-900">Featured Speaker</h2>
                                <div className="flex items-center gap-6 p-8 border border-slate-100 rounded-[2.5rem]">
                                    <div className="h-24 w-24 rounded-3xl bg-slate-900 overflow-hidden shadow-xl shadow-slate-200">
                                        <img 
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                                            alt={webinar.speaker} 
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-1">{webinar.speaker}</h3>
                                        <p className="text-red-500 font-black uppercase text-xs tracking-widest mb-4">{webinar.speakerRole}</p>
                                        <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                                            A thought leader in digital transformation with over 15 years of experience in ERP strategy and implementation.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-3xl font-black text-slate-900">What You'll Learn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        "Strategic planning for ERP success",
                                        "Cost optimization and ROI measurement",
                                        "Risk mitigation in implementation",
                                        "Future-proofing your business data"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="mt-1 bg-green-50 text-green-500 p-1 rounded-full">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                            <p className="text-slate-600 font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Registration Sidebar */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-40 bg-white rounded-[3rem] border border-slate-100 p-10 lg:p-14 shadow-2xl shadow-slate-200/50">
                                {isSubmitted ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-8"
                                    >
                                        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-green-500 mb-4">
                                            <CheckCircle2 className="h-12 w-12" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Registration Confirmed!</h3>
                                            <p className="text-slate-500 font-medium">
                                                A calendar invitation and join link have been sent to your email. We look forward to seeing you there!
                                            </p>
                                        </div>
                                        <Button 
                                            variant="outline"
                                            className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest border-2"
                                            onClick={() => setIsSubmitted(false)}
                                        >
                                            Register Another Person
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Secure Your Spot</h3>
                                            <p className="text-slate-500 font-medium">
                                                Join 250+ other professionals registered for this session.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                                                <Input id="name" name="name" required placeholder="John Doe" className="h-14 rounded-2xl border-slate-100 focus:ring-[#e31e24] focus:border-[#e31e24]" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</Label>
                                                <Input id="email" name="email" type="email" required placeholder="john@company.com" className="h-14 rounded-2xl border-slate-100 focus:ring-[#e31e24] focus:border-[#e31e24]" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company</Label>
                                                <Input id="company" name="company" required placeholder="Organization Name" className="h-14 rounded-2xl border-slate-100 focus:ring-[#e31e24] focus:border-[#e31e24]" />
                                            </div>
                                            
                                            <div className="pt-4">
                                                <Button type="submit" className="w-full h-16 bg-[#e31e24] hover:bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-red-500/10">
                                                    Register for Webinar
                                                    <Send className="h-4 w-4 ml-3" />
                                                </Button>
                                                <p className="text-center text-[10px] text-slate-400 font-medium mt-6 uppercase tracking-widest">
                                                    By registering, you agree to receive communications from Merit Advisory.
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
