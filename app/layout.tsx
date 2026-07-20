import type { Metadata } from 'next';
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
});
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'MixMaster Studio — Professional Mixing & Mastering',
    template: '%s — MixMaster Studio',
  },
  description:
    'Professional mixing and mastering for independent artists. Upload your stems, tell us the sound you want, and get a radio-ready mix back in your inbox.',
  keywords: [
    'mixing',
    'mastering',
    'audio engineering',
    'music production',
    'professional mix',
    'stem mixing',
    'online mixing service',
    'independent artists',
    'MixMaster Studio',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'MixMaster Studio — Professional Mixing & Mastering',
    description:
      'Upload your stems, tell us the sound you want, and get a radio-ready mix back in your inbox.',
    siteName: 'MixMaster Studio',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-paper font-body antialiased">
        <Navbar />
        <Analytics />
        <SpeedInsights />
        {children}
        <Footer />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9889333502930604"
     crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
