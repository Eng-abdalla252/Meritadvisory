"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Lock, ArrowRight, AlertCircle, User } from "lucide-react"
import { motion } from "framer-motion"

// Credentials — change these to whatever you want
const ADMIN_USERNAME = "merit_admin"
const ADMIN_PASSWORD = "Merit@2026!"

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [attempts, setAttempts] = React.useState(0)
    const [lockedUntil, setLockedUntil] = React.useState<number | null>(null)

    const isLocked = lockedUntil !== null && Date.now() < lockedUntil

    const getRemainingSeconds = () => {
        if (!lockedUntil) return 0
        return Math.ceil((lockedUntil - Date.now()) / 1000)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isLocked) return

        setIsLoading(true)
        setError("")

        // Simulate network delay for realism
        await new Promise(r => setTimeout(r, 600))

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            localStorage.setItem("admin_auth", "true")
            router.push("/admin")
        } else {
            const newAttempts = attempts + 1
            setAttempts(newAttempts)

            if (newAttempts >= 5) {
                const lockTime = Date.now() + 60_000 // 60 second lockout
                setLockedUntil(lockTime)
                setError("Too many failed attempts. Account locked for 60 seconds.")
                setAttempts(0)
            } else {
                setError(`Invalid credentials. ${5 - newAttempts} attempt${5 - newAttempts === 1 ? '' : 's'} remaining.`)
            }
            setIsLoading(false)
        }
    }

    // Countdown timer update
    React.useEffect(() => {
        if (!isLocked) return
        const interval = setInterval(() => {
            if (Date.now() >= (lockedUntil ?? 0)) {
                setLockedUntil(null)
                setError("")
                clearInterval(interval)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [isLocked, lockedUntil])

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 -mr-20 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[120px]" />
            <div className="absolute bottom-0 left-0 -ml-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 lg:p-14 shadow-2xl">
                    <div className="text-center space-y-4 mb-12">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 mb-4 border border-red-500/20">
                            <Shield className="h-8 w-8" />
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Admin Portal</h1>
                        <p className="text-slate-400 font-medium">Secure access for authorized personnel only.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                Administrator Username
                            </Label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600" />
                                <Input 
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-700 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                                    required
                                    disabled={isLocked}
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                Security Access Key
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600" />
                                <Input 
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-700 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                                    required
                                    disabled={isLocked}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm font-bold"
                            >
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span>
                                    {error}
                                    {isLocked && ` (${getRemainingSeconds()}s remaining)`}
                                </span>
                            </motion.div>
                        )}

                        <Button 
                            type="submit" 
                            disabled={isLoading || isLocked}
                            className="w-full h-14 bg-[#e31e24] hover:bg-red-600 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-red-500/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Verifying..." : isLocked ? `Locked (${getRemainingSeconds()}s)` : "Initialize Session"}
                            {!isLoading && !isLocked && <ArrowRight className="h-4 w-4 ml-3 transition-transform group-hover:translate-x-1" />}
                        </Button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-white/5 text-center">
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest leading-relaxed">
                            System monitored by Merit Security protocols.<br />
                            Unauthorized access attempts are logged.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
