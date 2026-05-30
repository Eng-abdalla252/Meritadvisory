"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    MessageSquare, 
    Video as VideoIcon,
    Save,
    Loader2,
    Star
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUpload } from "@/components/admin/image-upload"

interface Testimonial {
    id: string
    author: string
    role: string
    image: string
    quote: string
    videoUrl: string
    category: string
}

export default function TestimonialsAdmin() {
    const router = useRouter()
    const [testimonials, setTestimonials] = React.useState<Testimonial[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null)
    
    // Image State
    const [imageUrl, setImageUrl] = React.useState("")

    React.useEffect(() => {
        if (editingTestimonial) {
            setImageUrl(editingTestimonial.image)
        } else {
            setImageUrl("")
        }
    }, [editingTestimonial, isDialogOpen])

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/admin/data-api?type=testimonials")
            const data = await res.json()
            setTestimonials(data)
        } catch (error) {
            console.error("Failed to fetch testimonials")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchTestimonials()
        }
    }, [router])

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        
        const formData = new FormData(e.currentTarget)
        const testimonialData: Testimonial = {
            id: editingTestimonial?.id || `testimonial-${Date.now()}`,
            author: formData.get("author") as string,
            role: formData.get("role") as string,
            image: imageUrl,
            quote: formData.get("quote") as string,
            videoUrl: formData.get("videoUrl") as string,
            category: formData.get("category") as string
        }

        let updatedTestimonials = []
        if (editingTestimonial) {
            updatedTestimonials = testimonials.map(t => t.id === editingTestimonial.id ? testimonialData : t)
        } else {
            updatedTestimonials = [testimonialData, ...testimonials]
        }

        try {
            const res = await fetch("/api/admin/data-api?type=testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTestimonials)
            })
            if (res.ok) {
                setTestimonials(updatedTestimonials)
                setIsDialogOpen(false)
                setEditingTestimonial(null)
            }
        } catch (error) {
            console.error("Failed to save testimonial")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return
        
        const updatedTestimonials = testimonials.filter(t => t.id !== id)
        try {
            const res = await fetch("/api/admin/data-api?type=testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTestimonials)
            })
            if (res.ok) {
                setTestimonials(updatedTestimonials)
            }
        } catch (error) {
            console.error("Failed to delete testimonial")
        }
    }

    const filteredTestimonials = testimonials.filter(t => 
        t.author.toLowerCase().includes(search.toLowerCase()) || 
        t.role.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Client Testimonials</h1>
                    <p className="text-slate-500 font-medium">Manage success stories and impact endorsements from your global clients.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) setEditingTestimonial(null)
                }}>
                    <DialogTrigger asChild>
                        <Button className="h-14 bg-[#b22222] hover:bg-[#8b0000] text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-[#b22222]/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Testimonial
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-[2.5rem] p-10">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingTestimonial ? "Edit Endorsement" : "New Endorsement"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 mt-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Author Name</Label>
                                    <Input name="author" defaultValue={editingTestimonial?.author} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category/Industry</Label>
                                    <Input name="category" defaultValue={editingTestimonial?.category} required placeholder="e.g. Finance, Manufacturing" className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Client Role & Company</Label>
                                <Input name="role" defaultValue={editingTestimonial?.role} required placeholder="e.g. CEO of World Bank" className="h-12 rounded-xl" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Quote</Label>
                                <Textarea name="quote" defaultValue={editingTestimonial?.quote} required className="rounded-xl min-h-[120px] leading-relaxed italic" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <ImageUpload 
                                    label="Author Image" 
                                    value={imageUrl} 
                                    onChange={setImageUrl} 
                                />
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Video Testimonial URL</Label>
                                    <Input name="videoUrl" defaultValue={editingTestimonial?.videoUrl} required className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                                <Button type="submit" disabled={saving} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 font-bold">
                                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Save Endorsement
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    [1, 2].map(i => (
                        <Card key={i} className="h-64 animate-pulse bg-slate-50/50 rounded-[2.5rem]" />
                    ))
                ) : filteredTestimonials.length === 0 ? (
                    <Card className="col-span-full py-24 text-center border-dashed border-2 border-slate-100 rounded-[2.5rem]">
                        <div className="flex flex-col items-center gap-4 text-slate-400">
                            <MessageSquare className="h-12 w-12 opacity-20" />
                            <p className="font-black uppercase text-xs tracking-widest">No testimonials found</p>
                        </div>
                    </Card>
                ) : filteredTestimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="p-10 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-red-500/5 transition-all">
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-lg group-hover:rotate-[-3deg] transition-transform">
                                    <img src={testimonial.image} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#b22222] transition-colors tracking-tight">{testimonial.author}</h3>
                                    <p className="text-[10px] font-black text-[#b22222] uppercase tracking-widest">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-10 w-10 rounded-xl hover:bg-slate-100 transition-all"
                                    onClick={() => {
                                        setEditingTestimonial(testimonial)
                                        setIsDialogOpen(true)
                                    }}
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500 transition-all"
                                    onClick={() => handleDelete(testimonial.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="relative mb-8">
                            <Star className="absolute -top-4 -left-4 h-12 w-12 text-slate-100 -z-10" />
                            <p className="text-slate-600 font-medium leading-relaxed italic line-clamp-3">
                                "{testimonial.quote}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                            <Badge className="bg-slate-50 text-slate-400 border-none px-3 py-1 uppercase text-[10px] font-black tracking-widest">
                                {testimonial.category}
                            </Badge>
                            {testimonial.videoUrl && (
                                <div className="flex items-center gap-2 text-[#b22222] text-[10px] font-black uppercase tracking-widest">
                                    <VideoIcon className="h-4 w-4" />
                                    Video Included
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
