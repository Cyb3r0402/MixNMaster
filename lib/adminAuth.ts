const COOKIE_NAME = 'mm_admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('Missing SESSION_SECRET env var');
  return secret;
}

async function hmacHex(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now().toString();
  const signature = await hmacHex(issuedAt);
  return `${issuedAt}.${signature}`;
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [issuedAt, signature] = token.split('.');
  if (!issuedAt || !signature) return false;

  const expected = await hmacHex(issuedAt);
  if (!timingSafeStringEqual(signature, expected)) return false;

  const age = (Date.now() - Number(issuedAt)) / 1000;
  return age >= 0 && age < MAX_AGE_SECONDS;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = MAX_AGE_SECONDS;
