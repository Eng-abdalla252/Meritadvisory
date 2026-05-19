"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { toast } from "sonner"

interface DemoModalProps {
    isOpen: boolean
    onClose: () => void
    productName: string
}

export function DemoModal({ isOpen, onClose, productName }: DemoModalProps) {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    // Reset submitted state when opening for a new product
    useEffect(() => {
        if (isOpen) setSubmitted(false)
    }, [isOpen])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            type: "demo",
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            company: formData.get("company"),
            system: productName,
            message: formData.get("message"),
        }

        try {
            const response = await fetch("/api/admin/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Failed to send")
            
            setSubmitted(true)
            toast.success("Request sent successfully!")
        } catch (error) {
            toast.error("Failed to send request. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] overflow-hidden">
                {!submitted ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-primary">Codso Muuqaal Demo ah</DialogTitle>
                            <DialogDescription className="text-base">
                                Fadlan geli faahfaahintaada si aan kuugu soo bandhigno nidaamka <span className="text-primary font-bold">{productName}</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-bold">Magaca oo Buuxa</Label>
                                <Input id="name" name="name" placeholder="Axmed Maxamed" required className="rounded-xl" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-bold">Telefoonka</Label>
                                    <Input id="phone" name="phone" placeholder="+252..." required className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-bold">Iimaylka</Label>
                                    <Input id="email" name="email" type="email" placeholder="axmed@shirkada.com" required className="rounded-xl" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-bold">Magaca Shirkadda</Label>
                                <Input id="company" name="company" placeholder="Shirkaddaada" required className="rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-bold">Farriin (Optional)</Label>
                                <Textarea id="message" name="message" placeholder="Sideen kuu caawin karnaa?" className="min-h-[60px] rounded-xl" />
                            </div>
                            <Button type="submit" className="w-full rounded-full h-12 text-base font-bold shadow-xl shadow-primary/20" disabled={loading}>
                                {loading ? "Waa la dirayaa..." : "Codso Demo-ga"}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">Waa la helay Codsigaaga!</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                            Waad ku mahadsantahay xiisaha aad u qabto <span className="font-bold text-primary">{productName}</span>. 
                            Kooxdayada ayaa kula soo xiriiri doonta 24 saac gudahood si ay kuugu diyaariyaan Demo-ga.
                        </p>
                        <Button onClick={onClose} className="mt-8 rounded-full px-10 h-11" variant="outline">
                            Xir Dhaqaaqaan
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
