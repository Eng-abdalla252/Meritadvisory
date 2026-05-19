"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Users, 
    Shield,
    Save,
    Loader2,
    Image as ImageIcon
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
    const [editingMember, setEditingMember] = React.useState<{data: TeamMember, index: number} | null>(null)
    
    // Image State
    const [imageUrl, setImageUrl] = React.useState("")

    React.useEffect(() => {
        if (editingMember) {
            setImageUrl(editingMember.data.image)
        } else {
            setImageUrl("")
        }
    }, [editingMember, isDialogOpen])

    const fetchData = async () => {
        try {
            const [resCore, resOther] = await Promise.all([
                fetch("/api/admin/data?type=team"),
                fetch("/api/admin/data?type=other-team")
            ])
            const core = await resCore.json()
            const other = await resOther.json()
            setCoreTeam(core)
            setOtherTeam(other)
        } catch (error) {
            console.error("Failed to fetch team data")
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
        const memberData: TeamMember = {
            name: formData.get("name") as string,
            role: formData.get("role") as string,
            image: imageUrl,
            expHeader: formData.get("expHeader") as string,
            yearsExp: formData.get("yearsExp") as string,
            qualification: formData.get("qualification") as string,
            qualLabel: formData.get("qualLabel") as string,
            bio: formData.get("bio") as string,
            email: formData.get("email") as string,
        }

        let updatedList = activeTab === "core" ? [...coreTeam] : [...otherTeam]
        
        if (editingMember) {
            updatedList[editingMember.index] = memberData
        } else {
            updatedList = [memberData, ...updatedList]
        }

        try {
            const res = await fetch(`/api/admin/data?type=${activeTab === "core" ? "team" : "other-team"}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedList)
            })
            if (res.ok) {
                if (activeTab === "core") setCoreTeam(updatedList)
                else setOtherTeam(updatedList)
                setIsDialogOpen(false)
                setEditingMember(null)
            }
        } catch (error) {
            console.error("Failed to save team member")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to remove this member?")) return
        
        const updatedList = (activeTab === "core" ? [...coreTeam] : [...otherTeam]).filter((_, i) => i !== index)
        try {
            const res = await fetch(`/api/admin/data?type=${activeTab === "core" ? "team" : "other-team"}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedList)
            })
            if (res.ok) {
                if (activeTab === "core") setCoreTeam(updatedList)
                else setOtherTeam(updatedList)
            }
        } catch (error) {
            console.error("Failed to delete team member")
        }
    }

    const filteredCore = coreTeam.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    const filteredOther = otherTeam.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Team Directory</h1>
                    <p className="text-slate-500 font-medium">Manage leadership partners and associate consultants.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) setEditingMember(null)
                }}>
                    <DialogTrigger asChild>
                        <Button className="h-14 bg-[#e31e24] hover:bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-red-500/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Team Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingMember ? "Edit Profile" : "New Team Profile"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 mt-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                                    <Input name="name" defaultValue={editingMember?.data.name} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Role</Label>
                                    <Input name="role" defaultValue={editingMember?.data.role} required className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Image URL</Label>
                                <Input name="image" defaultValue={editingMember?.data.image} required className="h-12 rounded-xl" />
                            </div>

                            {activeTab === "core" && (
                                <>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Experience Header</Label>
                                            <Input name="expHeader" defaultValue={editingMember?.data.expHeader} placeholder="e.g. 17+ YEARS OF LEADERSHIP" className="h-12 rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Years Exp</Label>
                                            <Input name="yearsExp" defaultValue={editingMember?.data.yearsExp} placeholder="e.g. 17+" className="h-12 rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
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
                                        <Textarea name="bio" defaultValue={editingMember?.data.bio} className="rounded-xl min-h-[100px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                                        <Input name="email" type="email" defaultValue={editingMember?.data.email} className="h-12 rounded-xl" />
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end gap-4 pt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                                <Button type="submit" disabled={saving} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 font-bold">
                                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Save Profile
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs defaultValue="core" onValueChange={setActiveTab} className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <TabsList className="bg-slate-100 p-1 rounded-2xl">
                        <TabsTrigger value="core" className="rounded-xl px-6 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#e31e24] data-[state=active]:shadow-sm">
                            Leadership Partners
                        </TabsTrigger>
                        <TabsTrigger value="associates" className="rounded-xl px-6 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#e31e24] data-[state=active]:shadow-sm">
                            Associate Team
                        </TabsTrigger>
                    </TabsList>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Search directory..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-11 h-12 rounded-xl bg-white border-slate-200"
                        />
                    </div>
                </div>

                <TabsContent value="core" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? [1, 2].map(i => <Card key={i} className="h-48 animate-pulse bg-slate-50/50 rounded-[2.5rem]" />) : 
                    filteredCore.length === 0 ? (
                        <Card className="col-span-full py-24 text-center border-dashed border-2 border-slate-100 rounded-[2.5rem]">
                            <p className="font-black uppercase text-xs tracking-widest text-slate-400">No members found</p>
                        </Card>
                    ) : filteredCore.map((member, i) => (
                        <Card key={member.name} className="p-8 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-red-500/5 transition-all">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-6">
                                    <div className="h-24 w-24 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white group-hover:rotate-[-3deg] transition-transform">
                                        <img src={member.image} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-[#e31e24] transition-colors tracking-tight">{member.name}</h3>
                                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">{member.role}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-slate-50 text-slate-400 border-none text-[8px] font-black tracking-tighter">{member.qualification}</Badge>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{member.yearsExp} Exp</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-10 w-10 rounded-xl hover:bg-slate-100 transition-all"
                                        onClick={() => {
                                            setEditingMember({data: member, index: i})
                                            setIsDialogOpen(true)
                                        }}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500 transition-all"
                                        onClick={() => handleDelete(i)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="associates" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? [1, 2, 3].map(i => <Card key={i} className="h-32 animate-pulse bg-slate-50/50 rounded-[2rem]" />) : 
                    filteredOther.length === 0 ? (
                        <Card className="col-span-full py-24 text-center border-dashed border-2 border-slate-100 rounded-[2.5rem]">
                            <p className="font-black uppercase text-xs tracking-widest text-slate-400">No members found</p>
                        </Card>
                    ) : filteredOther.map((member, i) => (
                        <Card key={member.name} className="p-6 border-none shadow-xl shadow-slate-200/50 rounded-[2rem] group hover:shadow-2xl hover:shadow-blue-500/5 transition-all">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                                        <img src={member.image} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1">{member.name}</h3>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{member.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-lg"
                                        onClick={() => {
                                            setEditingMember({data: member, index: i})
                                            setIsDialogOpen(true)
                                        }}
                                    >
                                        <Edit2 className="h-3 w-3" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-lg text-red-500"
                                        onClick={() => handleDelete(i)}
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
