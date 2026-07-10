import type { Metadata } from 'next';
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
});
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'MixMaster Studio — Professional Mixing & Mastering',
  description:
    'Upload your stems, tell us the sound you want, and get a radio-ready mix back in your inbox.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-paper font-body antialiased">
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-5xl items-center px-6 py-4">
            <a href="/" className="inline-block">
              <img src="/logo.png" alt="MixMaster Studio" className="h-12 w-auto" />
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
