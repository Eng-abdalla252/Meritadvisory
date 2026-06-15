"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Image as ImageIcon,
    Loader2,
    CheckCircle2,
    RefreshCw,
    Minimize2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUpload } from "@/components/admin/image-upload"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Settings, X } from "lucide-react"

interface Client {
    name: string
    industry: string
    logo: string
    country: string
}

export default function ClientsAdmin() {
    const router = useRouter()
    const [clients, setClients] = React.useState<Client[]>([])
    const [categories, setCategories] = React.useState<string[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = React.useState(false)
    const [editingClient, setEditingClient] = React.useState<{data: Client, index: number} | null>(null)
    
    // Image & Category State
    const [logo, setLogo] = React.useState("")
    const [selectedIndustry, setSelectedIndustry] = React.useState("")
    const [newCategoryName, setNewCategoryName] = React.useState("")
    const [savingCategories, setSavingCategories] = React.useState(false)

    // Sync form state when dialog opens / editing changes
    React.useEffect(() => {
        if (isDialogOpen) {
            if (editingClient) {
                setLogo(editingClient.data.logo || "")
                setSelectedIndustry(editingClient.data.industry || "")
            } else {
                setLogo("")
                setSelectedIndustry(categories.filter(c => c !== "All")[0] || "")
            }
        }
    }, [isDialogOpen, editingClient])

    const fetchJson = async (type: string) => {
        const ts = Date.now()
        try {
            const res = await fetch(`/api/admin/data-api?type=${type}&_=${ts}`, { cache: "no-store" })
            if (res.ok) {
                const data = await res.json()
                if (Array.isArray(data)) return data
            }
        } catch {}
        try {
            const res = await fetch(`/data/${type}.json?_=${ts}`, { cache: "no-store" })
            if (res.ok) {
                const data = await res.json()
                if (Array.isArray(data)) return data
            }
        } catch {}
        return []
    }

    const fetchClients = async () => {
        try {
            const data = await fetchJson("clients")
            setClients(data)
        } catch (error) {
            console.error("Failed to fetch clients")
            setClients([])
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const data = await fetchJson("client-categories")
            setCategories(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error("Failed to fetch categories")
            setCategories([])
        }
    }

    React.useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) {
            router.push("/admin/login")
        } else {
            fetchClients()
            fetchCategories()
        }
    }, [router])

    const handleSaveCategories = async (updatedCategories: string[]) => {
        setSavingCategories(true)
        try {
            const token = localStorage.getItem("admin_token")
            const res = await fetch("/api/admin/data-api?type=client-categories", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedCategories),
                credentials: "include"
            })
            if (res.ok) {
                setCategories(updatedCategories)
                toast.success("Categories updated successfully")
            } else {
                toast.error("Failed to update categories")
            }
        } catch {
            toast.error("Error saving categories")
        } finally {
            setSavingCategories(false)
        }
    }

    const handleAddCategory = () => {
        const trimmed = newCategoryName.trim()
        if (!trimmed) return
        if (categories.includes(trimmed)) {
            toast.error("Category already exists")
            return
        }
        const updated = [...categories, trimmed]
        handleSaveCategories(updated)
        setNewCategoryName("")
    }

    const handleDeleteCategory = (catToDelete: string) => {
        if (catToDelete === "All") return
        const updated = categories.filter(c => c !== catToDelete)
        handleSaveCategories(updated)
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        
        const formData = new FormData(e.currentTarget)
        const name = (formData.get("name") as string || "").trim()
        const country = (formData.get("country") as string || "").trim()

        if (!name) {
            toast.error("Organization name is required")
            setSaving(false)
            return
        }
        if (!selectedIndustry) {
            toast.error("Please select a category/industry")
            setSaving(false)
            return
        }

        const clientData: Client = {
            name,
            industry: selectedIndustry,
            logo: logo,
            country,
        }

        let updatedClients = [...clients]
        if (editingClient) {
            updatedClients[editingClient.index] = clientData
        } else {
            updatedClients = [clientData, ...updatedClients]
        }

        try {
            const token = localStorage.getItem("admin_token")
            const res = await fetch("/api/admin/data-api?type=clients", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedClients),
                credentials: "include"
            })
            if (res.ok) {
                setClients(updatedClients)
                setIsDialogOpen(false)
                setEditingClient(null)
                toast.success(editingClient ? "Client updated and published!" : "Client added and published!")
            } else {
                toast.error("Failed to save — server error")
            }
        } catch (error) {
            toast.error("Network error. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to remove this client?")) return
        
        const updatedClients = clients.filter((_, i) => i !== index)
        try {
            const token = localStorage.getItem("admin_token")
            const res = await fetch("/api/admin/data-api?type=clients", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedClients),
                credentials: "include"
            })
            if (res.ok) {
                setClients(updatedClients)
                toast.success("Client removed")
            } else {
                toast.error("Failed to delete client")
            }
        } catch {
            toast.error("Network error. Please try again.")
        }
    }

    const filteredClients = clients.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        (c.industry || "").toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Trusted Clients</h1>
                    <p className="text-slate-500 font-medium">Manage organization logos displayed in the "Trusted By" section.</p>
                </div>
                
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Refresh button */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => { setLoading(true); fetchClients(); fetchCategories() }}
                        className="h-10 w-10 border-slate-200 rounded-xl"
                        title="Refresh"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>

                    {/* Category Manager Dialog */}
                    <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="h-12 border-slate-200 hover:bg-slate-50 text-slate-700 font-black uppercase text-xs tracking-widest rounded-2xl px-6">
                                <Settings className="h-4 w-4 mr-2" />
                                Categories
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md rounded-[2.5rem] p-10">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                    Manage Categories
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 mt-6">
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="New Category..." 
                                        value={newCategoryName}
                                        onChange={e => setNewCategoryName(e.target.value)}
                                        onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddCategory())}
                                        className="h-12 rounded-xl"
                                    />
                                    <Button 
                                        type="button" 
                                        onClick={handleAddCategory}
                                        disabled={savingCategories}
                                        className="h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-5 font-bold shrink-0"
                                    >
                                        {savingCategories ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
                                    </Button>
                                </div>
                                <div className="max-h-64 overflow-y-auto space-y-2 border border-slate-100 rounded-xl p-3 bg-slate-50">
                                    {categories.length === 0 && (
                                        <p className="text-center text-xs text-slate-400 py-4">No categories yet</p>
                                    )}
                                    {categories.map((cat) => (
                                        <div key={cat} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-sm font-semibold">
                                            <span>{cat}</span>
                                            {cat !== "All" && (
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => handleDeleteCategory(cat)}
                                                    disabled={savingCategories}
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Add Client Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) { setEditingClient(null); setLogo("") }
                    }}>
                        <DialogTrigger asChild>
                            <Button className="h-12 bg-[#e31e24] hover:bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-red-500/20">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Client Logo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg rounded-[2.5rem] p-0 overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Fixed header */}
                            <DialogHeader className="px-10 pt-10 pb-0 shrink-0 flex items-center justify-between">
                                <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                    {editingClient ? "Edit Client" : "New Client Logo"}
                                </DialogTitle>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="h-8 w-8 rounded-xl hover:bg-slate-100"
                                >
                                    <Minimize2 className="h-4 w-4" />
                                </Button>
                            </DialogHeader>

                            {/* Scrollable form body */}
                            <div className="overflow-y-auto flex-1 px-10 py-6">
                                <form id="client-form" onSubmit={handleSave} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organization Name *</Label>
                                        <Input 
                                            name="name" 
                                            defaultValue={editingClient?.data.name} 
                                            required 
                                            className="h-12 rounded-xl" 
                                            placeholder="e.g. Acme Corporation"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Industry / Category *</Label>
                                        <Select 
                                            value={selectedIndustry}
                                            onValueChange={setSelectedIndustry}
                                        >
                                            <SelectTrigger className="h-12 rounded-xl">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.filter(c => c !== "All").map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <input type="hidden" name="industry" value={selectedIndustry} />
                                    </div>

                                    <ImageUpload 
                                        label="Organization Logo" 
                                        value={logo} 
                                        onChange={setLogo}
                                        hint="Upload company logo. Will display in the Trusted By section."
                                    />

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Country / Region</Label>
                                        <Input 
                                            name="country" 
                                            defaultValue={editingClient?.data.country} 
                                            className="h-12 rounded-xl"
                                            placeholder="e.g. Somalia"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Fixed footer with Save button — always visible */}
                            <div className="px-10 pb-10 pt-4 shrink-0 border-t border-slate-100 bg-white flex justify-end gap-4">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    onClick={() => setIsDialogOpen(false)} 
                                    className="rounded-xl font-bold"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    form="client-form"
                                    disabled={saving} 
                                    className="bg-[#e31e24] hover:bg-red-700 text-white rounded-xl px-10 font-bold min-w-[140px]"
                                >
                                    {saving ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
                                    ) : (
                                        <><CheckCircle2 className="h-4 w-4 mr-2" /> {editingClient ? "Update & Publish" : "Save & Publish"}</>
                                    )}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card className="p-0 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                    <Search className="h-5 w-5 text-slate-400 shrink-0" />
                    <Input 
                        placeholder="Search by company name or industry..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-none bg-transparent shadow-none focus-visible:ring-0 text-lg font-medium p-0 h-auto"
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Stats bar */}
                <div className="px-8 py-4 border-b border-slate-100 bg-white flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">
                        {filteredClients.length} of {clients.length} clients
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        All Published
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-100">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white p-12 h-48 animate-pulse" />
                        ))
                    ) : filteredClients.length === 0 ? (
                        <div className="col-span-full bg-white py-24 text-center">
                            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20 text-slate-400" />
                            <p className="font-black uppercase text-xs tracking-widest text-slate-400">
                                {search ? "No clients match your search" : "No clients yet — add your first client logo"}
                            </p>
                        </div>
                    ) : filteredClients.map((client, i) => (
                        <div key={client.name + i} className="bg-white p-8 flex flex-col items-center justify-center relative group transition-all hover:bg-slate-50/50">
                            <div className="h-20 w-full flex items-center justify-center mb-4">
                                {client.logo ? (
                                    <img 
                                        src={client.logo} 
                                        alt={client.name} 
                                        className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" 
                                    />
                                ) : (
                                    <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <span className="text-2xl font-black text-slate-300">{client.name[0]}</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-black text-slate-900 mb-1 line-clamp-1">{client.name}</p>
                                <div className="flex items-center justify-center gap-1 flex-wrap">
                                    <span className="text-[9px] font-black text-[#1e4e8c] bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{client.industry}</span>
                                    {client.country && (
                                        <span className="text-[9px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{client.country}</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 rounded-lg bg-white hover:bg-slate-50 hover:shadow-md border border-slate-100"
                                    onClick={() => {
                                        setEditingClient({data: client, index: i})
                                        setIsDialogOpen(true)
                                    }}
                                >
                                    <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 rounded-lg bg-white hover:bg-red-50 hover:text-red-500 hover:shadow-md border border-slate-100"
                                    onClick={() => handleDelete(i)}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
