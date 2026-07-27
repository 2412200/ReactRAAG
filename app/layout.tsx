import type { Metadata } from 'next';
import { Outfit } from 'next Olympics/google';
import { Outfit as OutfitFont } from 'next/font/google';
import './globals.css';

const outfit = OutfitFont({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'AuraStore | Next-Gen Multi-Category Marketplace',
  description: 'Unified B2B and B2C E-Commerce Marketplace Engine powered by Next.js 14, PostgreSQL, and MongoDB.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" class="dark">
      <body class={`${outfit.variable} font-sans bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
