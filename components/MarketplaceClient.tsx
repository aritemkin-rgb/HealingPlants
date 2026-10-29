"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PlantCabinetVideo } from "@/components/PlantCabinetVideo";
import { ProductCard } from "@/components/ProductCard";
import { SafetyNote } from "@/components/SafetyNote";
import { getPlant } from "@/lib/plants";
import {
  productKinds,
  productsByName,
  stallListingsFor,
} from "@/lib/products";
import type { ProductKind } from "@/lib/types";

const shelves = [
  { id: "products", label: "Products" },
  { id: "seeds", label: "Seeds and Plants" },
  { id: "teaware", label: "Teaware" },
  { id: "cabinet", label: "My Plant Cabinet" },
] as const;

type StallShelf = (typeof shelves)[number]["id"];

const kindChips: { id: ProductKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "liquid", label: "Tinctures" },
  { id: "teas-and-herbs", label: "Teas" },
  { id: "supplements", label: "Capsules" },
];

export function MarketplaceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kindParam = searchParams.get("kind");
  const kind: ProductKind | "all" = productKinds.some((item) => item.id === kindParam)
    ? (kindParam as ProductKind)
    : "all";
  const shelfParam = searchParams.get("shelf");
  const shelf: StallShelf = shelves.some((item) => item.id === shelfParam)
    ? (shelfParam as StallShelf)
    : "products";
  const plantSlug = searchParams.get("plant") ?? "all";
  const selectedPlant = plantSlug === "all" ? undefined : getPlant(plantSlug);

  function patchParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all" || (key === "shelf" && value === "products")) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const qs = params.toString();
    router.replace(qs ? `/marketplace?${qs}` : "/marketplace", { scroll: false });
  }

  const filtered = useMemo(() => {
    if (shelf !== "products") return [];
    if (selectedPlant) {
      return stallListingsFor(selectedPlant.slug, kind, selectedPlant.name);
    }
    return productsByName(kind);
  }, [kind, selectedPlant, shelf]);

  return (
    <div>
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-[2.75rem]">
        The stall.
      </h1>
      <p className="mt-1 text-base font-light text-[var(--ink-soft)]">
        Open a stall, or talk with Olive Tree.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {shelves.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              patchParams({ shelf: item.id, kind: "all", plant: "all" })
            }
            className={`rounded-full px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] ${
              shelf === item.id
                ? "bg-[var(--ink)] text-white"
                : "border border-[rgba(44,36,22,0.14)] bg-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {shelf === "products" ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {kindChips.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => patchParams({ kind: item.id, shelf: "products" })}
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
      ) : null}

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

      {shelf === "cabinet" ? (
        <PlantCabinetVideo />
      ) : (
        <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {filtered.length === 0 ? (
            <p className="py-10 text-sm font-light text-[var(--ink-soft)]">
              {shelf === "products"
                ? "Nothing in this stall yet. Try another plant or kind."
                : `${shelves.find((item) => item.id === shelf)?.label} is coming.`}
            </p>
          ) : (
            filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))
          )}
        </div>
      )}

      <SafetyNote className="mt-8" />
    </div>
  );
}
