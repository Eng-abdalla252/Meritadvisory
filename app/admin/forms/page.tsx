"use client"

import * as React from "react"
import { toast } from "sonner"
import {
    Plus,
    Trash2,
    Edit3,
    Save,
    X,
    ChevronDown,
    ChevronUp,
    GripVertical,
    ClipboardCheck,
    Eye,
    FileText,
    ToggleLeft,
    ToggleRight,
    Loader2,
    RefreshCw,
    Settings2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

// ─── Types ────────────────────────────────────────────────────────────────

interface FormField {
    id: string
    label: string
    type: "text" | "email" | "phone" | "textarea" | "select" | "file" | "checkbox"
    placeholder?: string
    required?: boolean
    options?: string[]
    order?: number
}

interface FormSchema {
    id: string
    title: string
    description?: string
    submitButtonText?: string
    successMessage?: string
    fields: FormField[]
}

const FIELD_TYPES = [
    { value: "text", label: "Text Input" },
    { value: "email", label: "Email Address" },
    { value: "phone", label: "Phone Number" },
    { value: "textarea", label: "Long Text (Textarea)" },
    { value: "select", label: "Dropdown Select" },
    { value: "file", label: "File Upload" },
]

// ─── Main Page ────────────────────────────────────────────────────────────

export default function FormsAdminPage() {
    const router = useRouter()
    const [forms, setForms] = React.useState<FormSchema[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [selectedForm, setSelectedForm] = React.useState<FormSchema | null>(null)
    const [editingField, setEditingField] = React.useState<FormField | null>(null)
    const [isFieldDialogOpen, setIsFieldDialogOpen] = React.useState(false)
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
    const [newOptionsText, setNewOptionsText] = React.useState("")

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) { router.push("/admin/login"); return }
        fetchForms()
    }, [router])

    const fetchForms = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/admin/data-api?type=forms")
            const data = await res.json()
            setForms(Array.isArray(data) ? data : [])
            if (data.length > 0 && !selectedForm) setSelectedForm(data[0])
        } catch {
            toast.error("Failed to load forms")
        } finally {
            setLoading(false)
        }
    }

    const saveForms = async (updated: FormSchema[]) => {
        setSaving(true)
        try {
            await fetch("/api/admin/data-api?type=forms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            })
            setForms(updated)
            toast.success("Forms saved successfully")
        } catch {
            toast.error("Failed to save forms")
        } finally {
            setSaving(false)
        }
    }

    const updateSelected = (updates: Partial<FormSchema>) => {
        if (!selectedForm) return
        const updated = { ...selectedForm, ...updates }
        setSelectedForm(updated)
        setForms(forms.map(f => f.id === updated.id ? updated : f))
    }

    const saveAll = () => {
        if (!selectedForm) return
        const updated = forms.map(f => f.id === selectedForm.id ? selectedForm : f)
        saveForms(updated)
    }

    // ── Field Management ────────────────────────────────────────────────────

    const openNewField = () => {
        setEditingField({
            id: `field_${Date.now()}`,
            label: "",
            type: "text",
            placeholder: "",
            required: false,
            order: (selectedForm?.fields.length || 0) + 1
        })
        setNewOptionsText("")
        setIsFieldDialogOpen(true)
    }

    const openEditField = (field: FormField) => {
        setEditingField({ ...field })
        setNewOptionsText((field.options || []).join("\n"))
        setIsFieldDialogOpen(true)
    }

    const saveField = () => {
        if (!editingField || !selectedForm) return
        if (!editingField.label.trim()) {
            toast.error("Field label is required")
            return
        }

        const parsedOptions = editingField.type === "select"
            ? newOptionsText.split("\n").map(s => s.trim()).filter(Boolean)
            : undefined

        const fieldToSave: FormField = { ...editingField, options: parsedOptions }

        const existingIdx = selectedForm.fields.findIndex(f => f.id === fieldToSave.id)
        let updatedFields: FormField[]

        if (existingIdx >= 0) {
            updatedFields = selectedForm.fields.map(f => f.id === fieldToSave.id ? fieldToSave : f)
        } else {
            updatedFields = [...selectedForm.fields, fieldToSave]
        }

        updateSelected({ fields: updatedFields })
        setIsFieldDialogOpen(false)
        setEditingField(null)
    }

    const deleteField = (fieldId: string) => {
        if (!selectedForm) return
        updateSelected({ fields: selectedForm.fields.filter(f => f.id !== fieldId) })
        toast.success("Field removed")
    }

    const moveField = (fieldId: string, direction: "up" | "down") => {
        if (!selectedForm) return
        const fields = [...selectedForm.fields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        const idx = fields.findIndex(f => f.id === fieldId)
        if (direction === "up" && idx > 0) {
            [fields[idx - 1].order, fields[idx].order] = [fields[idx].order ?? idx, fields[idx - 1].order ?? idx - 1]
        } else if (direction === "down" && idx < fields.length - 1) {
            [fields[idx + 1].order, fields[idx].order] = [fields[idx].order ?? idx, fields[idx + 1].order ?? idx + 1]
        }
        updateSelected({ fields })
    }

    const sortedFields = React.useMemo(
        () => [...(selectedForm?.fields || [])].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
        [selectedForm?.fields]
    )

    // ─── Render ─────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-1">Form Builder</h1>
                    <p className="text-slate-500 font-medium">Edit and manage all website forms dynamically — no code required.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="h-12 rounded-2xl gap-2 font-bold border-slate-200"
                        onClick={fetchForms}
                    >
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </Button>
                    {selectedForm && (
                        <Button
                            variant="outline"
                            className="h-12 rounded-2xl gap-2 font-bold border-slate-200"
                            onClick={() => setIsPreviewOpen(true)}
                        >
                            <Eye className="h-4 w-4" />
                            Preview
                        </Button>
                    )}
                    <Button
                        className="h-12 rounded-2xl gap-2 font-black bg-[#b22222] hover:bg-[#921a1a] text-white border-none"
                        onClick={saveAll}
                        disabled={saving || !selectedForm}
                    >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Form Selector Sidebar */}
                <div className="lg:col-span-1 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 mb-2">Select Form</p>
                    {forms.map(form => (
                        <button
                            key={form.id}
                            onClick={() => setSelectedForm(form)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all text-sm font-bold ${
                                selectedForm?.id === form.id
                                    ? "bg-[#b22222] text-white border-[#b22222] shadow-lg shadow-red-200"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-[#b22222] hover:text-[#b22222]"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 shrink-0" />
                                <span className="truncate">{form.title}</span>
                            </div>
                            <p className={`text-[10px] mt-1 font-medium uppercase tracking-widest ${selectedForm?.id === form.id ? "text-white/60" : "text-slate-400"}`}>
                                {form.fields.length} fields
                            </p>
                        </button>
                    ))}
                </div>

                {/* Form Editor Main Panel */}
                <div className="lg:col-span-3 space-y-6">
                    {selectedForm ? (
                        <>
                            {/* Form Metadata */}
                            <Card className="p-8 rounded-[2rem] border-none shadow-sm bg-white space-y-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <Settings2 className="h-5 w-5 text-[#b22222]" />
                                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Form Settings</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Form Title</Label>
                                        <Input
                                            value={selectedForm.title}
                                            onChange={e => updateSelected({ title: e.target.value })}
                                            className="rounded-xl"
                                            placeholder="Form title shown to visitors"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Submit Button Text</Label>
                                        <Input
                                            value={selectedForm.submitButtonText || ""}
                                            onChange={e => updateSelected({ submitButtonText: e.target.value })}
                                            className="rounded-xl"
                                            placeholder="e.g. Send Message"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Description</Label>
                                    <Textarea
                                        value={selectedForm.description || ""}
                                        onChange={e => updateSelected({ description: e.target.value })}
                                        className="rounded-xl"
                                        rows={2}
                                        placeholder="Brief description of this form's purpose"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Success Message</Label>
                                    <Textarea
                                        value={selectedForm.successMessage || ""}
                                        onChange={e => updateSelected({ successMessage: e.target.value })}
                                        className="rounded-xl"
                                        rows={2}
                                        placeholder="Message shown to visitor after successful submission"
                                    />
                                </div>
                            </Card>

                            {/* Fields Editor */}
                            <Card className="p-8 rounded-[2rem] border-none shadow-sm bg-white">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <ClipboardCheck className="h-5 w-5 text-[#b22222]" />
                                        <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Form Fields</h3>
                                        <Badge className="bg-slate-100 text-slate-600 border-none font-black text-[10px]">
                                            {sortedFields.length} fields
                                        </Badge>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="rounded-full gap-1.5 font-bold bg-[#b22222] hover:bg-[#921a1a] text-white border-none"
                                        onClick={openNewField}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Field
                                    </Button>
                                </div>

                                {sortedFields.length === 0 ? (
                                    <div className="py-12 text-center text-slate-300 border-2 border-dashed rounded-2xl">
                                        <ClipboardCheck className="h-10 w-10 mx-auto mb-3 opacity-40" />
                                        <p className="font-black text-[10px] uppercase tracking-widest">No fields yet — add your first field above</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {sortedFields.map((field, idx) => (
                                            <div
                                                key={field.id}
                                                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group"
                                            >
                                                <GripVertical className="h-4 w-4 text-slate-300 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="font-bold text-slate-900 text-sm truncate">{field.label}</span>
                                                        {field.required && (
                                                            <span className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">Required</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[9px] uppercase tracking-widest">
                                                            {field.type}
                                                        </Badge>
                                                        {field.placeholder && (
                                                            <span className="text-[10px] text-slate-400 truncate">"{field.placeholder}"</span>
                                                        )}
                                                        {field.options && (
                                                            <span className="text-[10px] text-slate-400">{field.options.length} options</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-xl"
                                                        onClick={() => moveField(field.id, "up")}
                                                        disabled={idx === 0}
                                                    >
                                                        <ChevronUp className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-xl"
                                                        onClick={() => moveField(field.id, "down")}
                                                        disabled={idx === sortedFields.length - 1}
                                                    >
                                                        <ChevronDown className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-xl hover:bg-blue-50 hover:text-blue-600"
                                                        onClick={() => openEditField(field)}
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-xl hover:bg-red-50 hover:text-red-500"
                                                        onClick={() => deleteField(field.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </>
                    ) : (
                        <Card className="py-24 text-center border-dashed border-2 border-slate-200 bg-white rounded-[2rem]">
                            <ClipboardCheck className="h-12 w-12 mx-auto mb-4 text-slate-200" />
                            <p className="font-black text-slate-400 text-sm">Select a form from the left to begin editing</p>
                        </Card>
                    )}
                </div>
            </div>

            {/* Field Edit Dialog */}
            <Dialog open={isFieldDialogOpen} onOpenChange={setIsFieldDialogOpen}>
                <DialogContent className="sm:max-w-lg rounded-[2.5rem] p-10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900">
                            {editingField && selectedForm?.fields.some(f => f.id === editingField.id)
                                ? "Edit Field"
                                : "Add New Field"}
                        </DialogTitle>
                    </DialogHeader>

                    {editingField && (
                        <div className="space-y-4 mt-6">
                            <div>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Field Label *</Label>
                                <Input
                                    value={editingField.label}
                                    onChange={e => setEditingField({ ...editingField, label: e.target.value })}
                                    className="rounded-xl"
                                    placeholder="e.g. Full Name"
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Field Type</Label>
                                <select
                                    value={editingField.type}
                                    onChange={e => setEditingField({ ...editingField, type: e.target.value as FormField["type"] })}
                                    className="h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                                >
                                    {FIELD_TYPES.map(ft => (
                                        <option key={ft.value} value={ft.value}>{ft.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Placeholder Text</Label>
                                <Input
                                    value={editingField.placeholder || ""}
                                    onChange={e => setEditingField({ ...editingField, placeholder: e.target.value })}
                                    className="rounded-xl"
                                    placeholder="Hint shown inside the field"
                                />
                            </div>

                            {editingField.type === "select" && (
                                <div>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5 block">
                                        Options (one per line)
                                    </Label>
                                    <Textarea
                                        value={newOptionsText}
                                        onChange={e => setNewOptionsText(e.target.value)}
                                        rows={5}
                                        className="rounded-xl font-mono text-xs"
                                        placeholder={"Option 1\nOption 2\nOption 3"}
                                    />
                                </div>
                            )}

                            <div
                                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                                onClick={() => setEditingField({ ...editingField, required: !editingField.required })}
                            >
                                {editingField.required
                                    ? <ToggleRight className="h-5 w-5 text-[#b22222]" />
                                    : <ToggleLeft className="h-5 w-5 text-slate-400" />
                                }
                                <div>
                                    <p className="font-bold text-sm text-slate-900">Required Field</p>
                                    <p className="text-xs text-slate-400 font-medium">If enabled, submission will fail if this field is empty</p>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    className="flex-1 rounded-full font-bold bg-[#b22222] hover:bg-[#921a1a] text-white border-none"
                                    onClick={saveField}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Field
                                </Button>
                                <Button
                                    variant="outline"
                                    className="rounded-full font-bold border-slate-200"
                                    onClick={() => setIsFieldDialogOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Preview Dialog */}
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="sm:max-w-lg rounded-[2.5rem] p-10 overflow-y-auto max-h-[85vh]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900">
                            {selectedForm?.title} — Preview
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-6 space-y-5">
                        {selectedForm && sortedFields.map(field => (
                            <div key={field.id}>
                                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                                    {field.label}
                                    {field.required && <span className="ml-1 text-red-500">*</span>}
                                </label>
                                {field.type === "textarea" ? (
                                    <textarea
                                        placeholder={field.placeholder}
                                        rows={3}
                                        disabled
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-400"
                                    />
                                ) : field.type === "select" ? (
                                    <select disabled className="w-full rounded-xl border border-slate-200 bg-slate-50 h-10 px-3 text-sm text-slate-400">
                                        <option>{field.placeholder || "Select option"}</option>
                                        {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                ) : field.type === "file" ? (
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-300 text-sm bg-slate-50">
                                        Upload {field.label}
                                    </div>
                                ) : (
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        disabled
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 h-10 px-3 text-sm text-slate-400"
                                    />
                                )}
                            </div>
                        ))}
                        <button disabled className="w-full rounded-full bg-[#b22222] text-white py-3 font-bold opacity-60">
                            {selectedForm?.submitButtonText || "Submit"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
