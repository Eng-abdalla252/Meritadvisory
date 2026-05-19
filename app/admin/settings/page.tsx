"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
    Save,
    Loader2,
    Globe,
    MessageSquare,
    Phone,
    Mail,
    Link as LinkIcon,
    Layout,
    CheckCircle2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function SettingsAdmin() {
    const router = useRouter()
    const [settings, setSettings] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings")
            const data = await res.json()
            setSettings(data)
        } catch (error) {
            toast.error("Failed to fetch settings")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin/login")
        } else {
            fetchSettings()
        }
    }, [router])

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            })
            if (res.ok) {
                toast.success("Settings saved successfully")
            }
        } catch (error) {
            toast.error("Failed to save settings")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin h-10 w-10 text-red-500" />
        </div>
    )

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Site Settings</h1>
                <p className="text-slate-500 font-medium">Control your website's primary content and configuration from one place.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-10">
                <Tabs defaultValue="hero" className="w-full">
                    <TabsList className="bg-white p-1 rounded-2xl shadow-sm h-16 w-full max-w-2xl grid grid-cols-4">
                        <TabsTrigger value="hero" className="rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest h-full">
                            <Layout className="h-4 w-4 mr-2" />
                            Hero
                        </TabsTrigger>
                        <TabsTrigger value="contact" className="rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest h-full">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact
                        </TabsTrigger>
                        <TabsTrigger value="social" className="rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest h-full">
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Social
                        </TabsTrigger>
                        <TabsTrigger value="seo" className="rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest h-full">
                            <Globe className="h-4 w-4 mr-2" />
                            SEO
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-10">
                        <TabsContent value="hero">
                            <Card className="p-10 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white">
                                <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-[6px] border-red-500 pl-6 uppercase tracking-tight">Hero Section</h3>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Title</Label>
                                        <Textarea 
                                            value={settings.hero.title}
                                            onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })}
                                            className="rounded-2xl min-h-[100px] font-bold text-lg"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subtitle</Label>
                                        <Textarea 
                                            value={settings.hero.subtitle}
                                            onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })}
                                            className="rounded-2xl min-h-[100px] text-slate-600 font-medium"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary CTA Text</Label>
                                            <Input 
                                                value={settings.hero.ctaText}
                                                onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, ctaText: e.target.value } })}
                                                className="h-14 rounded-xl font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secondary CTA Text</Label>
                                            <Input 
                                                value={settings.hero.secondaryCtaText}
                                                onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, secondaryCtaText: e.target.value } })}
                                                className="h-14 rounded-xl font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="contact">
                            <Card className="p-10 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white">
                                <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-[6px] border-blue-500 pl-6 uppercase tracking-tight">Contact Information</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Email</Label>
                                        <Input 
                                            value={settings.contact.email}
                                            onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                                            className="h-14 rounded-xl font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Phone</Label>
                                        <Input 
                                            value={settings.contact.phone}
                                            onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                                            className="h-14 rounded-xl font-bold"
                                        />
                                    </div>
                                    <div className="col-span-full space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Head Office Address</Label>
                                        <Textarea 
                                            value={settings.contact.address}
                                            onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                                            className="rounded-2xl min-h-[100px] font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp Number (Digits only)</Label>
                                        <Input 
                                            value={settings.contact.whatsapp}
                                            onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, whatsapp: e.target.value } })}
                                            className="h-14 rounded-xl font-bold"
                                        />
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="social">
                            <Card className="p-10 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white">
                                <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-[6px] border-slate-900 pl-6 uppercase tracking-tight">Social Media Links</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                            <LinkIcon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">LinkedIn Profile</Label>
                                            <Input 
                                                value={settings.socials.linkedin}
                                                onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, linkedin: e.target.value } })}
                                                className="h-12 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                            <LinkIcon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Twitter / X Profile</Label>
                                            <Input 
                                                value={settings.socials.twitter}
                                                onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, twitter: e.target.value } })}
                                                className="h-12 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                            <LinkIcon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facebook Page</Label>
                                            <Input 
                                                value={settings.socials.facebook}
                                                onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, facebook: e.target.value } })}
                                                className="h-12 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="seo">
                            <Card className="p-10 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white">
                                <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-[6px] border-emerald-500 pl-6 uppercase tracking-tight">Search Engine Optimization</h3>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Site Name</Label>
                                        <Input 
                                            value={settings.site.name}
                                            onChange={(e) => setSettings({ ...settings, site: { ...settings.site, name: e.target.value } })}
                                            className="h-14 rounded-xl font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Description</Label>
                                        <Textarea 
                                            value={settings.site.description}
                                            onChange={(e) => setSettings({ ...settings, site: { ...settings.site, description: e.target.value } })}
                                            className="rounded-2xl min-h-[120px] font-medium"
                                        />
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                    </div>
                </Tabs>

                <div className="flex justify-end sticky bottom-10 z-50">
                    <Button 
                        type="submit" 
                        disabled={saving}
                        className="h-16 px-12 bg-[#e31e24] hover:bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all shadow-2xl shadow-red-500/20"
                    >
                        {saving ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-3" />
                        ) : (
                            <Save className="h-5 w-5 mr-3" />
                        )}
                        Update Site Configuration
                    </Button>
                </div>
            </form>
        </div>
    )
}
