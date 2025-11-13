// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const path = req.nextUrl.pathname

  // If there's no token, redirect to login
  if (!token) {
    if (
      // path.startsWith('/dashboard') ||
      path.startsWith('/provider') ||
      path.startsWith('/admin')
    ) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
    return NextResponse.next()
  }

  // Extract role from token (if encoded) or store in cookie
  const userRole = req.cookies.get('role')?.value 

  // // Protect each role’s dashboard
  // if (path.startsWith('/dashboard') && userRole !== 'customer') {
  //   return NextResponse.redirect(new URL('/unauthorized', req.url))
  // }

  if (path.startsWith('/provider') && userRole !== 'service_provider') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  if (path.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    // '/dashboard/:path*',
    '/provider/:path*',
    '/admin/:path*',
  ],
}
