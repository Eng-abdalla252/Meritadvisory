"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    GraduationCap, 
    Upload, 
    FileText, 
    CheckCircle2, 
    AlertCircle,
    Loader2,
    ArrowLeft,
    Building2,
    Mail,
    Phone,
    MapPin,
    User,
    Calendar
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

export default function InternshipApplicationPage() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    
    // Form state
    const [formData, setFormData] = React.useState({
        fullName: "",
        email: "",
        phone: "",
        university: "",
        department: "",
        major: "",
        graduationYear: "",
        internshipArea: "",
        startDate: "",
        duration: "",
        additionalNotes: ""
    })
    
    // File uploads
    const [cvFile, setCvFile] = React.useState<File | null>(null)
    const [coverLetterFile, setCoverLetterFile] = React.useState<File | null>(null)
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter') => {
        const file = e.target.files?.[0] || null
        if (type === 'cv') setCvFile(file)
        if (type === 'coverLetter') setCoverLetterFile(file)
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
            
            const res = await fetch('/api/internships/apply', {
                method: 'POST',
                body: submitData
            })
            
            if (res.ok) {
                toast.success("Internship application submitted successfully! We'll review your application and get back to you soon.")
                router.push('/internships')
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
                        Internship Application
                    </h1>
                    <p className="text-slate-600 font-medium">
                        Apply for our internship program and gain valuable industry experience
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
                                        Department *
                                    </Label>
                                    <Input
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Computer Science"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Major *
                                    </Label>
                                    <Input
                                        name="major"
                                        value={formData.major}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Software Engineering"
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
                                        Internship Area *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, internshipArea: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select area" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="software-development">Software Development</SelectItem>
                                            <SelectItem value="data-science">Data Science</SelectItem>
                                            <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                                            <SelectItem value="marketing">Marketing</SelectItem>
                                            <SelectItem value="business-development">Business Development</SelectItem>
                                            <SelectItem value="project-management">Project Management</SelectItem>
                                            <SelectItem value="quality-assurance">Quality Assurance</SelectItem>
                                            <SelectItem value="devops">DevOps</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Preferred Start Date *
                                    </Label>
                                    <Input
                                        name="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        required
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Duration *
                                    </Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))} required>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="3-months">3 months</SelectItem>
                                            <SelectItem value="6-months">6 months</SelectItem>
                                            <SelectItem value="9-months">9 months</SelectItem>
                                            <SelectItem value="12-months">12 months</SelectItem>
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
                            </div>
                        </div>
                        
                        {/* Additional Information */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="h-5 w-5 text-[#b22222]" />
                                Additional Information
                            </h2>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Additional Notes
                                </Label>
                                <Textarea
                                    name="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself, your skills, and why you're interested in this internship..."
                                    rows={6}
                                    className="rounded-xl"
                                />
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
