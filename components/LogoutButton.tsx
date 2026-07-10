'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
      }}
      className="focus-ring rounded-md border border-line px-4 py-2 text-sm text-paper/70 transition hover:border-paper/40 hover:text-paper"
    >
      Sign out
    </button>
  );
}
