'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

interface VideoCarouselProps {
  videoIds: string[];
  artistName: string;
  /** Auto-advance interval in seconds (default: 10). Set 0 to disable. */
  autoPlayInterval?: number;
}

/**
 * Deterministic shuffle based on a numeric seed.
 * Same seed → same order. Different hour of the day → different seed → different order.
 */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Simple LCG-style PRNG
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function VideoCarousel({
  videoIds,
  artistName,
  autoPlayInterval = 10,
}: VideoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [totalVisible, setTotalVisible] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Shuffle video order based on the current 3-hour window
  // Changes ~8 times per day, giving visitors a fresh order each visit
  const shuffledIds = useMemo(() => {
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const timeSlot = Math.floor(now.getHours() / 3); // 0-7, changes every 3 hours
    const seed = dayOfYear * 8 + timeSlot;
    return seededShuffle(videoIds, seed);
  }, [videoIds]);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>('.carousel-card');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 20;
    const containerWidth = el.clientWidth;

    setTotalVisible(Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap))));

    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(index, shuffledIds.length - 1)));
  }, [shuffledIds.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    updateScrollState();
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Auto-advance logic
  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const firstCard = el.querySelector<HTMLElement>('.carousel-card');
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const gap = 20;
      el.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
    },
    []
  );

  const advanceCarousel = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + 1 >= shuffledIds.length ? 0 : prev + 1;
      // Schedule the scroll on next tick so state is consistent
      setTimeout(() => scrollToIndex(next), 0);
      return next;
    });
  }, [shuffledIds.length, scrollToIndex]);

  // Set up auto-play timer
  useEffect(() => {
    if (autoPlayInterval <= 0 || isPaused || shuffledIds.length <= 1) return;

    autoTimerRef.current = setInterval(advanceCarousel, autoPlayInterval * 1000);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [autoPlayInterval, isPaused, advanceCarousel, shuffledIds.length]);

  // Reset timer when user manually navigates
  const resetTimer = useCallback(() => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (autoPlayInterval > 0 && !isPaused && shuffledIds.length > 1) {
      autoTimerRef.current = setInterval(advanceCarousel, autoPlayInterval * 1000);
    }
  }, [autoPlayInterval, isPaused, advanceCarousel, shuffledIds.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>('.carousel-card');
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const gap = 20;
    const amount = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    resetTimer();
  };

  const handleDotClick = (index: number) => {
    scrollToIndex(index);
    resetTimer();
  };

  // Empty state
  if (shuffledIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line/60 bg-gradient-to-br from-surface/60 to-surface/30 px-8 py-24 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber/5 ring-1 ring-amber/10">
          <svg className="h-10 w-10 text-amber/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
          </svg>
        </div>
        <p className="font-display text-xl font-bold uppercase text-paper/50">
          Videos coming soon
        </p>
        <p className="mt-2 max-w-xs text-sm text-paper/30">
          {artistName}&apos;s latest content will appear here. Stay tuned.
        </p>
      </div>
    );
  }

  const showNav = shuffledIds.length > totalVisible;

  return (
    <div
      className="group/carousel relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient fade edges */}
      {showNav && (
        <>
          <div
            className={`pointer-events-none absolute left-0 top-0 z-[5] h-full w-16 bg-gradient-to-r from-ink to-transparent transition-opacity duration-300 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`pointer-events-none absolute right-0 top-0 z-[5] h-full w-16 bg-gradient-to-l from-ink to-transparent transition-opacity duration-300 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="carousel-scroll flex gap-5 overflow-x-auto scroll-smooth"
        style={{ scrollSnapType: 'x mandatory', scrollPaddingLeft: '0px' }}
      >
        {shuffledIds.map((id, i) => (
          <div
            key={id}
            className="carousel-card w-[min(85vw,420px)] shrink-0 sm:w-[min(45vw,420px)] lg:w-[calc((100%-40px)/3)]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="overflow-hidden rounded-2xl border border-line/80 bg-surface ring-1 ring-white/[0.03] transition-all duration-300 hover:border-amber/30 hover:ring-amber/10 hover:shadow-xl hover:shadow-amber/[0.04]">
              {/* Video */}
              <div className="relative aspect-video w-full bg-ink">
                <iframe
                  src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                  title={`${artistName} — Video ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              {/* Card footer */}
              <div className="flex items-center justify-between px-4 py-3">
                <p className="font-mono text-xs tracking-wide text-paper/40">
                  <span className="text-amber/60">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mx-2 text-line">|</span>
                  {artistName}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-paper/30 transition-colors hover:text-amber"
                  aria-label="Open on YouTube"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows — appear on hover */}
      {showNav && (
        <>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-[calc(50%-28px)] z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-surface/90 backdrop-blur-sm shadow-lg shadow-black/30 transition-all duration-300 ${
              canScrollLeft
                ? 'border-line/80 text-paper opacity-0 group-hover/carousel:opacity-100 hover:border-amber hover:bg-amber/15 hover:text-amber'
                : 'pointer-events-none opacity-0'
            }`}
            aria-label="Previous video"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-2 top-[calc(50%-28px)] z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-surface/90 backdrop-blur-sm shadow-lg shadow-black/30 transition-all duration-300 ${
              canScrollRight
                ? 'border-line/80 text-paper opacity-0 group-hover/carousel:opacity-100 hover:border-amber hover:bg-amber/15 hover:text-amber'
                : 'pointer-events-none opacity-0'
            }`}
            aria-label="Next video"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators with counter + auto-play indicator */}
      {showNav && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="font-mono text-xs text-paper/25">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1.5">
            {shuffledIds.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`relative rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'h-2 w-6 bg-amber shadow-sm shadow-amber/30'
                    : 'h-1.5 w-1.5 bg-paper/15 hover:bg-paper/30'
                }`}
                aria-label={`Go to video ${i + 1}`}
              >
                {/* Auto-play progress bar on active dot */}
                {i === activeIndex && autoPlayInterval > 0 && !isPaused && (
                  <span
                    className="absolute inset-0 rounded-full bg-signal/60 origin-left"
                    style={{
                      animation: `carousel-progress ${autoPlayInterval}s linear infinite`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-paper/25">
            {String(shuffledIds.length).padStart(2, '0')}
          </span>
          {/* Pause indicator */}
          {isPaused && autoPlayInterval > 0 && (
            <span className="ml-1 font-mono text-[10px] uppercase tracking-widest text-paper/20">
              paused
            </span>
          )}
        </div>
      )}
    </div>
  );
}
