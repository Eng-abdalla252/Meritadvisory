"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Video, 
    Calendar,
    Save,
    X,
    Loader2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUpload } from "@/components/admin/image-upload"

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
    status: "upcoming" | "recorded"
}

export default function WebinarsAdmin() {
    const router = useRouter()
    const [webinars, setWebinars] = React.useState<Webinar[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [editingWebinar, setEditingWebinar] = React.useState<Webinar | null>(null)
    
    // Image State
    const [imageUrl, setImageUrl] = React.useState("")

    React.useEffect(() => {
        if (editingWebinar) {
            setImageUrl(editingWebinar.image)
        } else {
            setImageUrl("")
        }
    }, [editingWebinar, isDialogOpen])

    const fetchWebinars = async () => {
        try {
            const res = await fetch("/api/admin/data-api?type=webinars")
            const data = await res.json()
            setWebinars(data)
        } catch (error) {
            console.error("Failed to fetch webinars")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchWebinars()
        }
    }, [router])

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        
        const formData = new FormData(e.currentTarget)
        const webinarData: Webinar = {
            id: editingWebinar?.id || `webinar-${Date.now()}`,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            image: imageUrl,
            videoUrl: formData.get("videoUrl") as string,
            date: formData.get("date") as string,
            time: formData.get("time") as string,
            speaker: formData.get("speaker") as string,
            speakerRole: formData.get("speakerRole") as string,
            category: formData.get("category") as string,
            status: formData.get("status") as "upcoming" | "recorded"
        }

        let updatedWebinars = []
        if (editingWebinar) {
            updatedWebinars = webinars.map(w => w.id === editingWebinar.id ? webinarData : w)
        } else {
            updatedWebinars = [webinarData, ...webinars]
        }

        try {
            const res = await fetch("/api/admin/data-api?type=webinars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedWebinars)
            })
            if (res.ok) {
                setWebinars(updatedWebinars)
                setIsDialogOpen(false)
                setEditingWebinar(null)
            }
        } catch (error) {
            console.error("Failed to save webinar")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this webinar?")) return
        
        const updatedWebinars = webinars.filter(w => w.id !== id)
        try {
            const res = await fetch("/api/admin/data-api?type=webinars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedWebinars)
            })
            if (res.ok) {
                setWebinars(updatedWebinars)
            }
        } catch (error) {
            console.error("Failed to delete webinar")
        }
    }

    const filteredWebinars = webinars.filter(w => 
        w.title.toLowerCase().includes(search.toLowerCase()) || 
        w.speaker.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Manage Webinars</h1>
                    <p className="text-slate-500 font-medium">Add, edit, or remove webinar sessions from the knowledge portal.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) setEditingWebinar(null)
                }}>
                    <DialogTrigger asChild>
                        <Button className="h-14 bg-[#e31e24] hover:bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-red-500/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Webinar
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-[2.5rem] p-10">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingWebinar ? "Edit Webinar" : "Create New Webinar"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 mt-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title</Label>
                                    <Input name="title" defaultValue={editingWebinar?.title} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                                    <Input name="category" defaultValue={editingWebinar?.category} required className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                                <Textarea name="description" defaultValue={editingWebinar?.description} required className="rounded-xl min-h-[100px]" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <ImageUpload 
                                    label="Thumbnail Image" 
                                    value={imageUrl} 
                                    onChange={setImageUrl} 
                                />
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Video/Join URL</Label>
                                    <Input name="videoUrl" defaultValue={editingWebinar?.videoUrl} required className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</Label>
                                    <Input name="date" defaultValue={editingWebinar?.date} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time</Label>
                                    <Input name="time" defaultValue={editingWebinar?.time} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</Label>
                                    <select name="status" defaultValue={editingWebinar?.status || "upcoming"} className="w-full h-12 rounded-xl border border-slate-200 px-3 text-sm font-medium">
                                        <option value="upcoming">Upcoming</option>
                                        <option value="recorded">Recorded</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Speaker Name</Label>
                                    <Input name="speaker" defaultValue={editingWebinar?.speaker} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Speaker Role</Label>
                                    <Input name="speakerRole" defaultValue={editingWebinar?.speakerRole} required className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                                <Button type="submit" disabled={saving} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 font-bold">
                                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Save Webinar
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="p-0 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                    <Search className="h-5 w-5 text-slate-400" />
                    <Input 
                        placeholder="Search by title, speaker, or category..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-none bg-transparent shadow-none focus-visible:ring-0 text-lg font-medium p-0 h-auto"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Webinar Detail</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Schedule</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Speaker</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-8 py-8 h-24 bg-slate-50/20" />
                                    </tr>
                                ))
                            ) : filteredWebinars.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center gap-4 text-slate-400">
                                            <Video className="h-12 w-12 opacity-20" />
                                            <p className="font-black uppercase text-xs tracking-widest">No webinars found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredWebinars.map((webinar) => (
                                <tr key={webinar.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                                                <img src={webinar.image} alt="" className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 group-hover:text-[#e31e24] transition-colors">{webinar.title}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{webinar.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-2 text-slate-600 mb-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span className="text-xs font-bold">{webinar.date}</span>
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{webinar.time}</p>
                                    </td>
                                    <td className="px-8 py-8">
                                        <p className="text-sm font-black text-slate-900">{webinar.speaker}</p>
                                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{webinar.speakerRole}</p>
                                    </td>
                                    <td className="px-8 py-8">
                                        <Badge className={webinar.status === "upcoming" ? "bg-emerald-50 text-emerald-600 border-none" : "bg-blue-50 text-blue-600 border-none"}>
                                            <span className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                                            <span className="uppercase text-[10px] font-black tracking-widest">{webinar.status}</span>
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-xl hover:bg-white hover:text-blue-600 hover:shadow-lg transition-all"
                                                onClick={() => {
                                                    setEditingWebinar(webinar)
                                                    setIsDialogOpen(true)
                                                }}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-xl hover:bg-white hover:text-red-600 hover:shadow-lg transition-all"
                                                onClick={() => handleDelete(webinar.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
