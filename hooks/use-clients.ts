"use client"

import { useState, useEffect } from "react"

interface Client {
    name: string
    industry: string
    logo: string
    country: string
}

export function useClients() {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch("/api/admin/data-api?type=clients")
                if (!res.ok) throw new Error("Failed to fetch")
                const data = await res.json()
                setClients(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClients()
    }, [])

    return { clients, loading, error }
}
