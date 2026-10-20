"use client";

import { usePathname } from "next/navigation";

export function DirtHorizon() {
  const pathname = usePathname();
  if (pathname.startsWith("/library")) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-24 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(197, 165, 114, 0.16) 55%, rgba(26, 22, 19, 0.32) 100%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo/logo-dirt.png"
        alt=""
        className="dirt-mask absolute inset-x-0 bottom-0 h-16 w-full object-cover object-bottom"
      />
    </div>
  );
}
