import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Bitter, Karla } from 'next/font/google';

import { SiteHeader } from '@/components/site-header';
import { site } from '@/lib/site';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

const heading = Bitter({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '700', '800'],
});

const body = Karla({
  subsets: ['latin'],
  variable: '--font-body',
});

const fonts = `${heading.variable} ${body.variable}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={fonts} lang="es">
      <body className="flex min-h-dvh flex-col bg-[#F3EEE1] font-sans text-[#1E2B26] antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
