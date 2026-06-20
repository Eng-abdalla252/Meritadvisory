import { SignJWT, jwtVerify } from 'jose'

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'merit-admin-secret-key-2026-change-in-production'
  return new TextEncoder().encode(secret)
}

export interface TokenPayload {
  userId: string
  username: string
  exp?: number
}

export async function createToken(payload: Omit<TokenPayload, 'exp'>): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecretKey())
  
  return token
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    
    if (!payload || typeof payload !== 'object') {
      return null
    }
    
    const jwtPayload = payload as unknown as { userId?: string; username?: string; exp?: number }
    
    if (!jwtPayload.userId || !jwtPayload.username || !jwtPayload.exp) {
      return null
    }
    
    return {
      userId: jwtPayload.userId,
      username: jwtPayload.username,
      exp: jwtPayload.exp
    }
  } catch (error) {
    return null
  }
}

// Helper to verify authentication in API route handlers
export async function verifyAuth(request: Request): Promise<TokenPayload | null> {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null

  const cookies = cookieHeader.split(';').map(c => c.trim())
  const authCookie = cookies.find(c => c.startsWith('admin_token='))
  if (!authCookie) return null

  const token = authCookie.split('=')[1]
  return verifyToken(token)
}

