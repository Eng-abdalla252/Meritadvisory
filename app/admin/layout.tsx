"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
    LayoutDashboard, 
    Video, 
    MessageSquare, 
    FileText, 
    Users, 
    Image as ImageIcon,
    LogOut,
    Menu,
    X,
    Settings,
    Bell,
    Award,
    Briefcase,
    Inbox
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Webinars", href: "/admin/webinars", icon: Video },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Blog Posts", href: "/admin/blog", icon: FileText },
    { label: "Team Members", href: "/admin/team", icon: Users },
    { label: "Client Logos", href: "/admin/clients", icon: ImageIcon },
    { label: "Awards & Certs", href: "/admin/awards", icon: Award },
    { label: "Our Services", href: "/admin/services", icon: Briefcase },
    { label: "Business Leads", href: "/admin/leads", icon: Inbox },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)
    const isLoginPage = pathname === "/admin/login"

    if (isLoginPage) return <>{children}</>

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 bg-slate-900 text-white z-50">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#e31e24] flex items-center justify-center font-black text-xl">M</div>
                        <div>
                            <p className="font-black tracking-tight leading-none text-lg">MERIT</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Portal</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group",
                                    isActive 
                                        ? "bg-[#e31e24] text-white shadow-lg shadow-red-500/20" 
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-6 border-t border-white/5 space-y-2">
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-bold"
                        onClick={() => router.push("/admin/settings")}
                    >
                        <Settings className="h-5 w-5" />
                        Site Settings
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-bold"
                        onClick={() => {
                            localStorage.removeItem("admin_auth")
                            router.push("/admin/login")
                        }}
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 flex items-center justify-between px-6 z-[60] border-b border-white/5">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#e31e24] flex items-center justify-center font-black">M</div>
                    <span className="font-black text-white text-sm">MERIT ADMIN</span>
                </Link>
                <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-white">
                    {isMobileOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            {isMobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-slate-900 pt-20 px-6 animate-in slide-in-from-right duration-300">
                    <nav className="space-y-2">
                        {sidebarLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 px-6 py-5 rounded-2xl text-lg font-black transition-all",
                                    pathname === link.href ? "bg-[#e31e24] text-white" : "text-slate-400"
                                )}
                            >
                                <link.icon className="h-6 w-6" />
                                {link.label}
                            </Link>
                        ))}
                        <Button 
                            variant="ghost" 
                            className="w-full justify-start gap-4 px-6 py-8 text-slate-400 font-black text-lg"
                            onClick={() => router.push("/")}
                        >
                            <LogOut className="h-6 w-6" />
                            Exit Admin
                        </Button>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:pl-72 min-h-screen">
                <header className="hidden lg:flex h-20 bg-white border-b border-slate-200 items-center justify-between px-10 sticky top-0 z-40">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                        {sidebarLinks.find(l => l.href === pathname)?.label || "Dashboard"}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#e31e24] rounded-full border-2 border-white" />
                        </button>
                        <button 
                            onClick={() => router.push("/admin/settings")}
                            className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center border border-slate-200 transition-colors"
                            title="Site Settings"
                        >
                            <Settings className="h-5 w-5 text-slate-500" />
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("admin_auth")
                                router.push("/admin/login")
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm transition-colors"
                            title="Logout"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </header>
                <div className="p-6 lg:p-10 pt-24 lg:pt-10">
                    {children}
                </div>
            </main>
        </div>
    )
}
