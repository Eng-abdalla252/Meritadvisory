"use client"

import * as React from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    label: string
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [uploading, setUploading] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            if (data.url) {
                onChange(data.url)
            }
        } catch (error) {
            console.error("Upload failed")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</Label>
            <div className="flex items-center gap-4">
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 h-12 rounded-xl border-2 border-dashed border-slate-200 hover:border-red-500/50 hover:bg-red-50/30 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                >
                    {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                    ) : (
                        <>
                            <Upload className="h-4 w-4 text-slate-400 group-hover:text-[#e31e24]" />
                            <span className="text-xs font-bold text-slate-400 group-hover:text-[#e31e24]">
                                {value ? "Change Image" : "Upload Image"}
                            </span>
                        </>
                    )}
                </div>
                {value && (
                    <div className="h-12 w-12 rounded-xl overflow-hidden border border-slate-100 relative group">
                        <img src={value} alt="" className="h-full w-full object-cover" />
                        <button 
                            type="button"
                            onClick={() => onChange("")}
                            className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="h-3 w-3 text-white" />
                        </button>
                    </div>
                )}
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleUpload} 
                accept="image/*" 
                className="hidden" 
            />
            {value && <p className="text-[10px] font-medium text-slate-400 truncate">{value}</p>}
        </div>
    )
}
