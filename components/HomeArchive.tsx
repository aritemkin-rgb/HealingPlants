"use client";

import { useEffect, useMemo, useState } from "react";
import { ArchiveFeature } from "@/components/ArchiveFeature";
import { DirtAmbassadors } from "@/components/DirtAmbassadors";
import { DirtStory } from "@/components/DirtStory";
import { SafetyNote } from "@/components/SafetyNote";
import { dirtLayer } from "@/lib/media";
import { concerns, plants, searchPlants } from "@/lib/plants";
import type { Plant, PlantConcern } from "@/lib/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type ArchiveView = "az" | "region" | "benefit";

const VIEWS: { id: ArchiveView; label: string }[] = [
  { id: "az", label: "A to Z" },
  { id: "region", label: "Regions" },
  { id: "benefit", label: "Benefits" },
];

function archiveLetter(name: string) {
  const letter = name.replace(/[^A-Za-z]/g, "").charAt(0);
  return (letter || "#").toUpperCase();
}

function IndexMark({
  label,
  on,
  disabled,
  onClick,
}: {
  label: string;
  on: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-current={on ? "true" : undefined}
      className={`font-condensed text-[1.05rem] tracking-wide transition-colors md:text-[1.15rem] ${
        on
          ? "text-[var(--gold)]"
          : disabled
            ? "cursor-default text-[rgba(243,235,221,0.22)]"
            : "text-[rgba(243,235,221,0.72)] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export function HomeArchive() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<ArchiveView>("az");
  const [selectedSlug, setSelectedSlug] = useState("arnica");
  const [activeLetter, setActiveLetter] = useState("A");
  const [activeRegion, setActiveRegion] = useState("Africa");
  const [activeBenefit, setActiveBenefit] = useState<PlantConcern>("sleep");
  const [clickedThrough, setClickedThrough] = useState(false);
  const filtered = useMemo(() => searchPlants(query), [query]);
  const featured =
    filtered.find((plant) => plant.slug === selectedSlug) ??
    filtered[0] ??
    plants[0];

  const letterGroups = useMemo(() => {
    const groups = new Map<string, Plant[]>();
    for (const letter of ALPHABET) groups.set(letter, []);
    for (const plant of filtered) {
      groups.get(archiveLetter(plant.name))?.push(plant);
    }
    return groups;
  }, [filtered]);

  const regionGroups = useMemo(() => {
    const groups = new Map<string, Plant[]>();
    for (const plant of filtered) {
      const list = groups.get(plant.region) ?? [];
      list.push(plant);
      groups.set(plant.region, list);
    }
    return [...groups.entries()]
      .sort(([a], [b]) => a.localeCompare(b, "en", { sensitivity: "base" }))
      .map(([label, list]) => ({ label, list }));
  }, [filtered]);

  const benefitGroups = useMemo(
    () =>
      concerns
        .map((concern) => ({
          id: concern.id,
          label: concern.label,
          list: filtered.filter((plant) => plant.concerns.includes(concern.id)),
        }))
        .filter((group) => group.list.length > 0),
    [filtered],
  );

  const activePlants = useMemo(() => {
    if (view === "region") {
      return regionGroups.find((group) => group.label === activeRegion)?.list ?? [];
    }
    if (view === "benefit") {
      return benefitGroups.find((group) => group.id === activeBenefit)?.list ?? [];
    }
    return letterGroups.get(activeLetter) ?? [];
  }, [
    activeBenefit,
    activeLetter,
    activeRegion,
    benefitGroups,
    letterGroups,
    regionGroups,
    view,
  ]);

  const heading =
    view === "region"
      ? activeRegion
      : view === "benefit"
        ? (benefitGroups.find((group) => group.id === activeBenefit)?.label ?? "Benefits")
        : activeLetter;

  useEffect(() => {
    if (activePlants.length > 0) return;
    if (view === "az") {
      const next = ALPHABET.find((letter) => (letterGroups.get(letter)?.length ?? 0) > 0);
      if (next) setActiveLetter(next);
      return;
    }
    if (view === "region" && regionGroups[0]) setActiveRegion(regionGroups[0].label);
    if (view === "benefit" && benefitGroups[0]) setActiveBenefit(benefitGroups[0].id);
  }, [activePlants.length, benefitGroups, letterGroups, regionGroups, view]);

  function openView(next: ArchiveView) {
    setView(next);
    if (!featured) return;
    if (next === "az") setActiveLetter(archiveLetter(featured.name));
    if (next === "region") setActiveRegion(featured.region);
    if (next === "benefit") setActiveBenefit(featured.concerns[0] ?? "sleep");
  }

  function openLetter(letter: string) {
    const group = letterGroups.get(letter) ?? [];
    if (group.length === 0) return;
    setActiveLetter(letter);
    if (clickedThrough) setSelectedSlug(group[0].slug);
  }

  function openRegion(region: string) {
    const group = regionGroups.find((item) => item.label === region)?.list ?? [];
    if (group.length === 0) return;
    setActiveRegion(region);
    if (clickedThrough) setSelectedSlug(group[0].slug);
  }

  function openBenefit(id: PlantConcern) {
    const group = benefitGroups.find((item) => item.id === id)?.list ?? [];
    if (group.length === 0) return;
    setActiveBenefit(id);
    if (clickedThrough) setSelectedSlug(group[0].slug);
  }

  function openPlant(plant: Plant) {
    setClickedThrough(true);
    setSelectedSlug(plant.slug);
    setActiveLetter(archiveLetter(plant.name));
    setActiveRegion(plant.region);
    if (plant.concerns.length > 0) setActiveBenefit(plant.concerns[0]);
  }

  return (
    <section
      id="archive"
      className="relative scroll-mt-28 bg-[var(--soil)] bg-cover bg-[center_bottom] text-[var(--parchment)]"
      style={{ backgroundImage: `url(${dirtLayer})` }}
    >

      <div className="relative mx-auto max-w-6xl px-5 pt-12 md:px-8 md:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28">
            <p className="font-condensed text-[0.75rem] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
              Interactive plant library
            </p>
            <h2 className="mt-2 font-display text-[2.4rem] leading-none md:text-5xl">
              The archive.
            </h2>
            <label className="mt-5 block">
              <span className="sr-only">Search the archive</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                className="w-full border-b border-[rgba(243,235,221,0.35)] bg-transparent px-0 py-2 text-sm text-white outline-none placeholder:text-[rgba(243,235,221,0.45)]"
              />
            </label>

            {featured ? (
              <ArchiveFeature plant={featured} showCharacter={!clickedThrough} />
            ) : null}
          </aside>

          <div>
            <nav className="flex flex-wrap items-baseline gap-x-6 gap-y-2" aria-label="Archive lists">
              {VIEWS.map((item) => {
                const on = view === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openView(item.id)}
                    aria-current={on ? "true" : undefined}
                    className={`font-condensed text-[0.88rem] uppercase tracking-[0.2em] md:text-[0.95rem] ${
                      on
                        ? "text-[var(--gold)]"
                        : "text-[rgba(243,235,221,0.5)] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <p className="mt-2 text-[0.95rem] font-light text-[rgba(243,235,221,0.72)] md:text-base">
              {filtered.length} plants. Choose a list, then a name.
            </p>

            {view === "az" ? (
              <nav
                className="mt-6 grid grid-cols-13 gap-y-1.5"
                aria-label="Alphabet"
                style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}
              >
                {ALPHABET.map((letter) => {
                  const count = letterGroups.get(letter)?.length ?? 0;
                  return (
                    <IndexMark
                      key={letter}
                      label={letter}
                      on={letter === activeLetter}
                      disabled={count === 0}
                      onClick={() => openLetter(letter)}
                    />
                  );
                })}
              </nav>
            ) : null}

            {view === "region" ? (
              <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label="Regions">
                {regionGroups.map((group) => (
                  <IndexMark
                    key={group.label}
                    label={group.label}
                    on={group.label === activeRegion}
                    onClick={() => openRegion(group.label)}
                  />
                ))}
              </nav>
            ) : null}

            {view === "benefit" ? (
              <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label="Benefits">
                {benefitGroups.map((group) => (
                  <IndexMark
                    key={group.id}
                    label={group.label}
                    on={group.id === activeBenefit}
                    onClick={() => openBenefit(group.id)}
                  />
                ))}
              </nav>
            ) : null}

            <div className="mt-8">
              {filtered.length === 0 ? (
                <p className="text-sm text-[rgba(243,235,221,0.7)]">
                  No plants in this search.
                </p>
              ) : (
                <>
                  <div className="flex items-end gap-3 border-b border-[rgba(250,214,7,0.45)] pb-2">
                    <h3 className="font-display text-3xl leading-none text-[var(--gold)] md:text-4xl">
                      {heading}
                    </h3>
                    <p className="pb-1 font-condensed text-[0.78rem] uppercase tracking-[0.16em] text-[rgba(243,235,221,0.55)]">
                      {activePlants.length}{" "}
                      {activePlants.length === 1 ? "plant" : "plants"}
                    </p>
                  </div>
                  <ul className="mt-4 grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-10">
                    {activePlants.map((plant) => {
                      const on = featured?.slug === plant.slug;
                      return (
                        <li key={plant.slug}>
                          <button
                            type="button"
                            onClick={() => openPlant(plant)}
                            className={`w-full border-l py-0.5 pl-2.5 text-left text-[1.05rem] leading-7 transition-colors md:text-[1.12rem] ${
                              on
                                ? "border-[var(--gold)] text-white"
                                : "border-transparent text-[rgba(243,235,221,0.86)] hover:text-white"
                            }`}
                          >
                            {plant.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-[1.4rem] bg-white p-4 text-[var(--ink)] md:p-5">
          <SafetyNote />
        </div>
      </div>

      <DirtAmbassadors />

      <DirtStory />
    </section>
  );
}
