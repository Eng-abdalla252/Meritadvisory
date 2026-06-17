"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    FileText, 
    Upload, 
    CheckCircle2, 
    Loader2,
    ArrowLeft,
    AlertCircle,
    Building2,
    Mail,
    Phone,
    User,
    AlertTriangle
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

export default function TechnicalSupportPage() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    
    // Form state
    const [formData, setFormData] = React.useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        productService: "",
        issueDescription: "",
        priorityLevel: "",
        stepsToReproduce: "",
        expectedBehavior: "",
        environment: ""
    })
    
    // File upload
    const [attachmentFile, setAttachmentFile] = React.useState<File | null>(null)
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setAttachmentFile(file)
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            // Create form data
            const submitData = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                submitData.append(key, value)
            })
            
            if (attachmentFile) submitData.append('attachment', attachmentFile)
            
            const res = await fetch('/api/support/request', {
                method: 'POST',
                body: submitData
            })
            
            if (res.ok) {
                toast.success("Support request submitted successfully! Our team will review your request and get back to you within 24 hours.")
                router.push('/')
            } else {
                const error = await res.json()
                toast.error(error.message || "Failed to submit request")
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
                        Technical Support Request
                    </h1>
                    <p className="text-slate-600 font-medium">
                        Submit a technical support request and our team will help you resolve the issue
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
                        
                        {/* Issue Details */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-[#b22222]" />
                                Issue Details
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Product/Service *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, productService: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select product/service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="blueprint-service">Blueprint Service</SelectItem>
                                            <SelectItem value="consulting">Consulting Services</SelectItem>
                                            <SelectItem value="software-development">Software Development</SelectItem>
                                            <SelectItem value="data-analytics">Data Analytics</SelectItem>
                                            <SelectItem value="cloud-services">Cloud Services</SelectItem>
                                            <SelectItem value="mobile-app">Mobile Application</SelectItem>
                                            <SelectItem value="web-app">Web Application</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Priority Level *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priorityLevel: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low - Non-critical issue</SelectItem>
                                            <SelectItem value="medium">Medium - Affects some functionality</SelectItem>
                                            <SelectItem value="high">High - Major impact on operations</SelectItem>
                                            <SelectItem value="critical">Critical - System down or data loss</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Issue Description *
                                    </Label>
                                    <Textarea
                                        name="issueDescription"
                                        value={formData.issueDescription}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Please describe the issue you're experiencing in detail..."
                                        rows={6}
                                        className="rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Steps to Reproduce
                                    </Label>
                                    <Textarea
                                        name="stepsToReproduce"
                                        value={formData.stepsToReproduce}
                                        onChange={handleInputChange}
                                        placeholder="List the steps that led to this issue..."
                                        rows={4}
                                        className="rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Expected Behavior
                                    </Label>
                                    <Textarea
                                        name="expectedBehavior"
                                        value={formData.expectedBehavior}
                                        onChange={handleInputChange}
                                        placeholder="What did you expect to happen?"
                                        rows={4}
                                        className="rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Environment
                                    </Label>
                                    <Input
                                        name="environment"
                                        value={formData.environment}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Windows 10, Chrome Browser, Production Server"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* File Upload */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Upload className="h-5 w-5 text-[#b22222]" />
                                Attachments
                            </h2>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Attachment (Screenshots, logs, etc. - Max 10MB)
                                </Label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-[#b22222] transition-colors">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png,.txt,.log,.zip"
                                        onChange={handleFileChange}
                                        className="w-full"
                                    />
                                    {attachmentFile && (
                                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                            <FileText className="h-4 w-4" />
                                            {attachmentFile.name}
                                        </div>
                                    )}
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
                                        Submit Request
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
