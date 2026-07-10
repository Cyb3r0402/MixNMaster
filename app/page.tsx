import OrderFlow from '@/components/OrderFlow';
import VuMeter from '@/components/VuMeter';
import { SERVICES } from '@/lib/pricing';

const SIGNAL_CHAIN = [
  {
    n: '01',
    label: 'Upload',
    copy: 'Send your stems or a rough bounce, straight from your browser.',
  },
  {
    n: '02',
    label: 'We mix',
    copy: 'Balance, EQ, compression, and space, built around your reference.',
  },
  {
    n: '03',
    label: 'You review',
    copy: 'One revision included. Tell us what to push or pull back.',
  },
  {
    n: '04',
    label: 'Delivered',
    copy: 'Release-ready WAV in your inbox, mastered for streaming.',
  },
];

export default function Home() {
  return (
    <main className="grain relative">
      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-start px-6 pb-20 pt-24 sm:pt-32">
        <VuMeter />
        <h1 className="mt-8 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl">
          Your rough mix
          <br />
          <span className="text-amber">deserves the room.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-paper/70">
          Upload your stems, tell us the sound you&apos;re chasing, and get back a mix that
          actually translates — car, earbuds, club system, all of it.
        </p>
        <a
          href="#order"
          className="focus-ring mt-8 rounded-md bg-amber px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-signal"
        >
          Start your order
        </a>
      </section>

      {/* Signal chain */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 sm:grid-cols-4">
          {SIGNAL_CHAIN.map((s) => (
            <div key={s.n}>
              <span className="font-mono text-sm text-signal">{s.n}</span>
              <h3 className="mt-2 font-display text-xl font-bold uppercase">{s.label}</h3>
              <p className="mt-2 text-sm text-paper/60">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">Rates</span>
        <h2 className="mt-2 font-display text-4xl font-bold uppercase">Flat, upfront pricing</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {Object.values(SERVICES).map((s) => (
            <div key={s.label} className="rounded-lg border border-line bg-surface p-6">
              <p className="font-display text-xl font-bold">{s.label}</p>
              <p className="mt-2 text-sm text-paper/60">{s.description}</p>
              <p className="mt-4 font-mono text-3xl text-amber">${s.priceUsd}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Order flow */}
      <section id="order" className="mx-auto max-w-3xl px-6 pb-28">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">Get started</span>
        <h2 className="mt-2 font-display text-4xl font-bold uppercase">Place your order</h2>
        <p className="mt-3 text-paper/60">
          Files upload directly and securely. Card details go straight to Stripe — they never
          touch our servers.
        </p>
        <div className="mt-8">
          <OrderFlow />
        </div>
      </section>

      <footer className="border-t border-line px-6 py-10 text-center text-sm text-paper/40">
        MixMaster Studio
      </footer>
    </main>
  );
}
