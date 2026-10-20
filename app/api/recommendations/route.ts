import { NextResponse } from "next/server";
import { getRecommendations, parseIdList } from "@/lib/recommendationEngine";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const concerns = parseIdList(
    url.searchParams.get("concerns"),
    url.searchParams.getAll("concern"),
  );
  const issues = parseIdList(
    url.searchParams.get("issues"),
    url.searchParams.getAll("issue"),
  );
  const intensity = Number(url.searchParams.get("intensity") ?? "0") || undefined;

  const results = getRecommendations({ concerns, issues, intensity });

  return NextResponse.json({
    backend: "mock",
    query: { concerns, issues, intensity },
    count: results.length,
    recommendations: results.map((item) => ({
      slug: item.plant.slug,
      name: item.plant.name,
      ambassador: item.plant.ambassador ?? null,
      systemRole: item.systemRole,
      evidenceNote: item.evidenceNote,
      placeholderBenefit: item.placeholderBenefit,
      placeholderSafetyNote: item.placeholderSafetyNote,
      matchedConcerns: item.matchedConcerns,
    })),
  });
}
