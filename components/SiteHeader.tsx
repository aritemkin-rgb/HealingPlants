"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#archive", label: "Plant Library", match: "/" },
  { href: "/healing-guide", label: "Healing Guide", match: "/healing-guide" },
  { href: "/marketplace", label: "Marketplace", match: "/marketplace" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(44,36,22,0.06)] bg-white text-[var(--ink)]">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="relative block h-11 w-11 shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo/logo-horizontal.png"
            alt="Healing Plants of the World"
            className="absolute inset-y-0 left-0 h-full w-auto max-w-none"
          />
        </Link>
        <nav className="hidden flex-1 items-center justify-evenly md:flex">
          {links.map((link) => {
            const active =
              link.match === "/healing-guide"
                ? pathname.startsWith("/healing-guide")
                : link.match === "/marketplace"
                  ? pathname.startsWith("/marketplace")
                  : pathname.startsWith("/library");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-condensed text-[1.05rem] uppercase tracking-[0.1em] ${
                  active
                    ? "text-[var(--accent-orange)]"
                    : "text-[var(--ink)] hover:text-[var(--accent-orange)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <span className="hidden w-11 md:block" aria-hidden />
      </div>
      <nav className="flex justify-center gap-6 overflow-x-auto px-4 pb-3 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 font-condensed text-[0.95rem] uppercase tracking-[0.1em] text-[var(--ink)]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
