import { stripe } from '@/lib/stripe';
import LogoutButton from '@/components/LogoutButton';

export const dynamic = 'force-dynamic';

interface OrderView {
  id: string;
  created: number;
  amountUsd: string;
  customerName: string;
  customerEmail: string;
  service: string;
  revisions: string;
  notes: string;
  referenceLinks: string;
  files: { name: string; url: string }[];
}

async function getOrders(startingAfter?: string): Promise<{ orders: OrderView[]; hasMore: boolean }> {
  if (!stripe) {
    return { orders: [], hasMore: false };
  }
  const list = await stripe.paymentIntents.list({
    limit: 20,
    starting_after: startingAfter,
  });

  const orders = list.data
    .filter((pi) => pi.status === 'succeeded')
    .map((pi) => {
      const m = pi.metadata;
      const fileCount = Number(m.file_count || '0');
      const files = Array.from({ length: fileCount }, (_, i) => ({
        name: m[`file_${i}_name`] || `file-${i + 1}`,
        url: m[`file_${i}_url`] || '',
      })).filter((f) => f.url);

      return {
        id: pi.id,
        created: pi.created,
        amountUsd: (pi.amount / 100).toFixed(2),
        customerName: m.customer_name || 'Unknown',
        customerEmail: m.customer_email || pi.receipt_email || 'unknown',
        service: m.service || 'Unknown service',
        revisions: m.revisions || '1',
        notes: m.notes || '',
        referenceLinks: m.reference_links || '',
        files,
      };
    });

  return { orders, hasMore: list.has_more };
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { after?: string };
}) {
  const { orders, hasMore } = await getOrders(searchParams.after);

  return (
    <main className="min-h-screen bg-ink px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber">Admin</span>
            <h1 className="font-display text-3xl font-bold uppercase">Orders</h1>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8 space-y-4">
          {orders.length === 0 && (
            <p className="text-paper/50">No orders yet.</p>
          )}
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-line bg-surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-xl font-bold">{order.customerName}</p>
                  <p className="text-sm text-paper/60">{order.customerEmail}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg text-amber">${order.amountUsd}</p>
                  <p className="text-xs text-paper/40">
                    {new Date(order.created * 1000).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-paper/50">Service: </span>
                  {order.service}
                </p>
                <p>
                  <span className="text-paper/50">Revisions: </span>
                  {order.revisions}
                </p>
                {order.referenceLinks && (
                  <p className="sm:col-span-2">
                    <span className="text-paper/50">References: </span>
                    {order.referenceLinks}
                  </p>
                )}
                {order.notes && (
                  <p className="sm:col-span-2">
                    <span className="text-paper/50">Notes: </span>
                    {order.notes}
                  </p>
                )}
              </div>

              {order.files.length > 0 && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="mb-2 text-xs uppercase tracking-widest text-paper/50">Files</p>
                  <ul className="space-y-1 font-mono text-sm">
                    {order.files.map((f) => (
                      <li key={f.url}>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber hover:text-signal focus-ring"
                        >
                          {f.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {hasMore && orders.length > 0 && (
          <div className="mt-8 text-center">
            <a
              href={`/admin?after=${orders[orders.length - 1].id}`}
              className="focus-ring inline-block rounded-md border border-line px-6 py-3 text-sm text-paper/70 hover:border-paper/40 hover:text-paper"
            >
              Load older orders
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
