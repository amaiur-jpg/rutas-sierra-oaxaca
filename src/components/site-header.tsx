import Link from 'next/link';

import { site } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="border-b-2 border-forest bg-brand text-paper">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
        <Link className="flex items-center gap-2.5 font-display text-base font-bold tracking-tight sm:text-lg" href="/">
          <svg aria-hidden className="size-7 shrink-0" viewBox="0 0 64 64">
            <path d="M6 50 24 22l9 13 7-10 18 25z" fill="#F3EEE1" />
            <circle cx="46" cy="16" r="5" fill="#D9A441" />
          </svg>
          {site.name}
        </Link>
      </div>
    </header>
  );
}
