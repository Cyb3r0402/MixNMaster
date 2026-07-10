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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-paper font-body antialiased">{children}</body>
    </html>
  );
}
