import Link from "next/link";
import { productKinds } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const kindLabel = productKinds.find((item) => item.id === product.kind)?.label;

  return (
    <Link
      href={`/marketplace/${product.slug}`}
      className="group flex flex-col border-b border-[rgba(44,36,22,0.08)] py-5"
    >
      <div className="flex h-44 items-center justify-center bg-white">
        {product.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain object-center"
          />
        ) : (
          <span className="px-3 text-center font-condensed text-[0.68rem] uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            {kindLabel}
          </span>
        )}
      </div>
      <p className="mt-3 font-condensed text-[0.62rem] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
        {kindLabel}
      </p>
      <h2 className="mt-1 font-display text-lg leading-snug text-[var(--ink)] group-hover:underline">
        {product.name}
      </h2>
      <p className="mt-2 font-display text-xl text-[var(--ink)]">{product.price}</p>
    </Link>
  );
}
