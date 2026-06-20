import { NextResponse } from "next/server"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json()

        // These should be configured in your deployment environment variables
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "merit_admin"
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Merit@2026!"

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const token = await createToken({
                userId: "admin-1",
                username: username
            })

            const response = NextResponse.json({ success: true, token })
            
            // Set secure cookie for Next.js middleware protection
            // Note: Not setting httpOnly so that legacy client scripts can still read it if needed
            // However, httpOnly is much safer. We'll set it but allow the client to rely on localStorage.
            response.cookies.set({
                name: "admin_token",
                value: token,
                httpOnly: false, // Keeping false for now to not break any existing client code that might read document.cookie
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 86400, // 24 hours
            })

            return response
        }

        return NextResponse.json(
            { success: false, message: "Invalid credentials" },
            { status: 401 }
        )
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
}
