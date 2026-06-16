"use client"

import * as React from "react"
import { Upload, X, ImageIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    label: string
    hint?: string
    folder?: string
    acceptVideo?: boolean
}

const MAX_SIZE_MB = 50
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp", "video/mp4", "video/webm", "video/ogg"]

export function ImageUpload({ value, onChange, label, hint, folder = "uploads", acceptVideo = false }: ImageUploadProps) {
    const [uploading, setUploading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState(false)
    const [isDragging, setIsDragging] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const processFile = async (file: File) => {
        setError("")
        setSuccess(false)

        // Validate type
        const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"]
        const videoTypes = ["video/mp4", "video/webm", "video/ogg"]
        const allowedTypes = acceptVideo ? [...imageTypes, ...videoTypes] : imageTypes
        
        if (!allowedTypes.includes(file.type)) {
            const formatList = acceptVideo ? "PNG, JPG, JPEG, SVG, WEBP, MP4, WebM, OGG" : "PNG, JPG, JPEG, SVG, WEBP"
            setError(`Invalid format. Use ${formatList}.`)
            return
        }

        // Validate size
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`File too large. Max size is ${MAX_SIZE_MB}MB.`)
            return
        }

        setUploading(true)

        // Try server upload first
        try {
            const token = localStorage.getItem("admin_token")
            const formData = new FormData()
            formData.append("file", file)
            formData.append("folder", folder)
            const res = await fetch("/api/media/upload", { 
                method: "POST", 
                headers: {
                    "Cookie": `admin_token=${token}`
                },
                body: formData,
                credentials: "include"
            })
            if (res.ok) {
                const data = await res.json()
                if (data.url) {
                    onChange(data.url)
                    setSuccess(true)
                    setUploading(false)
                    return
                }
            }
        } catch {
            // fall through to base64
        }

        // Base64 fallback
        const reader = new FileReader()
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                onChange(reader.result)
                setSuccess(true)
            }
            setUploading(false)
        }
        reader.onerror = () => {
            setError("Failed to read file. Please try again.")
            setUploading(false)
        }
        reader.readAsDataURL(file)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) processFile(file)
        // Reset input so the same file can be re-selected
        e.target.value = ""
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) processFile(file)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => setIsDragging(false)

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange("")
        setError("")
        setSuccess(false)
    }

    return (
        <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {label}
            </Label>

            {/* Drop Zone */}
            <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={[
                    "relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden",
                    isDragging
                        ? "border-[#e31e24] bg-red-50/50 scale-[1.01]"
                        : value
                        ? "border-slate-200 bg-slate-50/50 hover:border-[#e31e24]/50"
                        : "border-slate-200 hover:border-[#e31e24]/50 hover:bg-red-50/20",
                    uploading ? "pointer-events-none" : ""
                ].join(" ")}
            >
                {value ? (
                    /* Preview Mode */
                    <div className="flex items-center gap-4 p-3">
                        {/* Fixed-size thumbnail - never expands */}
                        <div className="relative shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
                            {value.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video
                                    src={value}
                                    className="h-full w-full object-cover"
                                    muted
                                />
                            ) : (
                                <img
                                    src={value}
                                    alt="Preview"
                                    className="h-full w-full object-contain p-1"
                                />
                            )}
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-0.5 right-0.5 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center shadow hover:bg-red-600 transition-colors"
                            >
                                <X className="h-2.5 w-2.5 text-white" />
                            </button>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-700 truncate">
                                {value.match(/\.(mp4|webm|ogg)$/i) ? "Video uploaded" : "Image uploaded"}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">
                                {value.startsWith("data:") ? "Base64 encoded file" : value}
                            </p>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                                className="mt-1.5 text-[10px] font-bold text-[#e31e24] hover:underline"
                            >
                                Change {value.match(/\.(mp4|webm|ogg)$/i) ? "video" : "image"}
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Upload Prompt */
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center gap-2">
                        {uploading ? (
                            <>
                                <Loader2 className="h-8 w-8 animate-spin text-[#e31e24]" />
                                <p className="text-xs font-bold text-slate-500">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                    <Upload className="h-5 w-5 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-600">
                                        <span className="text-[#e31e24]">Click to upload</span> or drag & drop
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                        {acceptVideo ? "PNG, JPG, JPEG, SVG, WEBP, MP4, WebM, OGG" : "PNG, JPG, JPEG, SVG, WEBP"} · Max {MAX_SIZE_MB}MB
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Status Messages */}
            {error && (
                <div className="flex items-center gap-1.5 text-red-500">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <p className="text-[10px] font-bold">{error}</p>
                </div>
            )}
            {success && !error && (
                <div className="flex items-center gap-1.5 text-green-500">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <p className="text-[10px] font-bold">Image uploaded successfully</p>
                </div>
            )}
            {hint && !error && !success && (
                <p className="text-[10px] text-slate-400">{hint}</p>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={acceptVideo ? ACCEPTED_TYPES.join(",") : "image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"}
                className="hidden"
            />
        </div>
    )
}
