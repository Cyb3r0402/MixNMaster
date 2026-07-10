import { timingSafeEqual } from 'crypto';

export function checkPassword(candidate: string): boolean {
  const actual = process.env.ADMIN_PASSWORD;
  if (!actual) throw new Error('Missing ADMIN_PASSWORD env var');
  const candidateBuf = Buffer.from(candidate);
  const actualBuf = Buffer.from(actual);
  if (candidateBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(candidateBuf, actualBuf);
}
