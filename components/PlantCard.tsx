"use client";

import Link from "next/link";
import { PlantPortrait } from "@/components/PlantPortrait";
import { useOptionalGuideController } from "@/components/GuideProvider";
import { concernLabels } from "@/lib/plants";
import type { Plant } from "@/lib/types";

export function PlantCard({
  plant,
  compact = false,
}: {
  plant: Plant;
  compact?: boolean;
}) {
  const guide = useOptionalGuideController();

  return (
    <article className="flex flex-col overflow-hidden rounded-[1.4rem] border border-[rgba(44,36,22,0.1)] bg-white text-[var(--ink)]">
      <PlantPortrait
        slug={plant.slug}
        name={plant.name}
        className="mx-auto mt-4 h-32 w-32"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[var(--moss)]">
            {plant.geography}
          </p>
          <h3 className="font-display text-2xl leading-tight">{plant.name}</h3>
        </div>
        {compact ? null : (
          <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{plant.summary}</p>
        )}
        <p className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-[var(--terracotta)]">
          {plant.concerns.map((concern) => concernLabels[concern]).join(" · ")}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          <Link
            href={`/library/${plant.slug}`}
            className="rounded-full bg-[var(--soil)] px-3 py-1.5 font-sans text-[0.68rem] uppercase tracking-[0.14em] text-[var(--root-gold)]"
          >
            Learn more
          </Link>
          <Link
            href={`/marketplace?plant=${plant.slug}`}
            className="rounded-full border border-[rgba(44,36,22,0.16)] px-3 py-1.5 font-sans text-[0.68rem] uppercase tracking-[0.14em]"
          >
            Buy
          </Link>
          <button
            type="button"
            onClick={() =>
              guide?.openGuide({
                plantSlug: plant.slug,
                plantName: plant.name,
                message: `Tell me about ${plant.name}.`,
              })
            }
            className="rounded-full border border-[rgba(44,36,22,0.16)] px-3 py-1.5 font-sans text-[0.68rem] uppercase tracking-[0.14em]"
          >
            Chat
          </button>
        </div>
      </div>
    </article>
  );
}
