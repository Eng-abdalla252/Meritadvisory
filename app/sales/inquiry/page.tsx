"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    TrendingUp, 
    CheckCircle2, 
    Loader2,
    ArrowLeft,
    Building2,
    Mail,
    Phone,
    User,
    DollarSign,
    FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

export default function SalesInquiryPage() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    
    // Form state
    const [formData, setFormData] = React.useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        serviceInterested: "",
        budgetRange: "",
        projectDetails: "",
        timeline: "",
        teamSize: "",
        currentSolution: "",
        goals: ""
    })
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const res = await fetch('/api/sales/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            
            if (res.ok) {
                toast.success("Sales inquiry submitted successfully! Our sales team will contact you within 24 hours.")
                router.push('/')
            } else {
                const error = await res.json()
                toast.error(error.message || "Failed to submit inquiry")
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Back</span>
                    </button>
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">
                        Sales Inquiry
                    </h1>
                    <p className="text-slate-600 font-medium">
                        Submit a sales inquiry and our team will help you find the right solution for your business
                    </p>
                </div>
                
                {/* Form */}
                <Card className="p-8 border-none shadow-xl rounded-[2rem] bg-white">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <User className="h-5 w-5 text-[#b22222]" />
                                Contact Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Full Name *
                                    </Label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Company *
                                    </Label>
                                    <Input
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Your Company Name"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Email Address *
                                    </Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="john@example.com"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Phone Number *
                                    </Label>
                                    <Input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+252 6XX XXX XXX"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Service Details */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-[#b22222]" />
                                Service Details
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Service Interested In *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, serviceInterested: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="blueprint-service">Blueprint Service</SelectItem>
                                            <SelectItem value="consulting">Consulting Services</SelectItem>
                                            <SelectItem value="software-development">Software Development</SelectItem>
                                            <SelectItem value="data-analytics">Data Analytics</SelectItem>
                                            <SelectItem value="cloud-services">Cloud Services</SelectItem>
                                            <SelectItem value="mobile-app">Mobile Application</SelectItem>
                                            <SelectItem value="web-app">Web Application</SelectItem>
                                            <SelectItem value="ai-solutions">AI Solutions</SelectItem>
                                            <SelectItem value="custom-solution">Custom Solution</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Budget Range *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select budget range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="under-10k">Under $10,000</SelectItem>
                                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                            <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                                            <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                                            <SelectItem value="500k+">$500,000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Timeline *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select timeline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="asap">ASAP</SelectItem>
                                            <SelectItem value="1-3-months">1-3 months</SelectItem>
                                            <SelectItem value="3-6-months">3-6 months</SelectItem>
                                            <SelectItem value="6-12-months">6-12 months</SelectItem>
                                            <SelectItem value="12-months+">12+ months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        
                        {/* Project Details */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="h-5 w-5 text-[#b22222]" />
                                Project Details
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Project Details *
                                    </Label>
                                    <Textarea
                                        name="projectDetails"
                                        value={formData.projectDetails}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Please describe your project requirements and objectives..."
                                        rows={6}
                                        className="rounded-xl"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                            Team Size
                                        </Label>
                                        <Input
                                            name="teamSize"
                                            value={formData.teamSize}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 10-50 employees"
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                            Current Solution
                                        </Label>
                                        <Input
                                            name="currentSolution"
                                            value={formData.currentSolution}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Excel spreadsheets, competitor software"
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Goals & Objectives
                                    </Label>
                                    <Textarea
                                        name="goals"
                                        value={formData.goals}
                                        onChange={handleInputChange}
                                        placeholder="What are your main goals for this project?"
                                        rows={4}
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex items-center gap-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 h-14 rounded-xl bg-[#b22222] text-white font-black uppercase tracking-widest hover:bg-[#8b1818] transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-5 w-5 mr-2" />
                                        Submit Inquiry
                                    </>
                                )}
                            </Button>
                            
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="h-14 rounded-xl font-black uppercase tracking-widest"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
