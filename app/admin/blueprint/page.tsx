"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Save, 
    Plus, 
    Trash2, 
    Loader2, 
    Layers, 
    DollarSign, 
    Clock, 
    Settings, 
    FileText, 
    CheckCircle2, 
    Calculator,
    AlertCircle
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ServiceModule {
    id: string
    name: string
    price: number
    hours: number
    description: string
}

interface Category {
    id: string
    name: string
    services: ServiceModule[]
}

interface EstimatorData {
    categories: Category[]
}

export default function BlueprintAdmin() {
    const router = useRouter()
    const [data, setData] = React.useState<EstimatorData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [activeCategoryTab, setActiveCategoryTab] = React.useState("")
    
    // Form state for adding new module
    const [newModule, setNewModule] = React.useState({
        name: "",
        price: "",
        hours: "",
        description: ""
    })

    const fetchBlueprintData = async () => {
        try {
            const res = await fetch("/api/admin/estimator")
            if (res.ok) {
                const fetched = await res.json()
                setData(fetched)
                if (fetched.categories && fetched.categories.length > 0) {
                    setActiveCategoryTab(fetched.categories[0].id)
                }
            } else {
                toast.error("Failed to load blueprint details")
            }
        } catch (error) {
            toast.error("An error occurred loading blueprint data")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchBlueprintData()
        }
    }, [router])

    const handleSave = async () => {
        if (!data) return
        setSaving(true)
        try {
            const res = await fetch("/api/admin/estimator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                toast.success("Blueprint Planner saved successfully!")
            } else {
                toast.error("Failed to save Blueprint details")
            }
        } catch (error) {
            toast.error("Error saving Blueprint planner data")
        } finally {
            setSaving(false)
        }
    }

    const handleUpdateService = (categoryIdx: number, serviceIdx: number, field: keyof ServiceModule, value: any) => {
        if (!data) return
        const updated = { ...data }
        
        if (field === "price" || field === "hours") {
            const num = parseFloat(value) || 0
            updated.categories[categoryIdx].services[serviceIdx] = {
                ...updated.categories[categoryIdx].services[serviceIdx],
                [field]: num
            }
        } else {
            updated.categories[categoryIdx].services[serviceIdx] = {
                ...updated.categories[categoryIdx].services[serviceIdx],
                [field]: value
            }
        }
        setData(updated)
    }

    const handleDeleteService = (categoryIdx: number, serviceIdx: number) => {
        if (!data) return
        const updated = { ...data }
        const serviceName = updated.categories[categoryIdx].services[serviceIdx].name
        updated.categories[categoryIdx].services.splice(serviceIdx, 1)
        setData(updated)
        toast.info(`Deleted module: ${serviceName}`)
    }

    const handleAddNewModule = (categoryIdx: number) => {
        if (!data) return
        if (!newModule.name.trim()) {
            toast.error("Please provide a module name")
            return
        }
        
        const priceNum = parseFloat(newModule.price) || 0
        const hoursNum = parseFloat(newModule.hours) || 0
        
        const moduleId = newModule.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
        
        // Check if ID already exists in any category
        const exists = data.categories.some(cat => cat.services.some(s => s.id === moduleId))
        const finalModuleId = exists ? `${moduleId}-${Date.now().toString().slice(-4)}` : moduleId

        const updated = { ...data }
        updated.categories[categoryIdx].services.push({
            id: finalModuleId,
            name: newModule.name,
            price: priceNum,
            hours: hoursNum,
            description: newModule.description
        })

        setData(updated)
        setNewModule({ name: "", price: "", hours: "", description: "" })
        toast.success("New module added successfully!")
    }

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin h-10 w-10 text-[#b22222]" />
                <p className="text-slate-400 font-medium">Loading Blueprint details...</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center py-20">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">Failed to load Blueprint planner</h3>
                <Button className="mt-4" onClick={fetchBlueprintData}>Try Again</Button>
            </div>
        )
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Blueprint & Budget Planner</h1>
                    <p className="text-slate-500 font-medium">Manage implementation pricing, project timelines, and available core/advanced modules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="bg-[#b22222] hover:bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl h-14 px-8 shadow-lg shadow-red-500/10 flex items-center gap-2 border-none"
                    >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Categories and Tabs */}
            <Tabs value={activeCategoryTab} onValueChange={setActiveCategoryTab} className="w-full">
                <TabsList className="bg-slate-100 p-1 rounded-2xl h-16 w-full max-w-4xl grid grid-cols-4">
                    {data.categories.map((category) => (
                        <TabsTrigger 
                            key={category.id} 
                            value={category.id} 
                            className="rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest h-full"
                        >
                            <Layers className="h-4 w-4 mr-2" />
                            {category.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {data.categories.map((category, catIdx) => (
                    <TabsContent key={category.id} value={category.id} className="mt-8 space-y-8 animate-in fade-in duration-300">
                        {/* Category Overview Card */}
                        <div className="flex justify-between items-center px-4 py-2 bg-slate-100/60 rounded-2xl">
                            <div className="flex items-center gap-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Category Name:</Label>
                                <Input 
                                    value={category.name}
                                    onChange={(e) => {
                                        const updated = { ...data }
                                        updated.categories[catIdx].name = e.target.value
                                        setData(updated)
                                    }}
                                    className="bg-transparent border-none font-black text-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-lg w-auto min-w-[200px]"
                                />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#0f4c9c] bg-blue-50 border border-blue-100/50 px-3 py-1.5 rounded-lg">
                                {category.services.length} Total Modules
                            </span>
                        </div>

                        {/* List of modules */}
                        <div className="grid grid-cols-1 gap-6">
                            {category.services.map((service, srvIdx) => (
                                <Card key={service.id} className="p-6 md:p-8 rounded-[2rem] border-slate-100 bg-white shadow-xl shadow-slate-100/50 relative overflow-hidden group hover:border-[#b22222]/20 transition-all duration-300">
                                    <div className="flex flex-col lg:flex-row gap-6 justify-between">
                                        <div className="flex-1 space-y-4">
                                            {/* Top info */}
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-md">ID: {service.id}</span>
                                            </div>

                                            {/* Inputs grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="space-y-1.5 col-span-1 md:col-span-2">
                                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Module Name</Label>
                                                    <Input 
                                                        value={service.name} 
                                                        onChange={(e) => handleUpdateService(catIdx, srvIdx, "name", e.target.value)}
                                                        className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200"
                                                    />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Price ($ USD)</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                                        <Input 
                                                            type="number"
                                                            value={service.price} 
                                                            onChange={(e) => handleUpdateService(catIdx, srvIdx, "price", e.target.value)}
                                                            className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200 pl-9"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Timeline (Hours)</Label>
                                                    <div className="relative">
                                                        <Clock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                                        <Input 
                                                            type="number"
                                                            value={service.hours} 
                                                            onChange={(e) => handleUpdateService(catIdx, srvIdx, "hours", e.target.value)}
                                                            className="rounded-xl font-bold h-12 bg-slate-50 border-slate-200 pl-9"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5 col-span-1 md:col-span-2">
                                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                                                    <Textarea 
                                                        value={service.description} 
                                                        onChange={(e) => handleUpdateService(catIdx, srvIdx, "description", e.target.value)}
                                                        className="rounded-xl min-h-[80px] text-slate-600 font-medium bg-slate-50 border-slate-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex lg:flex-col justify-end items-end gap-3 self-end lg:self-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 w-full lg:w-auto">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => handleDeleteService(catIdx, srvIdx)}
                                                className="border-red-100 hover:border-red-300 text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl h-12 flex items-center justify-center gap-2 font-bold px-4 shrink-0 transition-colors w-full lg:w-auto"
                                            >
                                                <Trash2 className="h-4.5 w-4.5" />
                                                Delete Module
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Add New Module Form */}
                        <Card className="p-8 rounded-[2rem] border-slate-200 border-2 border-dashed bg-slate-50/40">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-xl bg-[#0f4c9c]/10 text-[#0f4c9c] flex items-center justify-center">
                                    <Plus className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 tracking-tight">Add New Module</h4>
                                    <p className="text-slate-400 text-xs font-medium">Create a new item under this category block.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                                <div className="space-y-1.5 md:col-span-2">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">New Module Name *</Label>
                                    <Input 
                                        placeholder="e.g. Quality Inspection Module"
                                        value={newModule.name}
                                        onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                                        className="rounded-xl font-bold h-12 bg-white"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Price ($ USD) *</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <Input 
                                            type="number"
                                            placeholder="1200"
                                            value={newModule.price}
                                            onChange={(e) => setNewModule({ ...newModule, price: e.target.value })}
                                            className="rounded-xl font-bold h-12 bg-white pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Timeline (Hours) *</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <Input 
                                            type="number"
                                            placeholder="30"
                                            value={newModule.hours}
                                            onChange={(e) => setNewModule({ ...newModule, hours: e.target.value })}
                                            className="rounded-xl font-bold h-12 bg-white pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5 md:col-span-3">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Brief Description</Label>
                                    <Textarea 
                                        placeholder="Describe the module functionality, scope, and key deliverables..."
                                        value={newModule.description}
                                        onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                                        className="rounded-xl min-h-[60px] text-slate-600 font-medium bg-white"
                                    />
                                </div>

                                <div className="pt-5 flex justify-end">
                                    <Button 
                                        type="button"
                                        onClick={() => handleAddNewModule(catIdx)}
                                        className="bg-[#0f4c9c] hover:bg-slate-900 text-white rounded-xl h-12 px-6 font-black uppercase text-[10px] tracking-widest flex items-center gap-1 w-full md:w-auto border-none"
                                    >
                                        <Plus className="h-4 w-4" /> Add Module
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Bottom Floating Save Bar */}
            <div className="flex justify-end sticky bottom-8 z-40 bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-2xl">
                <Button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="bg-[#b22222] hover:bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl h-16 px-12 shadow-xl shadow-red-500/20 flex items-center gap-3 border-none"
                >
                    {saving ? <Loader2 className="h-5 w-5 animate-spin mr-1" /> : <Save className="h-5 w-5 mr-1" />}
                    Publish Budget Blueprint
                </Button>
            </div>
        </div>
    )
}
