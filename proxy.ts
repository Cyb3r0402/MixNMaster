import { NextRequest, NextResponse } from 'next/server';
import { isValidSessionToken, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!(await isValidSessionToken(token))) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
