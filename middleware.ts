import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authenticated = request.cookies.get('firebase:authUser')?.value;
  const { pathname } = request.nextUrl;

  if (!authenticated && !pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (authenticated && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*', '/((?!_next).*)'],
};
