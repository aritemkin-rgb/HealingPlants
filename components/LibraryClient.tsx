"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PlantCard } from "@/components/PlantCard";
import { SafetyNote } from "@/components/SafetyNote";
import { geographies, plants, searchPlants } from "@/lib/plants";
import { concerns } from "@/lib/plants";
import type { PlantConcern } from "@/lib/types";

type SortMode = "alpha" | "benefit" | "geography";

export function LibraryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const sortParam = searchParams.get("sort");
  const sort: SortMode =
    sortParam === "benefit" || sortParam === "geography" || sortParam === "alpha"
      ? sortParam
      : "alpha";
  const benefitParam = searchParams.get("benefit");
  const benefit: PlantConcern | "all" = concerns.some((item) => item.id === benefitParam)
    ? (benefitParam as PlantConcern)
    : "all";
  const geo = searchParams.get("geo") ?? "all";

  function patchParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all") params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    router.replace(qs ? `/library?${qs}` : "/library", { scroll: false });
  }

  const filtered = useMemo(() => {
    let list = searchPlants(query);
    if (benefit !== "all") list = list.filter((plant) => plant.concerns.includes(benefit));
    if (geo !== "all") list = list.filter((plant) => plant.geography === geo);
    if (sort === "alpha") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "geography") {
      list = [...list].sort((a, b) => a.geography.localeCompare(b.geography) || a.name.localeCompare(b.name));
    } else {
      list = [...list].sort(
        (a, b) => a.concerns[0].localeCompare(b.concerns[0]) || a.name.localeCompare(b.name),
      );
    }
    return list;
  }, [benefit, geo, query, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-sans text-[0.7rem] uppercase tracking-[0.24em] text-[var(--root-gold)]">
        Interactive plant library
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">The archive</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-[rgba(243,235,221,0.82)]">
        Browse alphabetically, by benefit, or by geography. Each plant opens a
        profile. Prairie Sage can help you search — she does not replace the
        filters. Arnica may become the Library Keeper later; for now she is a
        visual ambassador on the pain path.
      </p>
      <div className="mt-4 max-w-2xl rounded-2xl bg-white p-4 text-[var(--ink)]">
        <SafetyNote />
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-[1.4rem] bg-white p-4 md:flex-row md:items-end">
        <label className="flex-1 text-sm">
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Benefit, geography, or plant name"
            className="mt-1 w-full rounded-full border border-[rgba(44,36,22,0.14)] px-4 py-2"
          />
        </label>
        <label className="text-sm">
          Organize
          <select
            value={sort}
            onChange={(event) => patchParams({ sort: event.target.value })}
            className="mt-1 block rounded-full border border-[rgba(44,36,22,0.14)] px-3 py-2"
          >
            <option value="alpha">Alphabetical</option>
            <option value="benefit">By benefit</option>
            <option value="geography">By geography</option>
          </select>
        </label>
        <label className="text-sm">
          Benefit
          <select
            value={benefit}
            onChange={(event) => patchParams({ benefit: event.target.value })}
            className="mt-1 block rounded-full border border-[rgba(44,36,22,0.14)] px-3 py-2"
          >
            <option value="all">All</option>
            {concerns.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Geography
          <select
            value={geo}
            onChange={(event) => patchParams({ geo: event.target.value })}
            className="mt-1 block rounded-full border border-[rgba(44,36,22,0.14)] px-3 py-2"
          >
            <option value="all">All</option>
            {geographies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-[rgba(243,235,221,0.75)]">
        {filtered.length} of {plants.length} plants
      </p>
      <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((plant) => (
          <PlantCard key={plant.slug} plant={plant} compact />
        ))}
      </div>
    </div>
  );
}
