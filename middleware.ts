import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Skyddade rutter som kräver autentisering
const protectedRoutes = ['/profile', '/settings', '/mina-sidor'];

// Middleware-funktion som körs för varje request
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) return NextResponse.next();

  // Redirect annonsor to their dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard') && !request.nextUrl.pathname.startsWith('/dashboard-annonsor')) {
    if (token.role === 'annonsor') {
      return NextResponse.redirect(new URL('/dashboard-annonsor', request.url));
    }
  }
  // Redirect uthyrare to their dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard-annonsor')) {
    if (token.role === 'uthyrare') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Konfigurera vilka rutter middleware ska köras för
export const config = {
  matcher: [
    '/profile/:path*',
    '/settings/:path*',
    '/mina-sidor/:path*',
    '/login',
    '/register',
    '/dashboard/:path*',
    '/dashboard-annonsor/:path*'
  ],
}; 