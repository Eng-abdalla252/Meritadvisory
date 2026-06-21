"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Trash2, 
    Edit, 
    Save,
    Loader2,
    DollarSign,
    Package,
    Tag,
    ToggleLeft,
    ToggleRight,
    ArrowLeft
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
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface BlueprintService {
    id: string
    name: string
    category: string
    description: string
    price: number
    currency: string
    status: 'active' | 'inactive'
    createdAt: string
    updatedAt?: string
}

export default function BlueprintServicesAdmin() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [services, setServices] = React.useState<BlueprintService[]>([])
    const [selectedService, setSelectedService] = React.useState<BlueprintService | null>(null)
    const [isEditing, setIsEditing] = React.useState(false)
    
    const [newService, setNewService] = React.useState({
        name: '',
        category: 'Management System',
        description: '',
        price: '',
        currency: 'USD',
        status: 'active' as const
    })

    const fetchServices = async () => {
        try {
            const res = await fetch("/api/admin/data-api?type=blueprint-services")
            const data = await res.json()
            if (Array.isArray(data)) {
                setServices(data)
            }
        } catch (error) {
            toast.error("Failed to fetch blueprint services")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) {
            router.push("/admin/login")
        } else {
            fetchServices()
        }
    }, [router])

    const handleCreateService = async () => {
        if (!newService.name || !newService.price) {
            toast.error("Service name and price are required")
            return
        }
        
        setSaving(true)
        try {
            const token = localStorage.getItem("admin_token")
            const serviceData: BlueprintService = {
                id: `bp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: newService.name,
                category: newService.category,
                description: newService.description,
                price: parseFloat(newService.price),
                currency: newService.currency,
                status: newService.status,
                createdAt: new Date().toISOString()
            }
            
            const updatedServices = [...services, serviceData]
            const res = await fetch("/api/admin/data-api?type=blueprint-services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedServices)
            })
            
            if (res.ok) {
                setServices(updatedServices)
                setSelectedService(serviceData)
                setIsEditing(true)
                setNewService({ name: '', category: 'Management System', description: '', price: '', currency: 'USD', status: 'active' })
                toast.success("Blueprint service created successfully")
            }
        } catch (error) {
            toast.error("Failed to create service")
        } finally {
            setSaving(false)
        }
    }

    const handleSaveService = async () => {
        if (!selectedService) return
        
        setSaving(true)
        try {
            const token = localStorage.getItem("admin_token")
            const updatedService = {
                ...selectedService,
                updatedAt: new Date().toISOString()
            }
            
            const updatedServices = services.map(s => s.id === selectedService.id ? updatedService : s)
            
            const res = await fetch("/api/admin/data-api?type=blueprint-services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedServices)
            })
            
            if (res.ok) {
                setServices(updatedServices)
                toast.success("Service saved successfully")
            }
        } catch (error) {
            toast.error("Failed to save service")
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteService = async (serviceId: string) => {
        if (!confirm("Are you sure you want to delete this blueprint service?")) return
        
        try {
            const token = localStorage.getItem("admin_token")
            const updatedServices = services.filter(s => s.id !== serviceId)
            
            const res = await fetch("/api/admin/data-api?type=blueprint-services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedServices)
            })
            
            if (res.ok) {
                setServices(updatedServices)
                if (selectedService?.id === serviceId) {
                    setSelectedService(null)
                    setIsEditing(false)
                }
                toast.success("Service deleted successfully")
            }
        } catch (error) {
            toast.error("Failed to delete service")
        }
    }

    const handleToggleStatus = async (serviceId: string) => {
        try {
            const token = localStorage.getItem("admin_token")
            const updatedServices = services.map(s => 
                s.id === serviceId 
                    ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' as const }
                    : s
            )
            
            const res = await fetch("/api/admin/data-api?type=blueprint-services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedServices)
            })
            
            if (res.ok) {
                setServices(updatedServices)
                toast.success("Service status updated")
            }
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/admin")}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Admin
                    </Button>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">
                        Blueprint Services
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Manage blueprint services with pricing for project questionnaires
                    </p>
                </div>
                {!isEditing && (
                    <Button 
                        onClick={() => setIsEditing(true)}
                        className="h-14 rounded-xl bg-[#b22222] text-white font-black uppercase tracking-widest hover:bg-[#8b1818] transition-colors"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Service
                    </Button>
                )}
            </div>

            {isEditing ? (
                /* Service Editor */
                <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-white">
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Package className="h-5 w-5 text-[#b22222]" />
                        {selectedService ? 'Edit Blueprint Service' : 'Add New Blueprint Service'}
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Service Name *
                                </Label>
                                <Input
                                    value={selectedService ? selectedService.name : newService.name}
                                    onChange={(e) => selectedService 
                                        ? setSelectedService({ ...selectedService, name: e.target.value })
                                        : setNewService({ ...newService, name: e.target.value })
                                    }
                                    placeholder="e.g., ERP Implementation"
                                    className="h-12 rounded-xl"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Category *
                                </Label>
                                <Select 
                                    value={selectedService ? selectedService.category : newService.category}
                                    onValueChange={(value) => selectedService 
                                        ? setSelectedService({ ...selectedService, category: value })
                                        : setNewService({ ...newService, category: value })
                                    }
                                >
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Management System">Management System</SelectItem>
                                        <SelectItem value="Accounting">Accounting</SelectItem>
                                        <SelectItem value="Audit">Audit</SelectItem>
                                        <SelectItem value="Training">Training</SelectItem>
                                        <SelectItem value="Consulting">Consulting</SelectItem>
                                        <SelectItem value="Technology">Technology</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Price *
                                </Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="number"
                                        value={selectedService ? selectedService.price : newService.price}
                                        onChange={(e) => selectedService 
                                            ? setSelectedService({ ...selectedService, price: parseFloat(e.target.value) || 0 })
                                            : setNewService({ ...newService, price: e.target.value })
                                        }
                                        placeholder="5000"
                                        className="h-12 rounded-xl pl-10"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Currency *
                                </Label>
                                <Select 
                                    value={selectedService ? selectedService.currency : newService.currency}
                                    onValueChange={(value) => selectedService 
                                        ? setSelectedService({ ...selectedService, currency: value })
                                        : setNewService({ ...newService, currency: value })
                                    }
                                >
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD ($)</SelectItem>
                                        <SelectItem value="EUR">EUR (€)</SelectItem>
                                        <SelectItem value="GBP">GBP (£)</SelectItem>
                                        <SelectItem value="SOS">SOS (Sh)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                Description
                            </Label>
                            <Textarea
                                value={selectedService ? selectedService.description : newService.description}
                                onChange={(e) => selectedService 
                                    ? setSelectedService({ ...selectedService, description: e.target.value })
                                    : setNewService({ ...newService, description: e.target.value })
                                }
                                placeholder="Describe the blueprint service..."
                                rows={3}
                                className="rounded-xl"
                            />
                        </div>
                        
                        {selectedService && (
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Status
                                    </Label>
                                    <p className="text-sm text-slate-600 mt-1">
                                        {selectedService.status === 'active' ? 'Active - Available for selection' : 'Inactive - Hidden from users'}
                                    </p>
                                </div>
                                <Switch
                                    checked={selectedService.status === 'active'}
                                    onCheckedChange={(checked) => {
                                        setSelectedService({ 
                                            ...selectedService, 
                                            status: checked ? 'active' : 'inactive' 
                                        })
                                    }}
                                />
                            </div>
                        )}
                        
                        <div className="flex items-center gap-4 pt-4">
                            {selectedService ? (
                                <Button
                                    onClick={handleSaveService}
                                    disabled={saving}
                                    className="flex-1 h-12 rounded-xl bg-[#b22222] text-white font-black uppercase tracking-widest hover:bg-[#8b1818] transition-colors"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleCreateService}
                                    disabled={saving}
                                    className="flex-1 h-12 rounded-xl bg-[#b22222] text-white font-black uppercase tracking-widest hover:bg-[#8b1818] transition-colors"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Service
                                        </>
                                    )}
                                </Button>
                            )}
                            
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsEditing(false)
                                    setSelectedService(null)
                                    setNewService({ name: '', category: 'Management System', description: '', price: '', currency: 'USD', status: 'active' })
                                }}
                                className="h-12 rounded-xl font-black uppercase tracking-widest"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : (
                /* Services List */
                <div className="space-y-4">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <Card key={i} className="h-24 animate-pulse bg-white border-none rounded-2xl shadow-sm" />
                        ))
                    ) : services.length === 0 ? (
                        <Card className="py-24 text-center border-dashed border-2 border-slate-200 bg-white rounded-[2rem]">
                            <div className="flex flex-col items-center gap-4 text-slate-300">
                                <Package className="h-16 w-16 opacity-20" />
                                <p className="font-black uppercase text-xs tracking-widest">No blueprint services created yet</p>
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="h-12 rounded-xl bg-[#b22222] text-white font-black uppercase tracking-widest hover:bg-[#8b1818] transition-colors"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Service
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        services.map((service) => (
                            <Card 
                                key={service.id}
                                className="p-6 border-none shadow-sm hover:shadow-md transition-all rounded-2xl flex items-center justify-between"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                                        <Package className="h-6 w-6 text-slate-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900">{service.name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                            <Badge className="bg-slate-100 text-slate-600 border-none font-black text-[10px] uppercase">
                                                {service.category}
                                            </Badge>
                                            <Badge className="bg-green-100 text-green-600 border-none font-black text-[10px] uppercase">
                                                {service.currency} {service.price.toLocaleString()}
                                            </Badge>
                                            <span className={service.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                                                {service.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl hover:bg-slate-100"
                                        onClick={() => handleToggleStatus(service.id)}
                                    >
                                        {service.status === 'active' ? (
                                            <ToggleRight className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <ToggleLeft className="h-4 w-4 text-slate-400" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl hover:bg-slate-100"
                                        onClick={() => {
                                            setSelectedService(service)
                                            setIsEditing(true)
                                        }}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500"
                                        onClick={() => handleDeleteService(service.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
