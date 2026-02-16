"use client"

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Trash2, FolderOpen, ImageIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const FOLDERS = [
    { id: 'trusted-by-industry-leaders', name: 'Industry Partners' },
    { id: 'clients', name: 'Clients' },
    { id: 'projects', name: 'Case Studies / Projects' },
    { id: 'blog', name: 'Blog Content' },
    { id: 'team', name: 'Team Members' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'events', name: 'Events & Activities' },
]

export default function MediaAdminPage() {
    const [selectedFolder, setSelectedFolder] = useState(FOLDERS[0].id)
    const [files, setFiles] = useState<{ name: string; url: string }[]>([])
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const fetchFiles = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/media/list?folder=${selectedFolder}`)
            const data = await res.json()
            if (data.files) {
                setFiles(data.files)
            }
        } catch (error) {
            toast.error('Failed to load files')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFiles()
    }, [selectedFolder])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return

        setUploading(true)
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', selectedFolder)

        try {
            const res = await fetch('/api/media/upload', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            if (res.ok) {
                toast.success('Uploaded successfully')
                fetchFiles()
            } else {
                toast.error(data.error || 'Upload failed')
            }
        } catch (error) {
            toast.error('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 pt-32 pb-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <Badge className="mb-2">Admin Dashboard</Badge>
                            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Media Manager</h1>
                            <p className="text-slate-500 mt-2">Manage website assets and uploads across categories.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                                <Button disabled={uploading} className="rounded-full px-6 bg-primary shadow-lg shadow-primary/20">
                                    {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                                    Upload Image
                                </Button>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Controls */}
                        <div className="lg:col-span-1 space-y-2">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-3">Folders</p>
                            {FOLDERS.map((folder) => (
                                <button
                                    key={folder.id}
                                    onClick={() => setSelectedFolder(folder.id)}
                                    className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${selectedFolder === folder.id
                                            ? 'bg-white text-primary shadow-md border-l-4 border-primary'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                >
                                    <FolderOpen className={`h-4 w-4 ${selectedFolder === folder.id ? 'text-primary' : 'text-slate-400'}`} />
                                    <span className="font-medium text-sm">{folder.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-[500px]">
                                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {FOLDERS.find(f => f.id === selectedFolder)?.name}
                                    </h2>
                                    <span className="text-sm text-slate-400 font-medium">{files.length} items</span>
                                </div>

                                {loading ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                                        <Loader2 className="h-10 w-10 animate-spin mb-4" />
                                        <p className="text-sm font-medium">Scanning directory...</p>
                                    </div>
                                ) : files.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {files.map((file) => (
                                            <div key={file.name} className="group relative">
                                                <div className="aspect-square rounded-xl bg-slate-100 overflow-hidden border border-slate-200 transition-all group-hover:shadow-md">
                                                    <img
                                                        src={file.url}
                                                        alt={file.name}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <p className="text-[10px] text-white font-medium truncate">{file.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl">
                                        <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                                        <p className="font-medium">No images uploaded here yet</p>
                                        <p className="text-sm mt-1">Upload your first image to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
