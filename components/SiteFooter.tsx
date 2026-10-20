"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dirtFooter } from "@/lib/media";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/healing-guide") || pathname.startsWith("/marketplace")) return null;

  const onDirtPage = pathname.startsWith("/library");

  return (
    <footer data-site-footer className="relative z-10 mt-auto overflow-hidden">
      {onDirtPage ? null : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-white via-[rgba(255,255,255,0.65)] to-transparent"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dirtFooter}
        alt=""
        className="block h-[18rem] w-full object-cover object-bottom md:h-[22rem]"
      />
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-8">
          <p className="max-w-md text-sm leading-relaxed text-[rgba(243,235,221,0.85)]">
            An educational plant guide. Not a diagnosis.
          </p>
          <div className="flex flex-wrap gap-5 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[var(--gold)]">
            <Link href="/#archive">Archive</Link>
            <Link href="/healing-guide">Guide</Link>
            <Link href="/marketplace">Marketplace</Link>
            <span>Subscribe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
