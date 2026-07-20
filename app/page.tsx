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

const WHY_CHOOSE = [
  {
    icon: '🎧',
    title: 'Multi-System Checks',
    description:
      'Every mix is tested on studio monitors, headphones, earbuds, and car speakers to ensure it translates perfectly everywhere.',
  },
  {
    icon: '🎚️',
    title: 'Custom Processing',
    description:
      'No templates, no presets. Every session gets a custom signal chain built from scratch for your unique sound.',
  },
  {
    icon: '📦',
    title: 'Flat-Rate, No Surprises',
    description:
      'One price covers everything — no per-stem fees, no hidden charges. You know exactly what you pay before you start.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The mix came back sounding exactly how I imagined it. Better, actually. The low end was tight and the vocals sat perfectly.",
    author: 'Independent Hip-Hop Artist',
  },
  {
    quote:
      'Turnaround was fast and the communication was great. They actually listened to my references and nailed the vibe.',
    author: 'R&B Singer-Songwriter',
  },
  {
    quote:
      "I've tried other online mixing services but this is the first time I didn't need to ask for a revision. Clean, punchy, and loud.",
    author: 'Electronic Producer',
  },
];

const HOME_FAQ = [
  {
    question: 'How does online mixing work?',
    answer:
      'You upload your stems (individual tracks) through our secure upload form, tell us about your vision and reference tracks, and we mix your song remotely in our studio. You receive a high-quality WAV file delivered to your inbox.',
  },
  {
    question: 'What genres do you mix?',
    answer:
      'We mix all genres — hip-hop, R&B, pop, rock, electronic, country, and everything in between. Our engineers study your references to deliver the right sound for your music.',
  },
  {
    question: 'How fast will I get my mix back?',
    answer:
      'Standard delivery is 3–5 business days. Need it sooner? Rush delivery options are available. Either way, quality is never rushed.',
  },
  {
    question: 'Do I keep all rights to my music?',
    answer:
      'Absolutely. You retain 100% ownership of your music. We never claim royalties, copyright, or any interest in your songs. Your masters are yours.',
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

      {/* Why Choose Us */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          The Difference
        </span>
        <h2 className="mt-2 font-display text-4xl font-bold uppercase">
          Why artists choose MixMaster
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {WHY_CHOOSE.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:border-amber/30 hover:shadow-lg hover:shadow-amber/5"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-3 font-display text-lg font-bold uppercase">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            What Artists Say
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase">
            Trusted by independent artists
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="rounded-xl border border-line bg-surface p-6"
              >
                <svg
                  className="mb-4 h-8 w-8 text-amber/40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm leading-relaxed text-paper/70 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 font-mono text-xs text-amber">
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
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

      {/* FAQ */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Questions
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase">
            Common questions
          </h2>
          <div className="mt-10 space-y-4">
            {HOME_FAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-line bg-surface/40 transition-all duration-300 open:border-amber/30 open:bg-surface"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-display text-lg font-bold uppercase tracking-wide transition-colors hover:text-amber">
                  {item.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-paper/40 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-paper/60">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Order flow */}
      <section id="order" className="mx-auto max-w-3xl px-6 pb-28 pt-20">
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

      {/* FAQ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: HOME_FAQ.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
