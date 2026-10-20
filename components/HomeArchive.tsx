"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DirtStory } from "@/components/DirtStory";
import { PlantPortrait } from "@/components/PlantPortrait";
import { dirtLayer } from "@/lib/media";
import { plants, searchPlants } from "@/lib/plants";
import { MEDICAL_DISCLAIMER } from "@/lib/safetyRules";
import type { Plant } from "@/lib/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function archiveLetter(name: string) {
  const letter = name.replace(/[^A-Za-z]/g, "").charAt(0);
  return (letter || "#").toUpperCase();
}

export function HomeArchive() {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("arnica");
  const [activeLetter, setActiveLetter] = useState("A");
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

  const activePlants = letterGroups.get(activeLetter) ?? [];

  useEffect(() => {
    if (activePlants.length > 0) return;
    const next = ALPHABET.find((letter) => (letterGroups.get(letter)?.length ?? 0) > 0);
    if (next) setActiveLetter(next);
  }, [activePlants.length, letterGroups]);

  function openLetter(letter: string) {
    const group = letterGroups.get(letter) ?? [];
    if (group.length === 0) return;
    setActiveLetter(letter);
    setSelectedSlug(group[0].slug);
  }

  function openPlant(plant: Plant) {
    setSelectedSlug(plant.slug);
    setActiveLetter(archiveLetter(plant.name));
  }

  return (
    <section
      id="archive"
      className="relative scroll-mt-28 overflow-hidden bg-[var(--soil)] text-[var(--parchment)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dirtLayer}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_bottom]"
      />
      <div className="archive-sky-dissolve" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-12 md:px-8 md:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
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
                className="w-full rounded-full bg-white px-5 py-2.5 text-center text-sm text-[var(--ink)] outline-none"
              />
            </label>

            {featured ? (
              <div className="mt-8 flex flex-col items-center text-center">
                <Link
                  href={`/library/${featured.slug}`}
                  className="flex justify-center"
                  aria-label={`Open ${featured.name} profile`}
                >
                  <PlantPortrait
                    slug={featured.slug}
                    name={featured.name}
                    className="h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64"
                  />
                </Link>
                <p className="mt-4 font-display text-2xl text-white md:text-3xl">
                  {featured.name}
                </p>
                <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-[rgba(243,235,221,0.78)]">
                  Tap the picture to open the profile.
                </p>
              </div>
            ) : null}
          </aside>

          <div>
            <p className="font-condensed text-[0.75rem] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
              A to Z
            </p>
            <p className="mt-2 text-sm font-light text-[rgba(243,235,221,0.72)]">
              {filtered.length} plants. Pick a letter, then a name.
            </p>

            <nav
              className="mt-5 flex flex-wrap gap-1"
              aria-label="Alphabet"
            >
              {ALPHABET.map((letter) => {
                const count = letterGroups.get(letter)?.length ?? 0;
                const on = letter === activeLetter;
                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={count === 0}
                    onClick={() => openLetter(letter)}
                    aria-current={on ? "true" : undefined}
                    className={`flex h-8 w-8 items-center justify-center font-condensed text-[0.82rem] tracking-wide ${
                      on
                        ? "bg-[var(--gold)] text-[var(--soil-brown)]"
                        : count > 0
                          ? "text-[var(--gold)] hover:bg-[rgba(250,214,7,0.14)]"
                          : "cursor-default text-[rgba(243,235,221,0.2)]"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8">
              {filtered.length === 0 ? (
                <p className="text-sm text-[rgba(243,235,221,0.7)]">
                  No plants in this search.
                </p>
              ) : (
                <>
                  <div className="flex items-end gap-3 border-b border-[rgba(250,214,7,0.35)] pb-2">
                    <h3 className="font-display text-4xl leading-none text-[var(--gold)]">
                      {activeLetter}
                    </h3>
                    <p className="pb-1 font-condensed text-[0.68rem] uppercase tracking-[0.16em] text-[rgba(243,235,221,0.55)]">
                      {activePlants.length}{" "}
                      {activePlants.length === 1 ? "plant" : "plants"}
                    </p>
                  </div>
                  <ul className="mt-4 grid grid-cols-1 gap-y-1.5 sm:grid-cols-2 sm:gap-x-8">
                    {activePlants.map((plant) => {
                      const on = featured?.slug === plant.slug;
                      return (
                        <li key={plant.slug}>
                          <button
                            type="button"
                            onClick={() => openPlant(plant)}
                            className={`text-left text-[0.95rem] leading-6 transition-colors ${
                              on
                                ? "text-white"
                                : "text-[rgba(243,235,221,0.82)] hover:text-white"
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

        <p className="mx-auto mt-12 max-w-xl text-center text-[0.68rem] font-light leading-relaxed text-[rgba(243,235,221,0.58)]">
          {MEDICAL_DISCLAIMER}
        </p>
      </div>

      <div className="relative z-10 h-24 md:h-40" aria-hidden />

      <DirtStory />
    </section>
  );
}
