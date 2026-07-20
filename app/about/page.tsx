import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — MixMaster Studio',
  description:
    'Learn about MixMaster Studio, our mixing and mastering process, and why independent artists trust us with their music.',
  openGraph: {
    title: 'About — MixMaster Studio',
    description:
      'Learn about MixMaster Studio, our mixing and mastering process, and why independent artists trust us with their music.',
  },
};

/* ──────────────────────────────────────────────
 *  EDIT YOUR CONTENT HERE
 *  Change the text in these constants to tell your story.
 * ────────────────────────────────────────────── */

const HERO = {
  headline: 'Built by producers who actually listen.',
  subline:
    "MixMaster Studio exists because we've been on both sides of the beat. We know what it's like to pour months into a record, only to get a mix back that doesn't hit. We built this studio to fix that — affordable, fast, and obsessively quality-focused mixing and mastering for independent artists, powered by FL Studio.",
};

const STORY_PARAGRAPHS = [
  "Every great song deserves a great mix. That belief is the foundation of MixMaster Studio. We started as independent artists and producers ourselves, frustrated by the gap between what we heard in our heads and what came out of our monitors.",
  "After years of honing our craft in FL Studio — learning the mixer inside and out, mastering plugins like Parametric EQ 2, Maximus, and Soundgoodizer, and mixing tracks across genres — we launched MixMaster Studio to give independent artists access to professional-quality mixes without the major-label price tag.",
  "Our approach is simple: we listen first. Before we touch a single knob, we study your reference tracks, understand the emotion you're going for, and map out how to get there. FL Studio's powerful mixer and plugin ecosystem give us everything we need to make your vision hit. Every mix is treated like our own music — because we know how much it matters to you.",
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    description:
      "You upload your stems and tell us about your vision — the vibe, the references, what you love and what's not working. We listen to everything before we start.",
  },
  {
    step: '02',
    title: 'Mix Architecture',
    description:
      "We build the sonic foundation in FL Studio: gain staging, mixer routing, bus structure. Every session is architected from scratch — no templates, no shortcuts.",
  },
  {
    step: '03',
    title: 'Sculpt & Balance',
    description:
      "Parametric EQ, compression, saturation, spatial processing — all inside FL Studio's mixer. We shape each element to serve the song, checking on multiple playback systems to ensure translation.",
  },
  {
    step: '04',
    title: 'Review & Refine',
    description:
      "You get a high-quality preview. Tell us what to push, pull, or change — one revision is included. We fine-tune until it feels right.",
  },
  {
    step: '05',
    title: 'Master & Deliver',
    description:
      "Final loudness optimization, stereo enhancement, and format delivery. You get a release-ready WAV that slaps on earbuds, car speakers, and club systems alike.",
  },
];

const VALUES = [
  {
    icon: '🎛️',
    title: 'No Templates',
    description:
      "Every FL Studio session starts from zero. We build custom mixer routing and processing chains tailored to your song — because your music isn't generic.",
  },
  {
    icon: '🔊',
    title: 'Translation Guarantee',
    description:
      'We check every mix on at least four different speaker systems. Your track will sound great everywhere — not just in headphones.',
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    description:
      "Most mixes delivered within 3–5 business days. Need it faster? We offer rush delivery so you don't miss your release date.",
  },
  {
    icon: '💬',
    title: 'Real Communication',
    description:
      "No corporate runaround. You'll work directly with the engineer mixing your song, and we're always available to answer questions.",
  },
  {
    icon: '🎯',
    title: 'Flat Pricing',
    description:
      'No hidden fees, no per-stem upcharges, no surprise invoices. You see the price upfront and that\'s what you pay.',
  },
  {
    icon: '🔒',
    title: 'Your Music, Your Rights',
    description:
      'We never claim ownership of your music. Your masters are yours. Period. We just make them sound better.',
  },
];

const FAQ = [
  {
    question: 'What file formats do you accept?',
    answer:
      'We accept WAV, AIFF, and FLAC stems. Please export at the same sample rate and bit depth as your session (ideally 24-bit / 44.1kHz or higher). MP3 stems are not recommended but can be worked with.',
  },
  {
    question: 'How many stems can I send?',
    answer:
      'There is no limit on the number of stems. Send us everything — individual tracks, bus groups, whatever your session has. More stems give us more control to deliver the best possible mix.',
  },
  {
    question: 'What if I don\'t like the mix?',
    answer:
      'Every order includes one free revision. After you receive your mix, tell us specifically what you want changed and we\'ll adjust. Additional revisions are available for $25 each.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Standard turnaround is 3–5 business days from the time we receive your stems and notes. Rush delivery (1–2 business days) is available for an additional fee.',
  },
  {
    question: 'Do you mix all genres?',
    answer:
      'Yes. We have experience across hip-hop, R&B, pop, rock, electronic, country, and more. Whatever your genre, we\'ll study your references and deliver a mix that fits.',
  },
  {
    question: 'Can I hear examples of your work?',
    answer:
      'Absolutely! Check out our Videos page for before/after comparisons, tutorials, and showcases of recent projects.',
  },
];

export default function AboutPage() {
  return (
    <main className="grain relative">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 sm:pt-32">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          About Us
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
          {HERO.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
          {HERO.subline}
        </p>
      </section>

      {/* Our Story */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Our Story
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
            From the other side of the glass
          </h2>
          <div className="mt-8 max-w-3xl space-y-6">
            {STORY_PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-paper/65">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          Our Process
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
          Five steps to your best mix
        </h2>
        <div className="mt-10 space-y-8">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="group flex gap-6 rounded-xl border border-line bg-surface/40 p-6 transition-all duration-300 hover:border-amber/30 hover:bg-surface"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-amber/30 bg-amber/10">
                <span className="font-mono text-lg font-bold text-amber">
                  {step.step}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold uppercase">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Why Us
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
            What sets MixMaster apart
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:border-amber/30 hover:shadow-lg hover:shadow-amber/5"
              >
                <span className="text-3xl">{v.icon}</span>
                <h3 className="mt-3 font-display text-lg font-bold uppercase">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — structured data for SEO */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          FAQ
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-10 space-y-4">
          {FAQ.map((item, i) => (
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
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">
            Ready to hear the difference?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/60">
            Upload your stems today and get a professional mix back in your inbox
            within days. No contracts, no commitments.
          </p>
          <a
            href="/#order"
            className="focus-ring mt-8 inline-block rounded-md bg-amber px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-signal"
          >
            Start your order
          </a>
        </div>
      </section>

      {/* FAQ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
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
