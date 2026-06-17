"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Trash2, 
    Edit, 
    Eye,
    Copy,
    Settings,
    LayoutDashboard,
    FileText,
    Save,
    Loader2,
    ArrowLeft,
    Type,
    Mail,
    Phone,
    Textarea,
    List,
    CheckSquare,
    Radio,
    Upload,
    Calendar
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

interface FormField {
    id: string
    type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date'
    label: string
    placeholder?: string
    required: boolean
    options?: string[]
    validation?: {
        min?: number
        max?: number
        pattern?: string
    }
}

interface DynamicForm {
    id: string
    name: string
    description: string
    category: string
    status: 'active' | 'inactive'
    fields: FormField[]
    createdAt: string
    updatedAt: string
}

export default function FormBuilderPage() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [forms, setForms] = React.useState<DynamicForm[]>([])
    const [selectedForm, setSelectedForm] = React.useState<DynamicForm | null>(null)
    const [isEditing, setIsEditing] = React.useState(false)
    const [showPreview, setShowPreview] = React.useState(false)
    
    // New form state
    const [newForm, setNewForm] = React.useState({
        name: '',
        description: '',
        category: 'general',
        status: 'active' as const
    })
    
    // New field state
    const [newField, setNewField] = React.useState({
        type: 'text' as FormField['type'],
        label: '',
        placeholder: '',
        required: false,
        options: ''
    })
    
    const fetchForms = async () => {
        try {
            const token = localStorage.getItem("admin_token")
            const res = await fetch("/api/admin/data-api?type=dynamic-forms")
            const data = await res.json()
            if (Array.isArray(data)) {
                setForms(data)
            }
        } catch (error) {
            toast.error("Failed to fetch forms")
        } finally {
            setLoading(false)
        }
    }
    
    React.useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) {
            router.push("/admin/login")
        } else {
            fetchForms()
        }
    }, [router])
    
    const handleCreateForm = async () => {
        if (!newForm.name) {
            toast.error("Form name is required")
            return
        }
        
        setSaving(true)
        try {
            const token = localStorage.getItem("admin_token")
            const formData: DynamicForm = {
                id: `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: newForm.name,
                description: newForm.description,
                category: newForm.category,
                status: newForm.status,
                fields: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            
            const updatedForms = [...forms, formData]
            const res = await fetch("/api/admin/data-api?type=dynamic-forms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedForms)
            })
            
            if (res.ok) {
                setForms(updatedForms)
                setSelectedForm(formData)
                setIsEditing(true)
                setNewForm({ name: '', description: '', category: 'general', status: 'active' })
                toast.success("Form created successfully")
            }
        } catch (error) {
            toast.error("Failed to create form")
        } finally {
            setSaving(false)
        }
    }
    
    const handleAddField = () => {
        if (!selectedForm || !newField.label) {
            toast.error("Field label is required")
            return
        }
        
        const field: FormField = {
            id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: newField.type,
            label: newField.label,
            placeholder: newField.placeholder,
            required: newField.required,
            options: newField.type === 'select' || newField.type === 'checkbox' || newField.type === 'radio' 
                ? newField.options.split(',').map(o => o.trim()) 
                : undefined
        }
        
        const updatedForm = {
            ...selectedForm,
            fields: [...selectedForm.fields, field],
            updatedAt: new Date().toISOString()
        }
        
        setSelectedForm(updatedForm)
        setNewField({ type: 'text', label: '', placeholder: '', required: false, options: '' })
        toast.success("Field added successfully")
    }
    
    const handleRemoveField = (fieldId: string) => {
        if (!selectedForm) return
        
        const updatedForm = {
            ...selectedForm,
            fields: selectedForm.fields.filter(f => f.id !== fieldId),
            updatedAt: new Date().toISOString()
        }
        
        setSelectedForm(updatedForm)
    }
    
    const handleSaveForm = async () => {
        if (!selectedForm) return
        
        setSaving(true)
        try {
            const token = localStorage.getItem("admin_token")
            const updatedForms = forms.map(f => f.id === selectedForm.id ? selectedForm : f)
            
            const res = await fetch("/api/admin/data-api?type=dynamic-forms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedForms)
            })
            
            if (res.ok) {
                setForms(updatedForms)
                toast.success("Form saved successfully")
            }
        } catch (error) {
            toast.error("Failed to save form")
        } finally {
            setSaving(false)
        }
    }
    
    const handleDeleteForm = async (formId: string) => {
        if (!confirm("Are you sure you want to delete this form?")) return
        
        try {
            const token = localStorage.getItem("admin_token")
            const updatedForms = forms.filter(f => f.id !== formId)
            
            const res = await fetch("/api/admin/data-api?type=dynamic-forms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `admin_token=${token}`
                },
                body: JSON.stringify(updatedForms)
            })
            
            if (res.ok) {
                setForms(updatedForms)
                if (selectedForm?.id === formId) {
                    setSelectedForm(null)
                    setIsEditing(false)
                }
                toast.success("Form deleted successfully")
            }
        } catch (error) {
            toast.error("Failed to delete form")
        }
    }
    
    const getFieldTypeIcon = (type: FormField['type']) => {
        switch (type) {
            case 'text': return <Type className="h-4 w-4" />
            case 'email': return <Mail className="h-4 w-4" />
            case 'phone': return <Phone className="h-4 w-4" />
            case 'textarea': return <Textarea className="h-4 w-4" />
            case 'select': return <List className="h-4 w-4" />
            case 'checkbox': return <CheckSquare className="h-4 w-4" />
            case 'radio': return <Radio className="h-4 w-4" />
            case 'file': return <Upload className="h-4 w-4" />
            case 'date': return <Calendar className="h-4 w-4" />
        }
    }
    
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">
                        Dynamic Form Builder
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Create and manage custom forms for your website
                    </p>
                </div>
                {!isEditing && (
                    <Button 
                        onClick={() => setIsEditing(true)}
                        className="h-14 rounded-xl bg-[#b22222] text-white font-black uppercase tracking-widest hover:bg-[#8b1818] transition-colors"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Create Form
                    </Button>
                )}
            </div>
            
            {isEditing && selectedForm ? (
                /* Form Editor */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Settings */}
                    <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-white">
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Settings className="h-5 w-5 text-[#b22222]" />
                            Form Settings
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Form Name *
                                </Label>
                                <Input
                                    value={selectedForm.name}
                                    onChange={(e) => setSelectedForm({ ...selectedForm, name: e.target.value })}
                                    className="h-12 rounded-xl"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Description
                                </Label>
                                <Textarea
                                    value={selectedForm.description}
                                    onChange={(e) => setSelectedForm({ ...selectedForm, description: e.target.value })}
                                    rows={3}
                                    className="rounded-xl"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Category
                                </Label>
                                <Select 
                                    value={selectedForm.category}
                                    onValueChange={(value) => setSelectedForm({ ...selectedForm, category: value })}
                                >
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">General</SelectItem>
                                        <SelectItem value="contact">Contact</SelectItem>
                                        <SelectItem value="recruitment">Recruitment</SelectItem>
                                        <SelectItem value="support">Support</SelectItem>
                                        <SelectItem value="survey">Survey</SelectItem>
                                        <SelectItem value="feedback">Feedback</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Status
                                </Label>
                                <Switch
                                    checked={selectedForm.status === 'active'}
                                    onCheckedChange={(checked) => setSelectedForm({ 
                                        ...selectedForm, 
                                        status: checked ? 'active' : 'inactive' 
                                    })}
                                />
                            </div>
                            
                            <div className="flex items-center gap-4 pt-4">
                                <Button
                                    onClick={handleSaveForm}
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
                                            Save Form
                                        </>
                                    )}
                                </Button>
                                
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditing(false)
                                        setSelectedForm(null)
                                    }}
                                    className="h-12 rounded-xl font-black uppercase tracking-widest"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Card>
                    
                    {/* Field Builder */}
                    <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-white">
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5 text-[#b22222]" />
                            Add Fields
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Field Type *
                                </Label>
                                <Select 
                                    value={newField.type}
                                    onValueChange={(value) => setNewField({ ...newField, type: value as FormField['type'] })}
                                >
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">Text Input</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="phone">Phone</SelectItem>
                                        <SelectItem value="textarea">Text Area</SelectItem>
                                        <SelectItem value="select">Dropdown</SelectItem>
                                        <SelectItem value="checkbox">Checkbox</SelectItem>
                                        <SelectItem value="radio">Radio Buttons</SelectItem>
                                        <SelectItem value="file">File Upload</SelectItem>
                                        <SelectItem value="date">Date Picker</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Field Label *
                                </Label>
                                <Input
                                    value={newField.label}
                                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                                    placeholder="e.g., Full Name"
                                    className="h-12 rounded-xl"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Placeholder
                                </Label>
                                <Input
                                    value={newField.placeholder}
                                    onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                                    placeholder="e.g., Enter your name"
                                    className="h-12 rounded-xl"
                                />
                            </div>
                            
                            {(newField.type === 'select' || newField.type === 'checkbox' || newField.type === 'radio') && (
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Options (comma-separated)
                                    </Label>
                                    <Input
                                        value={newField.options}
                                        onChange={(e) => setNewField({ ...newField, options: e.target.value })}
                                        placeholder="e.g., Option 1, Option 2, Option 3"
                                        className="h-12 rounded-xl"
                                    />
                                </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Required Field
                                </Label>
                                <Switch
                                    checked={newField.required}
                                    onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                                />
                            </div>
                            
                            <Button
                                onClick={handleAddField}
                                className="w-full h-12 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Field
                            </Button>
                        </div>
                    </Card>
                </div>
            ) : (
                /* Forms List */
                <div className="space-y-4">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <Card key={i} className="h-24 animate-pulse bg-white border-none rounded-2xl shadow-sm" />
                        ))
                    ) : forms.length === 0 ? (
                        <Card className="py-24 text-center border-dashed border-2 border-slate-200 bg-white rounded-[2rem]">
                            <div className="flex flex-col items-center gap-4 text-slate-300">
                                <FileText className="h-16 w-16 opacity-20" />
                                <p className="font-black uppercase text-xs tracking-widest">No forms created yet</p>
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="h-12 rounded-xl bg-[#b22222] text-white font-black uppercase tracking-widest hover:bg-[#8b1818] transition-colors"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Form
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        forms.map((form) => (
                            <Card 
                                key={form.id}
                                className="p-6 border-none shadow-sm hover:shadow-md transition-all rounded-2xl flex items-center justify-between"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-slate-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900">{form.name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                            <Badge className="bg-slate-100 text-slate-600 border-none font-black text-[10px] uppercase">
                                                {form.category}
                                            </Badge>
                                            <span>{form.fields.length} fields</span>
                                            <span>{new Date(form.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl hover:bg-slate-100"
                                        onClick={() => {
                                            setSelectedForm(form)
                                            setIsEditing(true)
                                        }}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500"
                                        onClick={() => handleDeleteForm(form.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
            
            {/* Form Fields List (when editing) */}
            {isEditing && selectedForm && selectedForm.fields.length > 0 && (
                <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-white">
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <LayoutDashboard className="h-5 w-5 text-[#b22222]" />
                        Form Fields ({selectedForm.fields.length})
                    </h2>
                    
                    <div className="space-y-3">
                        {selectedForm.fields.map((field) => (
                            <div 
                                key={field.id}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                        {getFieldTypeIcon(field.type)}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{field.label}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                            <span className="font-black uppercase">{field.type}</span>
                                            {field.required && <Badge className="bg-red-100 text-red-600 border-none font-black text-[10px] uppercase">Required</Badge>}
                                        </div>
                                    </div>
                                </div>
                                
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg hover:bg-red-50 text-red-500"
                                    onClick={() => handleRemoveField(field.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    )
}
