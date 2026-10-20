"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { MoneyTreeStall } from "@/components/MoneyTreeStall";
import { PlantPortrait } from "@/components/PlantPortrait";
import { SafetyNote } from "@/components/SafetyNote";
import { plantPortraitSrc } from "@/lib/media";
import { getPlant, plants } from "@/lib/plants";
import { productKinds, products, stallListingsFor } from "@/lib/products";
import type { Product, ProductKind } from "@/lib/types";

function MarketplaceListing({ product }: { product: Product }) {
  const kindLabel = productKinds.find((item) => item.id === product.kind)?.label;

  return (
    <article className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-start gap-4 border-b border-[rgba(44,36,22,0.08)] py-5">
      <div className="flex items-start justify-center bg-white">
        {product.plantSlug ? (
          <PlantPortrait
            slug={product.plantSlug}
            name={product.name}
            className="h-[7.5rem] w-[7.5rem]"
          />
        ) : (
          <div className="flex h-[7.5rem] w-[7.5rem] items-center justify-center bg-[rgba(44,36,22,0.04)] px-2 text-center font-condensed text-[0.68rem] uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            {kindLabel}
          </div>
        )}
      </div>
      <div className="min-w-0">
        {product.plantSlug ? (
          <Link
            href={`/library/${product.plantSlug}`}
            className="font-display text-lg leading-snug text-[var(--ink)] hover:underline"
          >
            {product.name}
          </Link>
        ) : (
          <h2 className="font-display text-lg leading-snug text-[var(--ink)]">{product.name}</h2>
        )}
        <p className="mt-1 text-sm font-light leading-relaxed text-[var(--ink-soft)]">
          {product.blurb}
        </p>
        <p className="mt-2 font-display text-xl text-[var(--ink)]">{product.price}</p>
        <p className="mt-1 font-condensed text-[0.62rem] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
          {kindLabel} · future Shopify
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled
            className="rounded-full bg-[var(--gold)] px-3.5 py-1.5 font-condensed text-[0.68rem] uppercase tracking-[0.12em] text-[var(--soil-brown)] disabled:cursor-not-allowed"
          >
            Add to cart
          </button>
          {product.plantSlug ? (
            <Link
              href={`/library/${product.plantSlug}`}
              className="rounded-full border border-[rgba(44,36,22,0.14)] px-3 py-1.5 font-condensed text-[0.68rem] uppercase tracking-[0.12em]"
            >
              Learn more
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function MarketplaceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kindParam = searchParams.get("kind");
  const kind: ProductKind | "all" = productKinds.some((item) => item.id === kindParam)
    ? (kindParam as ProductKind)
    : "all";
  const plantSlug = searchParams.get("plant") ?? "all";
  const talkOpen = searchParams.get("talk") === "1";
  const selectedPlant = plantSlug === "all" ? undefined : getPlant(plantSlug);
  const showSections = !selectedPlant && kind !== "growing";

  const sections = useMemo(
    () => plants.filter((plant) => Boolean(plantPortraitSrc(plant.slug))),
    [],
  );

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
    return products.filter((product) => kind === "all" || product.kind === kind);
  }, [kind, selectedPlant]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <h1 className="font-display text-4xl text-[var(--ink)] md:text-[2.75rem]">
            The stall.
          </h1>
          <p className="mt-1 text-base font-light text-[var(--ink-soft)]">
            {showSections
              ? "The plant portraits are the shop. Open a stall, or talk with Olive Tree."
              : "Browse the mock shop. Talk with Olive Tree if you want a nudge."}
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
                onClick={() => patchParams({ kind: item.id, plant: item.id === "growing" ? "all" : plantSlug })}
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

          {showSections ? (
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
              {sections.map((plant) => (
                <button
                  key={plant.slug}
                  type="button"
                  onClick={() => patchParams({ plant: plant.slug })}
                  className="group text-left"
                >
                  <div className="aspect-square w-full bg-white">
                    <PlantPortrait
                      slug={plant.slug}
                      name={plant.name}
                      className="h-full w-full"
                    />
                  </div>
                  <p className="mt-2 font-display text-[0.95rem] leading-tight text-[var(--ink)] group-hover:underline">
                    {plant.name}
                  </p>
                </button>
              ))}
              {kind === "all" ? (
                <button
                  type="button"
                  onClick={() => patchParams({ kind: "growing" })}
                  className="group text-left"
                >
                  <div className="flex aspect-square w-full items-center justify-center bg-[rgba(44,36,22,0.04)] px-3 text-center">
                    <span className="font-condensed text-[0.72rem] uppercase tracking-[0.16em] text-[var(--ink-soft)] group-hover:text-[var(--ink)]">
                      Growing tools
                    </span>
                  </div>
                  <p className="mt-2 font-display text-[0.95rem] leading-tight text-[var(--ink)] group-hover:underline">
                    Growing tools
                  </p>
                </button>
              ) : null}
            </div>
          ) : (
            <>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => patchParams({ plant: "all", kind: kind === "growing" ? "all" : kind })}
                  className="font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  ← All stalls
                </button>
              </div>

              {selectedPlant ? (
                <div className="mt-5 flex items-center gap-4">
                  <PlantPortrait
                    slug={selectedPlant.slug}
                    name={selectedPlant.name}
                    className="h-24 w-24"
                  />
                  <div>
                    <h2 className="font-display text-3xl text-[var(--ink)]">
                      {selectedPlant.name}
                    </h2>
                    <Link
                      href={`/library/${selectedPlant.slug}`}
                      className="mt-1 inline-block text-sm text-[var(--ink-soft)] hover:underline"
                    >
                      Open plant profile
                    </Link>
                  </div>
                </div>
              ) : null}

              <div className="mt-4 grid gap-x-8 md:grid-cols-2">
                {filtered.length === 0 ? (
                  <p className="py-10 text-sm font-light text-[var(--ink-soft)]">
                    Nothing in this stall yet. Try another plant or kind.
                  </p>
                ) : (
                  filtered.map((product) => (
                    <MarketplaceListing key={product.slug} product={product} />
                  ))
                )}
              </div>
            </>
          )}

          <SafetyNote className="mt-8" />
        </div>

        <div className="max-lg:mt-10 lg:fixed lg:bottom-4 lg:right-8 lg:z-20 lg:w-[22rem]">
          <MoneyTreeStall initialOpen={talkOpen} />
        </div>
      </div>
    </div>
  );
}
