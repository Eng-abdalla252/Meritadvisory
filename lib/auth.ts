import { verifyToken, type TokenPayload } from './session'

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
