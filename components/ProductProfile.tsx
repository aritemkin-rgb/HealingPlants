import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SafetyNote } from "@/components/SafetyNote";
import { getPlant } from "@/lib/plants";
import { getProductsForPlant, productKinds, relatedProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductProfile({ product }: { product: Product }) {
  const kindLabel = productKinds.find((item) => item.id === product.kind)?.label;
  const plant = product.plantSlug ? getPlant(product.plantSlug) : undefined;
  const samePlant = product.plantSlug
    ? getProductsForPlant(product.plantSlug).filter((item) => item.slug !== product.slug)
    : [];
  const more = relatedProducts(product);
  const moreLabel =
    samePlant.length && plant ? `More for ${plant.name}` : "Also in this stall";

  return (
    <article>
      <Link
        href="/marketplace"
        className="font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink-soft)] hover:text-[var(--ink)]"
      >
        ← All products
      </Link>

      <div className="mt-6 grid items-start gap-8 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <div className="flex aspect-square items-center justify-center bg-white">
          {product.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain object-center"
            />
          ) : (
            <span className="px-4 text-center font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              {kindLabel}
            </span>
          )}
        </div>

        <div>
          <p className="font-condensed text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            {kindLabel} · future Shopify
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-[var(--ink)] md:text-[2.5rem]">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-2xl text-[var(--ink)]">{product.price}</p>
          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-[var(--ink)]">
            {product.blurb}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled
              className="rounded-full bg-[var(--gold)] px-5 py-2.5 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] disabled:cursor-not-allowed"
            >
              Add to cart
            </button>
            {plant ? (
              <Link
                href={`/library/${plant.slug}`}
                className="rounded-full border border-[rgba(44,36,22,0.14)] px-4 py-2.5 font-condensed text-[0.72rem] uppercase tracking-[0.14em]"
              >
                About {plant.name}
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {more.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-condensed text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            {moreLabel}
          </h2>
          <div className="mt-2 grid gap-x-8 sm:grid-cols-2">
            {more.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      <SafetyNote className="mt-10" />
    </article>
  );
}
