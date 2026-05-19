"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    FileText, 
    Calendar,
    User,
    Save,
    Loader2,
    Eye
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUpload } from "@/components/admin/image-upload"

interface BlogPost {
    slug: string
    category: string
    date: string
    title: string
    excerpt: string
    imageUrl: string
    author: string
    authorRole: string
    authorImage: string
}

export default function BlogAdmin() {
    const router = useRouter()
    const [posts, setPosts] = React.useState<BlogPost[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [editingPost, setEditingPost] = React.useState<BlogPost | null>(null)

    // Image States
    const [imageUrl, setImageUrl] = React.useState("")
    const [authorImage, setAuthorImage] = React.useState("")

    React.useEffect(() => {
        if (editingPost) {
            setImageUrl(editingPost.imageUrl)
            setAuthorImage(editingPost.authorImage)
        } else {
            setImageUrl("")
            setAuthorImage("")
        }
    }, [editingPost, isDialogOpen])

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/admin/data?type=blog")
            const data = await res.json()
            setPosts(data)
        } catch (error) {
            console.error("Failed to fetch blog posts")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchPosts()
        }
    }, [router])

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        
        const formData = new FormData(e.currentTarget)
        const postData: BlogPost = {
            slug: editingPost?.slug || (formData.get("title") as string).toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
            category: formData.get("category") as string,
            date: formData.get("date") as string || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            title: formData.get("title") as string,
            excerpt: formData.get("excerpt") as string,
            imageUrl: imageUrl,
            author: formData.get("author") as string,
            authorRole: formData.get("authorRole") as string,
            authorImage: authorImage
        }

        let updatedPosts = []
        if (editingPost) {
            updatedPosts = posts.map(p => p.slug === editingPost.slug ? postData : p)
        } else {
            updatedPosts = [postData, ...posts]
        }

        try {
            const res = await fetch("/api/admin/data?type=blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPosts)
            })
            if (res.ok) {
                setPosts(updatedPosts)
                setIsDialogOpen(false)
                setEditingPost(null)
            }
        } catch (error) {
            console.error("Failed to save blog post")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return
        
        const updatedPosts = posts.filter(p => p.slug !== slug)
        try {
            const res = await fetch("/api/admin/data?type=blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPosts)
            })
            if (res.ok) {
                setPosts(updatedPosts)
            }
        } catch (error) {
            console.error("Failed to delete blog post")
        }
    }

    const filteredPosts = posts.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.author.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Blog Management</h1>
                    <p className="text-slate-500 font-medium">Publish and manage expert insights and industry analysis.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) setEditingPost(null)
                }}>
                    <DialogTrigger asChild>
                        <Button className="h-14 bg-[#e31e24] hover:bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl px-8 shadow-xl shadow-red-500/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Write New Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingPost ? "Edit Article" : "Create New Article"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 mt-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Article Title</Label>
                                    <Input name="title" defaultValue={editingPost?.title} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                                    <Input name="category" defaultValue={editingPost?.category} required className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Short Excerpt</Label>
                                <Textarea name="excerpt" defaultValue={editingPost?.excerpt} required className="rounded-xl min-h-[80px]" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <ImageUpload 
                                    label="Cover Image" 
                                    value={imageUrl} 
                                    onChange={setImageUrl} 
                                />
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Publish Date</Label>
                                    <Input name="date" defaultValue={editingPost?.date} placeholder="e.g. Feb 10, 2026" className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-2xl space-y-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Author Information</p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</Label>
                                        <Input name="author" defaultValue={editingPost?.author} required className="h-12 rounded-xl bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Role</Label>
                                        <Input name="authorRole" defaultValue={editingPost?.authorRole} required className="h-12 rounded-xl bg-white" />
                                    </div>
                                </div>
                                <ImageUpload 
                                    label="Author Avatar" 
                                    value={authorImage} 
                                    onChange={setAuthorImage} 
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                                <Button type="submit" disabled={saving} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 font-bold">
                                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Publish Article
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="p-0 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                    <Search className="h-5 w-5 text-slate-400" />
                    <Input 
                        placeholder="Search posts by title or author..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-none bg-transparent shadow-none focus-visible:ring-0 text-lg font-medium p-0 h-auto"
                    />
                </div>

                <div className="grid grid-cols-1 divide-y divide-slate-100">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="p-8 animate-pulse bg-slate-50/20 h-32" />
                        ))
                    ) : filteredPosts.length === 0 ? (
                        <div className="py-24 text-center text-slate-400">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p className="font-black uppercase text-xs tracking-widest">No articles found</p>
                        </div>
                    ) : filteredPosts.map((post) => (
                        <div key={post.slug} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-slate-50/50 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-32 rounded-2xl overflow-hidden shadow-md shrink-0">
                                    <img src={post.imageUrl} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-red-50 text-[#e31e24] border-none text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
                                            {post.category}
                                        </Badge>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {post.date}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#e31e24] transition-colors line-clamp-1">{post.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 rounded-full overflow-hidden bg-slate-200">
                                            <img src={post.authorImage} alt="" className="h-full w-full object-cover" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{post.author}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-12 w-12 rounded-2xl hover:bg-white hover:shadow-lg transition-all"
                                    onClick={() => router.push(`/blog/${post.slug}`)}
                                >
                                    <Eye className="h-5 w-5" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-12 w-12 rounded-2xl hover:bg-white hover:text-blue-600 hover:shadow-lg transition-all"
                                    onClick={() => {
                                        setEditingPost(post)
                                        setIsDialogOpen(true)
                                    }}
                                >
                                    <Edit2 className="h-5 w-5" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-12 w-12 rounded-2xl hover:bg-red-50 hover:text-red-500 hover:shadow-lg transition-all"
                                    onClick={() => handleDelete(post.slug)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
