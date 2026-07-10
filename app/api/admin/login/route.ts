import { NextResponse } from 'next/server';
import { checkPassword } from '@/lib/adminPassword';
import { createSessionToken, ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE } from '@/lib/adminAuth';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (typeof password !== 'string' || !checkPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return response;
}
