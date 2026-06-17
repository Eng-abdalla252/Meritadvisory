"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Briefcase, 
    Upload, 
    FileText, 
    CheckCircle2, 
    AlertCircle,
    Loader2,
    ArrowLeft,
    GraduationCap,
    Building2,
    Mail,
    Phone,
    MapPin,
    User
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

export default function CareerApplicationPage() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [uploading, setUploading] = React.useState(false)
    
    // Form state
    const [formData, setFormData] = React.useState({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        education: "",
        university: "",
        degree: "",
        graduationYear: "",
        coverLetter: "",
        linkedin: "",
        portfolio: ""
    })
    
    // File uploads
    const [cvFile, setCvFile] = React.useState<File | null>(null)
    const [coverLetterFile, setCoverLetterFile] = React.useState<File | null>(null)
    const [certificates, setCertificates] = React.useState<File[]>([])
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter' | 'certificates') => {
        if (type === 'certificates') {
            const files = Array.from(e.target.files || [])
            setCertificates(prev => [...prev, ...files])
        } else {
            const file = e.target.files?.[0] || null
            if (type === 'cv') setCvFile(file)
            if (type === 'coverLetter') setCoverLetterFile(file)
        }
    }
    
    const removeCertificate = (index: number) => {
        setCertificates(prev => prev.filter((_, i) => i !== index))
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
            
            if (cvFile) submitData.append('cv', cvFile)
            if (coverLetterFile) submitData.append('coverLetter', coverLetterFile)
            certificates.forEach((cert, i) => {
                submitData.append(`certificate_${i}`, cert)
            })
            
            const res = await fetch('/api/careers/apply', {
                method: 'POST',
                body: submitData
            })
            
            if (res.ok) {
                toast.success("Application submitted successfully! We'll review your application and get back to you soon.")
                router.push('/careers')
            } else {
                const error = await res.json()
                toast.error(error.message || "Failed to submit application")
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
                        Career Application
                    </h1>
                    <p className="text-slate-600 font-medium">
                        Join our team and help us build the future of business solutions
                    </p>
                </div>
                
                {/* Form */}
                <Card className="p-8 border-none shadow-xl rounded-[2rem] bg-white">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <User className="h-5 w-5 text-[#b22222]" />
                                Personal Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Full Name *
                                    </Label>
                                    <Input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
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
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Position Applied For *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select position" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="software-engineer">Software Engineer</SelectItem>
                                            <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                                            <SelectItem value="backend-developer">Backend Developer</SelectItem>
                                            <SelectItem value="full-stack-developer">Full Stack Developer</SelectItem>
                                            <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                                            <SelectItem value="project-manager">Project Manager</SelectItem>
                                            <SelectItem value="business-analyst">Business Analyst</SelectItem>
                                            <SelectItem value="data-analyst">Data Analyst</SelectItem>
                                            <SelectItem value="marketing-specialist">Marketing Specialist</SelectItem>
                                            <SelectItem value="sales-executive">Sales Executive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        
                        {/* Education & Experience */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-[#b22222]" />
                                Education & Experience
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        University/College *
                                    </Label>
                                    <Input
                                        name="university"
                                        value={formData.university}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="University of Technology"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Degree *
                                    </Label>
                                    <Input
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Bachelor of Science"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Graduation Year *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, graduationYear: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = new Date().getFullYear() + i
                                                return <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Years of Experience *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select experience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-1">0-1 years</SelectItem>
                                            <SelectItem value="1-3">1-3 years</SelectItem>
                                            <SelectItem value="3-5">3-5 years</SelectItem>
                                            <SelectItem value="5-10">5-10 years</SelectItem>
                                            <SelectItem value="10+">10+ years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        
                        {/* File Uploads */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Upload className="h-5 w-5 text-[#b22222]" />
                                Documents
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        CV/Resume * (PDF, DOC, DOCX - Max 10MB)
                                    </Label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-[#b22222] transition-colors">
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => handleFileChange(e, 'cv')}
                                            required
                                            className="w-full"
                                        />
                                        {cvFile && (
                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                                <FileText className="h-4 w-4" />
                                                {cvFile.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Cover Letter (PDF, DOC, DOCX - Max 5MB)
                                    </Label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-[#b22222] transition-colors">
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => handleFileChange(e, 'coverLetter')}
                                            className="w-full"
                                        />
                                        {coverLetterFile && (
                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                                <FileText className="h-4 w-4" />
                                                {coverLetterFile.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Certificates (PDF, JPG, PNG - Max 20MB total)
                                    </Label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-[#b22222] transition-colors">
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            multiple
                                            onChange={(e) => handleFileChange(e, 'certificates')}
                                            className="w-full"
                                        />
                                        {certificates.length > 0 && (
                                            <div className="mt-2 space-y-2">
                                                {certificates.map((cert, i) => (
                                                    <div key={i} className="flex items-center justify-between text-sm text-slate-600">
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4" />
                                                            {cert.name}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCertificate(i)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Additional Information */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="h-5 w-5 text-[#b22222]" />
                                Additional Information
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Cover Letter Text
                                    </Label>
                                    <Textarea
                                        name="coverLetter"
                                        value={formData.coverLetter}
                                        onChange={handleInputChange}
                                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                        rows={6}
                                        className="rounded-xl"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                            LinkedIn Profile
                                        </Label>
                                        <Input
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                            Portfolio Website
                                        </Label>
                                        <Input
                                            name="portfolio"
                                            value={formData.portfolio}
                                            onChange={handleInputChange}
                                            placeholder="https://yourportfolio.com"
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
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
                                        Submit Application
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
