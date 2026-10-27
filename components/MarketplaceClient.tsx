"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SafetyNote } from "@/components/SafetyNote";
import { getPlant } from "@/lib/plants";
import {
  productKinds,
  productsByName,
  stallListingsFor,
} from "@/lib/products";
import type { ProductKind } from "@/lib/types";

export function MarketplaceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kindParam = searchParams.get("kind");
  const kind: ProductKind | "all" = productKinds.some((item) => item.id === kindParam)
    ? (kindParam as ProductKind)
    : "all";
  const plantSlug = searchParams.get("plant") ?? "all";
  const selectedPlant = plantSlug === "all" ? undefined : getPlant(plantSlug);

  function patchParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all") params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    router.replace(qs ? `/marketplace?${qs}` : "/marketplace", { scroll: false });
  }

  const filtered = useMemo(() => {
    if (selectedPlant) {
      return stallListingsFor(selectedPlant.slug, kind, selectedPlant.name);
    }
    return productsByName(kind);
  }, [kind, selectedPlant]);

  return (
    <div>
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-[2.75rem]">
        The stall.
      </h1>
      <p className="mt-1 text-base font-light text-[var(--ink-soft)]">
        Products by name. Open a listing, or talk with Olive Tree.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => patchParams({ kind: "all" })}
          className={`rounded-full px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] ${
            kind === "all"
              ? "bg-[var(--ink)] text-white"
              : "border border-[rgba(44,36,22,0.14)] bg-white"
          }`}
        >
          All
        </button>
        {productKinds.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => patchParams({ kind: item.id })}
            className={`rounded-full px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] ${
              kind === item.id
                ? "bg-[var(--ink)] text-white"
                : "border border-[rgba(44,36,22,0.14)] bg-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {selectedPlant ? (
        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={() => patchParams({ plant: "all" })}
            className="font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            ← All products
          </button>
          <h2 className="font-display text-2xl text-[var(--ink)]">
            {selectedPlant.name}
          </h2>
          <Link
            href={`/library/${selectedPlant.slug}`}
            className="text-sm text-[var(--ink-soft)] hover:underline"
          >
            Open plant profile
          </Link>
        </div>
      ) : null}

      <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="py-10 text-sm font-light text-[var(--ink-soft)]">
            Nothing in this stall yet. Try another plant or kind.
          </p>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        )}
      </div>

      <SafetyNote className="mt-8" />
    </div>
  );
}
