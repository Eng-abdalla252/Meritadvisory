"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Video as VideoIcon,
    Save,
    Loader2,
    Star,
    CheckCircle2
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

interface SuccessStory {
    id: string
    title: string
    client: string
    author: string
    role: string
    quote: string
    videoUrl: string
    category: string
    impact: string
    image: string
}

export default function SuccessStoriesAdmin() {
    const router = useRouter()
    const [stories, setStories] = React.useState<SuccessStory[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [editingStory, setEditingStory] = React.useState<SuccessStory | null>(null)
    
    // Image State
    const [imageUrl, setImageUrl] = React.useState("")

    React.useEffect(() => {
        if (editingStory) {
            setImageUrl(editingStory.image)
        } else {
            setImageUrl("")
        }
    }, [editingStory, isDialogOpen])

    const fetchStories = async () => {
        try {
            const res = await fetch("/api/admin/data-api?type=success-stories")
            const data = await res.json()
            if (Array.isArray(data)) {
                setStories(data)
            }
        } catch (error) {
            console.error("Failed to fetch success stories")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchStories()
        }
    }, [router])

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        
        const formData = new FormData(e.currentTarget)
        const storyData: SuccessStory = {
            id: editingStory?.id || `story-${Date.now()}`,
            title: formData.get("title") as string,
            client: formData.get("client") as string,
            author: formData.get("author") as string,
            role: formData.get("role") as string,
            image: imageUrl || "/placeholder.jpg",
            quote: formData.get("quote") as string,
            videoUrl: formData.get("videoUrl") as string,
            category: formData.get("category") as string,
            impact: formData.get("impact") as string
        }

        let updatedStories = []
        if (editingStory) {
            updatedStories = stories.map(s => s.id === editingStory.id ? storyData : s)
        } else {
            updatedStories = [storyData, ...stories]
        }

        try {
            const res = await fetch("/api/admin/data-api?type=success-stories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedStories)
            })
            if (res.ok) {
                setStories(updatedStories)
                setIsDialogOpen(false)
                setEditingStory(null)
            }
        } catch (error) {
            console.error("Failed to save success story")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this success story?")) return
        
        const updatedStories = stories.filter(s => s.id !== id)
        try {
            const res = await fetch("/api/admin/data-api?type=success-stories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedStories)
            })
            if (res.ok) {
                setStories(updatedStories)
            }
        } catch (error) {
            console.error("Failed to delete success story")
        }
    }

    const filteredStories = stories.filter(s => 
        s.title.toLowerCase().includes(search.toLowerCase()) || 
        s.client.toLowerCase().includes(search.toLowerCase()) ||
        s.author.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Success Stories</h1>
                    <p className="text-slate-500 font-medium">Manage detailed customer case studies and success video features.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) setEditingStory(null)
                }}>
                    <DialogTrigger asChild>
                        <Button className="h-14 bg-[#b22222] hover:bg-[#8b0000] text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-[#b22222]/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Success Story
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-[2.5rem] p-10">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingStory ? "Edit Success Story" : "New Success Story"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 mt-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Story Title</Label>
                                <Input name="title" defaultValue={editingStory?.title} required placeholder="e.g. Empowering Healthcare Management" className="h-12 rounded-xl" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Client Organization</Label>
                                    <Input name="client" defaultValue={editingStory?.client} required placeholder="e.g. Arafat Hospital" className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category/Industry</Label>
                                    <Input name="category" defaultValue={editingStory?.category} required placeholder="e.g. Healthcare" className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Person (Author)</Label>
                                    <Input name="author" defaultValue={editingStory?.author} required placeholder="e.g. Dr. Mohamed Ali" className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Author Role</Label>
                                    <Input name="role" defaultValue={editingStory?.role} required placeholder="e.g. CEO" className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Impact Statement / Key metric</Label>
                                <Input name="impact" defaultValue={editingStory?.impact} placeholder="e.g. Unified Healthcare Workflows" className="h-12 rounded-xl" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quote / Summary</Label>
                                <Textarea name="quote" defaultValue={editingStory?.quote} required className="rounded-xl min-h-[100px] leading-relaxed italic" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <ImageUpload 
                                    label="Author/Client Image" 
                                    value={imageUrl} 
                                    onChange={setImageUrl} 
                                />
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Video Testimonial URL</Label>
                                    <Input name="videoUrl" defaultValue={editingStory?.videoUrl} required placeholder="YouTube embed or mp4 link" className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                                <Button type="submit" disabled={saving} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 font-bold">
                                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Save Success Story
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
                ) : filteredStories.length === 0 ? (
                    <Card className="col-span-full py-24 text-center border-dashed border-2 border-slate-100 rounded-[2.5rem]">
                        <div className="flex flex-col items-center gap-4 text-slate-400">
                            <VideoIcon className="h-12 w-12 opacity-20" />
                            <p className="font-black uppercase text-xs tracking-widest">No success stories found</p>
                        </div>
                    </Card>
                ) : filteredStories.map((story) => (
                    <Card key={story.id} className="p-10 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-red-500/5 transition-all">
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-lg group-hover:rotate-[-3deg] transition-transform">
                                    <img src={story.image} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#b22222] transition-colors tracking-tight">{story.client}</h3>
                                    <p className="text-[10px] font-black text-[#b22222] uppercase tracking-widest">{story.title}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-10 w-10 rounded-xl hover:bg-slate-100 transition-all"
                                    onClick={() => {
                                        setEditingStory(story)
                                        setIsDialogOpen(true)
                                    }}
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500 transition-all"
                                    onClick={() => handleDelete(story.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="relative mb-8">
                            <p className="text-slate-600 font-medium leading-relaxed italic line-clamp-3">
                                "{story.quote}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                            <div className="flex gap-2">
                                <Badge className="bg-slate-50 text-slate-500 border-none px-3 py-1 uppercase text-[10px] font-black tracking-widest">
                                    {story.category}
                                </Badge>
                                {story.impact && (
                                    <Badge className="bg-green-50 text-green-700 border-none px-3 py-1 text-[10px] font-black flex items-center gap-1">
                                        <CheckCircle2 className="h-3 w-3" />
                                        {story.impact}
                                    </Badge>
                                )}
                            </div>
                            {story.videoUrl && (
                                <div className="flex items-center gap-2 text-[#b22222] text-[10px] font-black uppercase tracking-widest">
                                    <VideoIcon className="h-4 w-4" />
                                    Video: {story.videoUrl.slice(0, 30)}...
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
