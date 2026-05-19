"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Rocket, 
    Receipt, 
    ClipboardCheck, 
    Lightbulb, 
    BookOpen, 
    Shield, 
    Monitor,
    Database,
    Zap,
    Cpu,
    Save,
    Loader2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const iconMap: Record<string, any> = {
    Rocket, Receipt, ClipboardCheck, Lightbulb, BookOpen, Shield, Search, Monitor, Database, Zap, Cpu
}

interface Service {
    title: string
    subtitle: string
    icon: string
    slug: string
    color: string
    tags: string[]
}

export default function ServicesAdmin() {
    const router = useRouter()
    const [services, setServices] = React.useState<Service[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [editingService, setEditingService] = React.useState<{data: Service, index: number} | null>(null)

    const fetchData = async () => {
        try {
            const res = await fetch("/api/admin/data?type=services")
            const data = await res.json()
            setServices(data)
        } catch (error) {
            console.error("Failed to fetch services")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchData()
        }
    }, [router])

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        
        const formData = new FormData(e.currentTarget)
        const tagsString = formData.get("tags") as string
        const serviceData: Service = {
            title: formData.get("title") as string,
            subtitle: formData.get("subtitle") as string,
            icon: formData.get("icon") as string,
            slug: (formData.get("title") as string).toLowerCase().replace(/ /g, "-"),
            color: formData.get("color") as string || "from-slate-500 to-slate-700",
            tags: tagsString.split(",").map(t => t.trim()).filter(Boolean)
        }

        let updatedServices = [...services]
        if (editingService) {
            updatedServices[editingService.index] = serviceData
        } else {
            updatedServices = [serviceData, ...updatedServices]
        }

        try {
            const res = await fetch("/api/admin/data?type=services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedServices)
            })
            if (res.ok) {
                setServices(updatedServices)
                setIsDialogOpen(false)
                setEditingService(null)
            }
        } catch (error) {
            console.error("Failed to save service")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to remove this service?")) return
        
        const updatedServices = services.filter((_, i) => i !== index)
        try {
            const res = await fetch("/api/admin/data?type=services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedServices)
            })
            if (res.ok) {
                setServices(updatedServices)
            }
        } catch (error) {
            console.error("Failed to delete service")
        }
    }

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Our Services</h1>
                    <p className="text-slate-500 font-medium">Manage the core expertise and service offerings displayed on the site.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) setEditingService(null)
                }}>
                    <DialogTrigger asChild>
                        <Button className="h-14 bg-[#e31e24] hover:bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-red-500/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingService ? "Edit Service" : "New Service Offering"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 mt-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Service Title</Label>
                                <Input name="title" defaultValue={editingService?.data.title} required className="h-12 rounded-xl" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subtitle/Description</Label>
                                <Textarea name="subtitle" defaultValue={editingService?.data.subtitle} required className="rounded-xl min-h-[80px]" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Icon Type</Label>
                                    <select name="icon" defaultValue={editingService?.data.icon || "Cpu"} className="w-full h-12 rounded-xl border border-slate-200 px-3 text-sm font-medium">
                                        {Object.keys(iconMap).map(icon => (
                                            <option key={icon} value={icon}>{icon} Icon</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Color Gradient (Tailwind)</Label>
                                    <Input name="color" defaultValue={editingService?.data.color} placeholder="from-blue-500 to-cyan-500" className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tags (Comma separated)</Label>
                                <Input name="tags" defaultValue={editingService?.data.tags.join(", ")} placeholder="Odoo, Consulting, Audit" className="h-12 rounded-xl" />
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                                <Button type="submit" disabled={saving} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 font-bold">
                                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Save Service
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    [1, 2].map(i => (
                        <Card key={i} className="h-48 animate-pulse bg-slate-50/50 rounded-[2.5rem]" />
                    ))
                ) : services.length === 0 ? (
                    <Card className="col-span-full py-24 text-center border-dashed border-2 border-slate-100 rounded-[2.5rem]">
                        <p className="font-black uppercase text-xs tracking-widest text-slate-400">No services found</p>
                    </Card>
                ) : services.map((service, i) => {
                    const Icon = iconMap[service.icon] || Cpu
                    return (
                        <Card key={service.title + i} className="p-8 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-red-500/5 transition-all">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-6">
                                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                                        <Icon className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{service.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium line-clamp-2">{service.subtitle}</p>
                                        <div className="flex flex-wrap gap-1 pt-2">
                                            {service.tags.map(tag => (
                                                <span key={tag} className="text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-9 w-9 rounded-xl"
                                        onClick={() => {
                                            setEditingService({data: service, index: i})
                                            setIsDialogOpen(true)
                                        }}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-9 w-9 rounded-xl text-red-500"
                                        onClick={() => handleDelete(i)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
