'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/videos', label: 'Videos' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-ink/80 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'border-b border-line bg-ink'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="inline-block shrink-0">
          <img src="/logo.png" alt="MixMaster Studio" className="h-12 w-auto" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative font-display text-sm font-bold uppercase tracking-widest transition-colors hover:text-amber ${
                  pathname === link.href ? 'text-amber' : 'text-paper/70'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber nav-underline" />
                )}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#order"
              className="focus-ring rounded-md bg-amber px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-signal"
            >
              Start Order
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus-ring relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <span
              className={`block h-0.5 w-6 rounded-full bg-paper transition-all duration-300 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-paper transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-paper transition-all duration-300 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '0' }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-3xl font-bold uppercase tracking-widest transition-colors hover:text-amber ${
                pathname === link.href ? 'text-amber' : 'text-paper/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#order"
            onClick={() => setMenuOpen(false)}
            className="focus-ring mt-4 rounded-md bg-amber px-8 py-4 font-display text-xl font-bold uppercase tracking-wide text-ink transition hover:bg-signal"
          >
            Start Order
          </Link>
        </div>
      </div>
    </header>
  );
}
