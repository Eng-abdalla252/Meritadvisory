"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Image as ImageIcon,
    Globe,
    Save,
    Loader2
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
    
    // Image State
    const [logo, setLogo] = React.useState("")
    const [selectedIndustry, setSelectedIndustry] = React.useState("")
    const [newCategoryName, setNewCategoryName] = React.useState("")
    const [savingCategories, setSavingCategories] = React.useState(false)

    React.useEffect(() => {
        if (editingClient) {
            setLogo(editingClient.data.logo)
            setSelectedIndustry(editingClient.data.industry)
        } else {
            setLogo("")
            setSelectedIndustry(categories.filter(c => c !== "All")[0] || "")
        }
    }, [editingClient, isDialogOpen, categories])

    const fetchClients = async () => {
        try {
            const res = await fetch("/api/admin/data-api?type=clients")
            const data = await res.json()
            setClients(data)
        } catch (error) {
            console.error("Failed to fetch clients")
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/admin/data-api?type=client-categories")
            const data = await res.json()
            setCategories(data)
        } catch (error) {
            console.error("Failed to fetch categories")
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchClients()
            fetchCategories()
        }
    }, [router])

    const handleSaveCategories = async (updatedCategories: string[]) => {
        setSavingCategories(true)
        try {
            const res = await fetch("/api/admin/data-api?type=client-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCategories)
            })
            if (res.ok) {
                setCategories(updatedCategories)
                toast.success("Categories updated successfully")
            } else {
                toast.error("Failed to update categories")
            }
        } catch (e) {
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
        const clientData: Client = {
            name: formData.get("name") as string,
            industry: formData.get("industry") as string,
            logo: logo,
            country: formData.get("country") as string,
        }

        let updatedClients = [...clients]
        if (editingClient) {
            updatedClients[editingClient.index] = clientData
        } else {
            updatedClients = [clientData, ...updatedClients]
        }

        try {
            const res = await fetch("/api/admin/data-api?type=clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedClients)
            })
            if (res.ok) {
                setClients(updatedClients)
                setIsDialogOpen(false)
                setEditingClient(null)
            }
        } catch (error) {
            console.error("Failed to save client")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to remove this client?")) return
        
        const updatedClients = clients.filter((_, i) => i !== index)
        try {
            const res = await fetch("/api/admin/data-api?type=clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedClients)
            })
            if (res.ok) {
                setClients(updatedClients)
            }
        } catch (error) {
            console.error("Failed to delete client")
        }
    }

    const filteredClients = clients.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.industry.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Trusted Clients</h1>
                    <p className="text-slate-500 font-medium">Manage the global organization logos displayed in the "Trusted By" carousel.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Category Manager Dialog */}
                    <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="h-14 border-slate-200 hover:bg-slate-50 text-slate-700 font-black uppercase text-xs tracking-widest rounded-2xl px-6">
                                <Settings className="h-4 w-4 mr-2" />
                                Manage Categories
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md rounded-[2.5rem] p-10">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                    Predefined Categories
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 mt-6">
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="New Category..." 
                                        value={newCategoryName}
                                        onChange={e => setNewCategoryName(e.target.value)}
                                        className="h-12 rounded-xl"
                                    />
                                    <Button 
                                        type="button" 
                                        onClick={handleAddCategory}
                                        disabled={savingCategories}
                                        className="h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-5 font-bold shrink-0"
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="max-h-60 overflow-y-auto space-y-2 border border-slate-100 rounded-xl p-3 bg-slate-50">
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
                        if (!open) setEditingClient(null)
                    }}>
                        <DialogTrigger asChild>
                            <Button className="h-14 bg-[#e31e24] hover:bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-red-500/20">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Client Logo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md rounded-[2.5rem] p-10">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                    {editingClient ? "Edit Client" : "New Client Logo"}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSave} className="space-y-6 mt-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organization Name</Label>
                                    <Input name="name" defaultValue={editingClient?.data.name} required className="h-12 rounded-xl" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Industry</Label>
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
                                />

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Country/Region</Label>
                                    <Input name="country" defaultValue={editingClient?.data.country} required className="h-12 rounded-xl" />
                                </div>

                                <div className="flex justify-end gap-4 pt-6">
                                    <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                                    <Button type="submit" disabled={saving} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 font-bold">
                                        {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                        Save Client
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card className="p-0 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                    <Search className="h-5 w-5 text-slate-400" />
                    <Input 
                        placeholder="Search by company name or industry..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-none bg-transparent shadow-none focus-visible:ring-0 text-lg font-medium p-0 h-auto"
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-100">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white p-12 h-48 animate-pulse" />
                        ))
                    ) : filteredClients.length === 0 ? (
                        <div className="col-span-full bg-white py-24 text-center">
                            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20 text-slate-400" />
                            <p className="font-black uppercase text-xs tracking-widest text-slate-400">No clients found</p>
                        </div>
                    ) : filteredClients.map((client, i) => (
                        <div key={client.name + i} className="bg-white p-8 flex flex-col items-center justify-center relative group">
                            <div className="h-20 w-full flex items-center justify-center mb-6">
                                <img src={client.logo} alt={client.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-black text-slate-900 mb-1">{client.name}</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{client.industry}</span>
                                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{client.country}</span>
                                </div>
                            </div>
                            
                            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-white hover:shadow-md"
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
                                    className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-red-50 hover:text-red-500 hover:shadow-md"
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
