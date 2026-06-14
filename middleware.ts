import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Allow public routes
  const publicRoutes = ['/admin/login', '/api/public']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  // Allow static assets and API routes that don't need auth
  const isStaticAsset = pathname.startsWith('/_next') || 
                        pathname.startsWith('/static') || 
                        pathname.startsWith('/images') ||
                        pathname.startsWith('/public')
  
  // Allow non-admin routes
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
  
  if (!isAdminRoute || isPublicRoute || isStaticAsset) {
    return NextResponse.next()
  }

  // Check for admin token
  const token = request.cookies.get('admin_token')?.value || ''
  
  if (!token) {
    // Redirect to login for admin pages
    if (pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    
    // Return 401 for API routes
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // Verify token
  const payload = verifyToken(token)
  if (!payload) {
    // Clear invalid token
    const response = pathname.startsWith('/api/admin') 
      ? NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      : NextResponse.redirect(new URL('/admin/login', request.url))
    
    response.cookies.delete('admin_token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}
