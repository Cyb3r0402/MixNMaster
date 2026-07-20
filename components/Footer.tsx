import Link from 'next/link';

const FOOTER_LINKS = {
  navigate: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/videos', label: 'Videos' },
    { href: '/#order', label: 'Start Order' },
  ],
  legal: [
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="MixMaster Studio" className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/50">
              Professional mixing &amp; mastering for independent artists. Upload
              your stems, get radio-ready mixes back in your inbox.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-amber">
              Navigate
            </h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.navigate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/60 transition-colors hover:text-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-amber">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/60 transition-colors hover:text-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <h4 className="mt-8 font-display text-sm font-bold uppercase tracking-widest text-amber">
              Connect
            </h4>
            <div className="mt-4 flex gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface transition-all hover:border-amber hover:bg-amber/10"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5 text-paper/60 transition-colors group-hover:text-amber" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="mailto:kalebmay18@gmail.com"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface transition-all hover:border-amber hover:bg-amber/10"
                aria-label="Email"
              >
                <svg className="h-5 w-5 text-paper/60 transition-colors group-hover:text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-line pt-8 text-center">
          <p className="text-xs text-paper/30">
            &copy; {year} MixMaster Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
