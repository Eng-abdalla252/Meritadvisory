"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Users, 
    Loader2,
    CheckCircle2,
    RefreshCw,
    X,
    Minimize2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

interface TeamMember {
    name: string
    role: string
    image: string
    expHeader?: string
    yearsExp?: string
    qualification?: string
    qualLabel?: string
    bio?: string
    email?: string
}

export default function TeamAdmin() {
    const router = useRouter()
    const [coreTeam, setCoreTeam] = React.useState<TeamMember[]>([])
    const [otherTeam, setOtherTeam] = React.useState<TeamMember[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [activeTab, setActiveTab] = React.useState("core")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [editingMember, setEditingMember] = React.useState<{data: TeamMember, index: number, category: string} | null>(null)
    
    // Image & Category State
    const [imageUrl, setImageUrl] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("core")

    // Sync state when dialog opens
    React.useEffect(() => {
        if (isDialogOpen) {
            if (editingMember) {
                setImageUrl(editingMember.data.image || "")
                setSelectedCategory(editingMember.category)
            } else {
                setImageUrl("")
                setSelectedCategory(activeTab)
            }
        }
    }, [isDialogOpen, editingMember])

    const fetchJson = async (apiType: string): Promise<TeamMember[]> => {
        const ts = Date.now()
        // Try API route first (fresh after admin saves)
        try {
            const res = await fetch(`/api/admin/data-api?type=${apiType}&_=${ts}`, { cache: "no-store" })
            if (res.ok) {
                const data = await res.json()
                if (Array.isArray(data)) return data
            }
        } catch {}
        // Fall back to static public/data JSON
        try {
            const res = await fetch(`/data/${apiType}.json?_=${ts}`, { cache: "no-store" })
            if (res.ok) {
                const data = await res.json()
                if (Array.isArray(data)) return data
            }
        } catch {}
        return []
    }

    const fetchData = async () => {
        try {
            const [core, other] = await Promise.all([
                fetchJson("team"),
                fetchJson("other-team")
            ])
            setCoreTeam(core)
            setOtherTeam(other)
        } catch (error) {
            console.error("Failed to fetch team data")
            setCoreTeam([])
            setOtherTeam([])
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) {
            router.push("/admin/login")
        } else {
            fetchData()
        }
    }, [router])

    const saveList = async (type: "team" | "other-team", list: TeamMember[]) => {
        const token = localStorage.getItem("admin_token")
        const res = await fetch(`/api/admin/data-api?type=${type}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Cookie": `admin_token=${token}`
            },
            body: JSON.stringify(list),
            credentials: "include"
        })
        if (!res.ok) throw new Error("Failed to save")
        return res
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        
        const formData = new FormData(e.currentTarget)
        const name = (formData.get("name") as string || "").trim()
        const role = (formData.get("role") as string || "").trim()

        if (!name || !role) {
            toast.error("Name and role are required")
            setSaving(false)
            return
        }

        const memberData: TeamMember = {
            name,
            role,
            image: imageUrl,
            expHeader: formData.get("expHeader") as string,
            yearsExp: formData.get("yearsExp") as string,
            qualification: formData.get("qualification") as string,
            qualLabel: formData.get("qualLabel") as string,
            bio: formData.get("bio") as string,
            email: formData.get("email") as string,
        }

        try {
            if (editingMember) {
                const oldCat = editingMember.category
                const newCat = selectedCategory

                if (oldCat === newCat) {
                    // Update in place
                    const list = oldCat === "core" ? [...coreTeam] : [...otherTeam]
                    list[editingMember.index] = memberData
                    await saveList(oldCat === "core" ? "team" : "other-team", list)
                    if (oldCat === "core") setCoreTeam(list)
                    else setOtherTeam(list)
                } else {
                    // Move between categories
                    const oldList = (oldCat === "core" ? coreTeam : otherTeam).filter((_, i) => i !== editingMember.index)
                    const newList = [memberData, ...(newCat === "core" ? coreTeam : otherTeam)]
                    await Promise.all([
                        saveList(oldCat === "core" ? "team" : "other-team", oldList),
                        saveList(newCat === "core" ? "team" : "other-team", newList)
                    ])
                    if (oldCat === "core") { setCoreTeam(oldList); setOtherTeam(newList) }
                    else { setOtherTeam(oldList); setCoreTeam(newList) }
                }
                toast.success("Team member updated and published!")
            } else {
                // New member
                const targetCat = selectedCategory
                const updatedList = [memberData, ...(targetCat === "core" ? coreTeam : otherTeam)]
                await saveList(targetCat === "core" ? "team" : "other-team", updatedList)
                if (targetCat === "core") setCoreTeam(updatedList)
                else setOtherTeam(updatedList)
                toast.success("Team member added and published!")
            }
            setIsDialogOpen(false)
            setEditingMember(null)
        } catch (error) {
            toast.error("Failed to save team member. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (index: number, category: string) => {
        if (!confirm("Remove this team member?")) return
        
        const isCoreTarget = category === "core"
        const updatedList = (isCoreTarget ? [...coreTeam] : [...otherTeam]).filter((_, i) => i !== index)
        try {
            await saveList(isCoreTarget ? "team" : "other-team", updatedList)
            if (isCoreTarget) setCoreTeam(updatedList)
            else setOtherTeam(updatedList)
            toast.success("Team member removed permanently")
            // Force refresh to ensure data is persisted
            await fetchData()
        } catch {
            toast.error("Failed to delete team member")
        }
    }

    const filteredCore = coreTeam.filter(m => (m?.name || "").toLowerCase().includes(search.toLowerCase()))
    const filteredOther = otherTeam.filter(m => (m?.name || "").toLowerCase().includes(search.toLowerCase()))

    const TeamMemberForm = () => (
        <form id="team-member-form" onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name *</Label>
                    <Input name="name" defaultValue={editingMember?.data.name} required className="h-12 rounded-xl" placeholder="e.g. John Smith" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Role *</Label>
                    <Input name="role" defaultValue={editingMember?.data.role} required className="h-12 rounded-xl" placeholder="e.g. Senior Consultant" />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Team Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="core">Leadership Partner</SelectItem>
                        <SelectItem value="associates">Associate Team</SelectItem>
                    </SelectContent>
                </Select>
                <input type="hidden" name="category" value={selectedCategory} />
            </div>

            <ImageUpload
                label="Profile Photo"
                value={imageUrl}
                onChange={setImageUrl}
                hint="Upload a professional headshot. Recommended: 400×400px or portrait."
            />

            {selectedCategory === "core" && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Experience Header</Label>
                            <Input name="expHeader" defaultValue={editingMember?.data.expHeader} placeholder="e.g. 17+ YEARS OF LEADERSHIP" className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Years Exp</Label>
                            <Input name="yearsExp" defaultValue={editingMember?.data.yearsExp} placeholder="e.g. 17+" className="h-12 rounded-xl" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Qualification</Label>
                            <Input name="qualification" defaultValue={editingMember?.data.qualification} placeholder="e.g. FCCA" className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Qual Label</Label>
                            <Input name="qualLabel" defaultValue={editingMember?.data.qualLabel} placeholder="e.g. QUALIFIED" className="h-12 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Bio</Label>
                        <Textarea name="bio" defaultValue={editingMember?.data.bio} className="rounded-xl min-h-[80px] resize-none" placeholder="Short professional biography..." />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                        <Input name="email" type="email" defaultValue={editingMember?.data.email} className="h-12 rounded-xl" placeholder="name@meritadvisory.so" />
                    </div>
                </>
            )}
        </form>
    )

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Team Directory</h1>
                    <p className="text-slate-500 font-medium">Manage leadership partners and associate consultants.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => { setLoading(true); fetchData() }}
                        className="h-10 w-10 border-slate-200 rounded-xl"
                        title="Refresh"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>

                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) { setEditingMember(null); setImageUrl("") }
                    }}>
                        <DialogTrigger asChild>
                            <Button className="h-12 bg-[#e31e24] hover:bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-red-500/20">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Team Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Fixed header */}
                            <DialogHeader className="px-10 pt-10 pb-0 shrink-0 flex items-center justify-between">
                                <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                    {editingMember ? "Edit Profile" : "New Team Profile"}
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

                            {/* Scrollable body */}
                            <div className="overflow-y-auto flex-1 px-10 py-6">
                                <TeamMemberForm />
                            </div>

                            {/* Fixed footer — Save button always visible */}
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
                                    form="team-member-form"
                                    disabled={saving} 
                                    className="bg-[#e31e24] hover:bg-red-700 text-white rounded-xl px-10 font-bold min-w-[160px]"
                                >
                                    {saving ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</>
                                    ) : (
                                        <><CheckCircle2 className="h-4 w-4 mr-2" />{editingMember ? "Update & Publish" : "Save & Publish"}</>
                                    )}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Tabs defaultValue="core" onValueChange={setActiveTab} className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <TabsList className="bg-slate-100 p-1 rounded-2xl">
                        <TabsTrigger value="core" className="rounded-xl px-6 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#e31e24] data-[state=active]:shadow-sm">
                            Leadership Partners
                            <Badge className="ml-2 bg-[#e31e24]/10 text-[#e31e24] border-none text-[9px] font-black px-1.5">{coreTeam.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="associates" className="rounded-xl px-6 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#e31e24] data-[state=active]:shadow-sm">
                            Associate Team
                            <Badge className="ml-2 bg-[#e31e24]/10 text-[#e31e24] border-none text-[9px] font-black px-1.5">{otherTeam.length}</Badge>
                        </TabsTrigger>
                    </TabsList>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Search directory..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-11 h-12 rounded-xl bg-white border-slate-200 pr-10"
                        />
                        {search && (
                            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                <TabsContent value="core" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? [1, 2].map(i => <Card key={i} className="h-36 animate-pulse bg-slate-50/50 rounded-[2.5rem]" />) : 
                    filteredCore.length === 0 ? (
                        <Card className="col-span-full py-24 text-center border-dashed border-2 border-slate-100 rounded-[2.5rem]">
                            <Users className="h-10 w-10 mx-auto mb-3 opacity-20 text-slate-400" />
                            <p className="font-black uppercase text-xs tracking-widest text-slate-400">
                                {search ? "No members match your search" : "No leadership partners yet"}
                            </p>
                        </Card>
                    ) : filteredCore.map((member, i) => (
                        <Card key={member.name + i} className="p-6 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-red-500/5 transition-all">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-5 min-w-0">
                                    <div className="h-20 w-20 shrink-0 rounded-[1.5rem] overflow-hidden shadow-lg border-4 border-white bg-slate-100 group-hover:rotate-[-2deg] transition-transform">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-slate-200">
                                                <span className="text-2xl font-black text-slate-400">{member.name[0]}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-black text-slate-900 group-hover:text-[#e31e24] transition-colors tracking-tight truncate">{member.name}</h3>
                                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 truncate">{member.role}</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {member.qualification && (
                                                <Badge className="bg-slate-50 text-slate-500 border-slate-200 text-[8px] font-black tracking-tight">{member.qualification}</Badge>
                                            )}
                                            {member.yearsExp && (
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{member.yearsExp} Exp</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 shrink-0">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-9 w-9 rounded-xl hover:bg-slate-100 transition-all"
                                        onClick={() => {
                                            setEditingMember({data: member, index: i, category: "core"})
                                            setIsDialogOpen(true)
                                        }}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-9 w-9 rounded-xl hover:bg-red-50 text-red-500 transition-all"
                                        onClick={() => handleDelete(i, "core")}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="associates" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? [1, 2, 3].map(i => <Card key={i} className="h-24 animate-pulse bg-slate-50/50 rounded-[2rem]" />) : 
                    filteredOther.length === 0 ? (
                        <Card className="col-span-full py-24 text-center border-dashed border-2 border-slate-100 rounded-[2.5rem]">
                            <Users className="h-10 w-10 mx-auto mb-3 opacity-20 text-slate-400" />
                            <p className="font-black uppercase text-xs tracking-widest text-slate-400">
                                {search ? "No members match your search" : "No associate team members yet"}
                            </p>
                        </Card>
                    ) : filteredOther.map((member, i) => (
                        <Card key={member.name + i} className="p-5 border-none shadow-xl shadow-slate-200/50 rounded-[2rem] group hover:shadow-2xl hover:shadow-blue-500/5 transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="h-14 w-14 shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-slate-100">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-slate-200">
                                                <span className="text-lg font-black text-slate-400">{member.name[0]}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-black text-slate-900 group-hover:text-[#1e4e8c] transition-colors tracking-tight truncate">{member.name}</h3>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{member.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-lg hover:bg-slate-100"
                                        onClick={() => {
                                            setEditingMember({data: member, index: i, category: "associates"})
                                            setIsDialogOpen(true)
                                        }}
                                    >
                                        <Edit2 className="h-3 w-3" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-50"
                                        onClick={() => handleDelete(i, "associates")}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}
