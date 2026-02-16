"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = scrollTop / docHeight
            setScroll(scrollPercent)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div
            className="fixed left-0 top-0 z-[100] h-1 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-150 ease-out"
            style={{ width: `${scroll * 100}%` }}
        />
    )
}
