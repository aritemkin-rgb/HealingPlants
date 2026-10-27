import Link from "next/link";
import { PlantPortrait } from "@/components/PlantPortrait";
import { PlantProfileActions } from "@/components/PlantProfileActions";
import { SafetyNote } from "@/components/SafetyNote";
import { getAmbassador } from "@/lib/knowledgeBase";
import { getPlantsByConcern } from "@/lib/plants";
import { getProductsForPlant } from "@/lib/products";
import type { Plant } from "@/lib/types";

export function PlantProfile({ plant }: { plant: Plant }) {
  const related = getPlantsByConcern(plant.concerns[0]).filter(
    (item) => item.slug !== plant.slug,
  );
  const shop = getProductsForPlant(plant.slug);
  const ambassador = plant.ambassador
    ? getAmbassador(plant.slug)
    : undefined;

  return (
    <article className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <p className="font-condensed text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
        Plant profile · {plant.geography}
      </p>
      <div className="mt-4 grid items-start gap-10 lg:grid-cols-[1.1fr_auto]">
        <div>
          <h1 className="font-display text-5xl text-[var(--parchment)]">{plant.name}</h1>
          {plant.ambassador ? (
            <p className="mt-3 font-condensed text-[0.72rem] uppercase tracking-[0.16em] text-[var(--gold)]">
              Ambassador · {plant.ambassador}
              {ambassador && !ambassador.talking ? " · visual presence only" : ""}
            </p>
          ) : null}
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-[rgba(243,235,221,0.9)]">
            {plant.summary}
          </p>
          <PlantProfileActions plant={plant} />
          <div className="mt-5 max-w-2xl rounded-2xl bg-white p-4 text-[var(--ink)]">
            <SafetyNote />
          </div>
        </div>
        <PlantPortrait
          slug={plant.slug}
          name={plant.name}
          size="hero"
          className="h-64 w-64 md:h-72 md:w-72"
        />
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.4rem] bg-white p-6 text-[var(--ink)]">
          <h2 className="font-display text-3xl">Benefits and traditional uses</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-soft)]">
            {plant.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 font-light leading-relaxed">{plant.traditionalUses}</p>
        </div>
        <div className="rounded-[1.4rem] bg-white p-6 text-[var(--ink)]">
          <h2 className="font-display text-3xl">Precautions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-soft)]">
            {plant.precautions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.4rem] bg-white p-6 text-[var(--ink)]">
          <h2 className="font-display text-3xl">Prepare</h2>
          <p className="mt-4 font-light leading-relaxed">{plant.preparation}</p>
        </div>
        <div className="rounded-[1.4rem] bg-white p-6 text-[var(--ink)]">
          <h2 className="font-display text-3xl">Dosage</h2>
          <p className="mt-4 font-light leading-relaxed text-[var(--ink-soft)]">
            Dosage is not provided in this prototype. A later sourced record can
            sit here. Do not treat any number on this site as a prescription.
          </p>
        </div>
        <div className="rounded-[1.4rem] bg-white p-6 text-[var(--ink)]">
          <h2 className="font-display text-3xl">Grow</h2>
          <p className="mt-4 font-light leading-relaxed">{plant.grow}</p>
          <p className="mt-3 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--leaf)]">
            {plant.gardenNotes.join(" · ")}
          </p>
        </div>
        <div className="rounded-[1.4rem] bg-white p-6 text-[var(--ink)]">
          <h2 className="font-display text-3xl">Cultural context</h2>
          <p className="mt-4 font-light leading-relaxed text-[var(--ink-soft)]">
            Character-led stories and cultural notes will live here once Maria’s
            research pass is in. Region on this card: {plant.region}.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl text-[var(--parchment)]">Buy</h2>
        <p className="mt-1 font-condensed text-[0.68rem] uppercase tracking-[0.14em] text-[var(--gold)]">
          Future Shopify connection
        </p>
        {shop.length === 0 ? (
          <p className="mt-3 font-light text-[rgba(243,235,221,0.75)]">
            No stall listing yet.{" "}
            <Link href="/marketplace" className="underline">
              Browse the stall
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {shop.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/marketplace/${product.slug}`}
                  className="flex gap-3 rounded-2xl bg-white p-4 text-[var(--ink)] hover:ring-1 hover:ring-[rgba(44,36,22,0.12)]"
                >
                  {product.image ? (
                    <div className="h-20 w-20 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <p className="font-display text-xl">{product.name}</p>
                    <p className="text-sm font-light text-[var(--ink-soft)]">{product.blurb}</p>
                    <p className="mt-2">{product.price}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Link
          href={`/marketplace?plant=${plant.slug}`}
          className="mt-4 inline-block rounded-full bg-white px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink)]"
        >
          Open marketplace
        </Link>
      </section>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display text-3xl text-[var(--parchment)]">Nearby on this path</h2>
          <div className="mt-6 flex flex-wrap gap-6">
            {related.slice(0, 6).map((item) => (
              <Link
                key={item.slug}
                href={`/library/${item.slug}`}
                className="flex w-28 flex-col items-center text-center"
              >
                <PlantPortrait slug={item.slug} name={item.name} size="thumb" className="h-24 w-24" />
                <span className="mt-2 text-sm text-[var(--gold)]">{item.name}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
