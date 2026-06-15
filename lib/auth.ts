import { SignJWT, jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'merit-admin-secret-key-2026-change-in-production'
)

export interface TokenPayload {
  userId: string
  username: string
  exp: number
}

export async function createToken(payload: Omit<TokenPayload, 'exp'>): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY)
  
  return token
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as TokenPayload
  } catch (error) {
    return null
  }
}

export function getTokenFromCookie(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null
  
  const cookies = cookieHeader.split(';').map(c => c.trim())
  const authCookie = cookies.find(c => c.startsWith('admin_token='))
  
  if (!authCookie) return null
  
  return authCookie.split('=')[1]
}

export function getTokenFromLocalStorage(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

export function setTokenInLocalStorage(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('admin_token', token)
}

export function removeTokenFromLocalStorage(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('admin_token')
}

// Helper function to verify authentication in API routes
export async function verifyAuth(request: Request): Promise<TokenPayload | null> {
  const token = getTokenFromCookie(request)
  if (!token) return null
  
  return verifyToken(token)
}

// Helper function for authenticated fetch requests from client
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getTokenFromLocalStorage()
  if (!token) {
    throw new Error("No authentication token found")
  }
  
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include"
  })
  
  return response
}
