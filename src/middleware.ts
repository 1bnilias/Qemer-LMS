import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// For prototype: disable server-side authentication checks
// Authentication will be handled client-side in React components
export function middleware(request: NextRequest) {
  // Allow all routes for prototype - authentication handled client-side
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
