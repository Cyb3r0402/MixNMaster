'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError('Incorrect password.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-line bg-surface p-8"
      >
        <h1 className="font-display text-2xl font-bold uppercase">Admin</h1>
        <p className="mt-1 text-sm text-paper/60">Sign in to view orders.</p>
        <input
          autoFocus
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus-ring mt-6 w-full rounded-md border border-line bg-ink px-4 py-3 text-paper placeholder:text-paper/40"
        />
        {error && (
          <p role="alert" className="mt-3 text-sm text-signal">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-6 w-full rounded-md bg-amber px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-signal disabled:opacity-50"
        >
          {loading ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
