import categories from "@/data/healingCategories.json";
import rankings from "@/data/plantRankings.json";
import symptomMap from "@/data/symptomMap.json";
import { getPlant } from "@/lib/plants";
import type { Plant, PlantConcern } from "@/lib/types";

export type HealingCategory = (typeof categories)[number];

export const healingCategories = categories as HealingCategory[];

export function getCategory(id: string | null | undefined) {
  return healingCategories.find((item) => item.id === id);
}

export function isPlantConcern(id: string): id is PlantConcern {
  return healingCategories.some((item) => item.id === id);
}

export type RecommendationQuery = {
  concern?: string;
  concerns?: string[];
  issue?: string;
  issues?: string[];
  intensity?: number;
};

export type RankedRecommendation = {
  plant: Plant;
  rank: number;
  systemRole: "Ambassador" | "Primary" | "Secondary";
  evidenceNote: "PLACEHOLDER — role in the prototype, not a clinical evidence grade";
  placeholderBenefit: string;
  placeholderSafetyNote: string;
  matchedConcerns: PlantConcern[];
};

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

export function parseIdList(
  ...values: Array<string | string[] | null | undefined>
): string[] {
  return unique(
    values.flatMap((value) => {
      if (!value) return [];
      const list = Array.isArray(value) ? value : [value];
      return list.flatMap((item) =>
        item
          .split(",")
          .map((part) => part.trim())
          .filter(Boolean),
      );
    }),
  );
}

export function normalizeRecommendationQuery(query: RecommendationQuery): {
  concerns: PlantConcern[];
  issues: string[];
  intensity?: number;
} {
  const concerns = parseIdList(query.concern, query.concerns).filter(isPlantConcern);
  const validIssueIds = new Set(
    healingCategories.flatMap((category) => category.issues.map((issue) => issue.id)),
  );
  const issues = parseIdList(query.issue, query.issues).filter((id) =>
    validIssueIds.has(id),
  );

  return {
    concerns,
    issues,
    intensity: query.intensity,
  };
}

export function getRecommendations(query: RecommendationQuery): RankedRecommendation[] {
  const { concerns, issues, intensity } = normalizeRecommendationQuery(query);
  if (concerns.length === 0) return [];

  const scores = new Map<string, number>();
  const matched = new Map<string, PlantConcern[]>();
  const tilt = Number.isFinite(intensity) ? Number(intensity) - 3 : 0;

  for (const concern of concerns) {
    const list = (rankings as Record<string, string[]>)[concern] ?? [];
    list.forEach((slug, index) => {
      scores.set(slug, (scores.get(slug) ?? 0) + Math.max(2, 14 - index * 2));
      const prior = matched.get(slug) ?? [];
      if (!prior.includes(concern)) matched.set(slug, [...prior, concern]);
    });
    if (tilt !== 0 && list.length > 0) {
      const slug = tilt > 0 ? list[0] : list[Math.min(2, list.length - 1)];
      scores.set(slug, (scores.get(slug) ?? 0) + Math.abs(tilt) * 4);
    }
  }

  for (const issue of issues) {
    const list = (symptomMap as Record<string, string[]>)[issue] ?? [];
    list.forEach((slug, index) => {
      scores.set(slug, (scores.get(slug) ?? 0) + Math.max(1, 9 - index));
    });
  }

  for (const [slug, matchedConcerns] of matched) {
    if (matchedConcerns.length > 1) {
      scores.set(slug, (scores.get(slug) ?? 0) + matchedConcerns.length * 8);
    }
  }

  const ordered = [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([slug]) => slug);

  const cap = Math.min(8, Math.max(3, concerns.length * 2 + Math.min(issues.length, 2)));

  return ordered
    .slice(0, cap)
    .map((slug, index) => {
      const plant = getPlant(slug);
      if (!plant) return null;
      const ambassador = Boolean(plant.ambassador);
      return {
        plant,
        rank: index + 1,
        systemRole: ambassador ? "Ambassador" : index === 0 ? "Primary" : "Secondary",
        evidenceNote:
          "PLACEHOLDER — role in the prototype, not a clinical evidence grade",
        placeholderBenefit: `PLACEHOLDER: ${plant.benefits[0]}`,
        placeholderSafetyNote: `TO BE VERIFIED: ${plant.precautions[0] ?? "Ask a qualified professional before use."}`,
        matchedConcerns: matched.get(slug) ?? plant.concerns.filter((item) => concerns.includes(item)),
      } satisfies RankedRecommendation;
    })
    .filter((item): item is RankedRecommendation => item !== null);
}

export function buildGuidePath(query: {
  concerns: string[];
  issues?: string[];
  intensity?: number;
}) {
  const params = new URLSearchParams();
  if (query.concerns.length) params.set("concerns", query.concerns.join(","));
  if (query.issues?.length) params.set("issues", query.issues.join(","));
  if (query.intensity && query.intensity !== 3) {
    params.set("intensity", String(query.intensity));
  }
  const qs = params.toString();
  return qs ? `/healing-guide?${qs}` : "/healing-guide";
}
