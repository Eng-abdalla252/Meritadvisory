"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PortalPage() {

    return (
        <div className="flex min-h-screen flex-col bg-slate-50/50">
            <Navbar />
            <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-6">
                <div className="flex-1 w-full min-h-[85vh] relative bg-slate-50">
                    <iframe 
                        src="https://meritadvisory.net/web/login" 
                        className="absolute inset-0 w-full h-full border-none"
                        title="Odoo Portal"
                        allow="geolocation; microphone; camera"
                    />
                </div>
            </main>
            <Footer />
        </div>
    )
}
