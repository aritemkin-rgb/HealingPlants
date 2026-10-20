"use client";

import Link from "next/link";
import { productKinds } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col bg-white p-5 ring-1 ring-[rgba(44,36,22,0.08)]">
      <p className="font-condensed text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent-orange)]">
        {productKinds.find((item) => item.id === product.kind)?.label}
      </p>
      <h2 className="mt-2 font-display text-2xl text-[var(--ink)]">{product.name}</h2>
      <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-[var(--ink-soft)]">
        {product.blurb}
      </p>
      <p className="mt-3 font-condensed text-[0.68rem] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
        Future Shopify connection
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-display text-xl">{product.price}</span>
        {product.plantSlug ? (
          <Link
            href={`/library/${product.plantSlug}`}
            className="font-condensed text-[0.68rem] uppercase tracking-[0.14em]"
          >
            Learn more
          </Link>
        ) : null}
      </div>
      <button
        type="button"
        disabled
        className="mt-4 rounded-full bg-[var(--ink)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-55"
      >
        Buy — not connected
      </button>
    </article>
  );
}
