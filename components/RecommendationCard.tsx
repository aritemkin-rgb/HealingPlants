"use client";

import Link from "next/link";
import { PlantPortrait } from "@/components/PlantPortrait";
import { PlaceholderBadge } from "@/components/SafetyNote";
import { useOptionalGuideController } from "@/components/GuideProvider";
import { concernLabels } from "@/lib/plants";
import type { RankedRecommendation } from "@/lib/recommendationEngine";

export function RecommendationCard({
  item,
  featured = false,
}: {
  item: RankedRecommendation;
  featured?: boolean;
}) {
  const guide = useOptionalGuideController();
  const { plant } = item;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[1.4rem] border bg-white ${
        featured
          ? "border-[rgba(44,36,22,0.08)] shadow-none"
          : "border-[rgba(44,36,22,0.1)]"
      }`}
    >
      <PlantPortrait
        slug={plant.slug}
        name={plant.name}
        size={featured ? "hero" : "tile"}
        className={featured ? "mx-auto h-64 w-64" : "mx-auto mt-3 h-28 w-28"}
      />
      <div className={`flex flex-1 flex-col p-4 ${featured ? "gap-2" : "gap-3"}`}>
        <div>
          {featured ? (
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.16em] text-[var(--moss)]">
              Highest on this path
            </p>
          ) : (
            <PlaceholderBadge label="TO BE VERIFIED" />
          )}
          <h3 className="mt-1 font-display text-2xl leading-tight">{plant.name}</h3>
        </div>
        <p className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-[var(--terracotta)]">
          {plant.ambassador ? `Ambassador · ${plant.ambassador}` : item.systemRole}
          {" · "}
          {plant.concerns.map((concern) => concernLabels[concern]).join(" · ")}
        </p>
        {item.matchedConcerns.length > 1 ? (
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.12em] text-[var(--moss)]">
            Overlap · {item.matchedConcerns.map((concern) => concernLabels[concern]).join(" + ")}
          </p>
        ) : null}
        <p className={`text-sm leading-relaxed ${featured ? "line-clamp-2" : ""}`}>
          {item.placeholderBenefit}
        </p>
        {featured ? null : (
          <>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
              {item.placeholderSafetyNote}
            </p>
            <p className="text-[0.65rem] text-[var(--ink-soft)]">{item.evidenceNote}</p>
          </>
        )}
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              guide?.openGuide({
                plantSlug: plant.slug,
                plantName: plant.name,
                message: `Tell me about ${plant.name}.`,
              })
            }
            className="rounded-full bg-[var(--soil)] px-3 py-1.5 font-sans text-[0.68rem] uppercase tracking-[0.14em] text-[var(--root-gold)]"
          >
            Chat
          </button>
          <Link
            href={`/marketplace?plant=${plant.slug}`}
            className="rounded-full border border-[rgba(44,36,22,0.16)] px-3 py-1.5 font-sans text-[0.68rem] uppercase tracking-[0.14em]"
          >
            Buy
          </Link>
          <Link
            href={`/library/${plant.slug}`}
            className="rounded-full border border-[rgba(44,36,22,0.16)] px-3 py-1.5 font-sans text-[0.68rem] uppercase tracking-[0.14em]"
          >
            Learn more
          </Link>
        </div>
      </div>
    </article>
  );
}
