import type { Metadata } from 'next';
import { ARTISTS } from '@/lib/artists';
import VideoCarousel from '@/components/VideoCarousel';

export const metadata: Metadata = {
  title: 'Videos — MixMaster Studio',
  description:
    'Watch mixing tutorials, before-and-after comparisons, and showcases from MixMaster Studio and featured artists.',
  openGraph: {
    title: 'Videos — MixMaster Studio',
    description:
      'Watch mixing tutorials, before-and-after comparisons, and showcases from MixMaster Studio and featured artists.',
  },
};

export default function VideosPage() {
  return (
    <main className="grain relative">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 sm:pt-32">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          Watch
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
          Videos &amp; <span className="text-amber">Showcases</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
          Tutorials, mix breakdowns, before-and-after comparisons, and the latest
          from our studio and featured artists. See the craft behind the sound.
        </p>
        {/* Quick stats */}
        <div className="mt-8 flex flex-wrap gap-6">
          {ARTISTS.map((artist) => (
            <div key={artist.slug} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 ring-1 ring-amber/20">
                <svg className="h-5 w-5 text-amber" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <p className="font-display text-sm font-bold uppercase">{artist.name}</p>
                <p className="font-mono text-xs text-paper/40">
                  {artist.videoIds.length} {artist.videoIds.length === 1 ? 'video' : 'videos'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artist sections */}
      {ARTISTS.map((artist, idx) => (
        <section
          key={artist.slug}
          className={`border-t border-line ${idx % 2 === 0 ? 'bg-surface/30' : ''}`}
        >
          <div className="mx-auto max-w-5xl px-6 py-16">
            {/* Artist header */}
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-start gap-4">
                {/* Artist icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber/20 to-signal/10 ring-1 ring-amber/20">
                  <span className="font-display text-xl font-extrabold text-amber">
                    {artist.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase sm:text-3xl">
                    {artist.name}
                  </h2>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-paper/55">
                    {artist.description}
                  </p>
                </div>
              </div>
              <a
                href={artist.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-surface px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-paper/70 transition-all hover:border-amber hover:bg-amber/10 hover:text-amber hover:shadow-lg hover:shadow-amber/5"
              >
                <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Visit Channel
                <svg className="h-3.5 w-3.5 text-paper/30 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>

            {/* Carousel */}
            <VideoCarousel videoIds={artist.videoIds} artistName={artist.name} />
          </div>
        </section>
      ))}

      {/* Content columns for SEO / AdSense */}
      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-12 sm:grid-cols-2">
            <div className="rounded-2xl border border-line/60 bg-surface/40 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-signal/10 ring-1 ring-signal/20">
                <svg className="h-6 w-6 text-signal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold uppercase">
                Learn from every session
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-paper/55">
                Our video content isn&apos;t just showcases — it&apos;s education. We break
                down our mixing decisions, share the reasoning behind EQ moves and
                compression settings, and show you the real-world techniques that
                make a mix translate across every speaker system.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/55">
                Whether you&apos;re an aspiring engineer looking to sharpen your skills
                or an artist who wants to understand what goes into a professional
                mix, our videos give you a front-row seat to the process.
              </p>
            </div>
            <div className="rounded-2xl border border-line/60 bg-surface/40 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber/10 ring-1 ring-amber/20">
                <svg className="h-6 w-6 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold uppercase">
                Spotlight on talent
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-paper/55">
                We believe in lifting up the artists we work with. Our featured
                artists section showcases talented independent musicians and
                producers whose work we&apos;ve had the privilege of mixing and
                mastering.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/55">
                Are you an artist who&apos;s worked with MixMaster Studio? We&apos;d love to
                feature your music here. Reach out after your project is complete
                and we&apos;ll add your videos to the carousel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">
            Like what you hear?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/60">
            Let us do the same for your music. Upload your stems and get a
            professional mix back in days.
          </p>
          <a
            href="/#order"
            className="focus-ring mt-8 inline-block rounded-md bg-amber px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-signal"
          >
            Start your order
          </a>
        </div>
      </section>
    </main>
  );
}
