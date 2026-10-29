"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CategorySelector } from "@/components/CategorySelector";
import { IssueSelector } from "@/components/IssueSelector";
import { PrairieSageGuide } from "@/components/PrairieSageGuide";
import { SafetyNote } from "@/components/SafetyNote";
import {
  buildGuidePath,
  getCategory,
  getRecommendations,
  healingCategories,
  isPlantConcern,
  parseIdList,
} from "@/lib/recommendationEngine";
import type { Plant, PlantConcern } from "@/lib/types";

type GuideSelection = {
  concerns: PlantConcern[];
  issues: string[];
  intensity: number;
};

type PlantTab = "benefits" | "precautions" | "dosage" | "prepare" | "grow";

const plantTabs: { id: PlantTab; label: string }[] = [
  { id: "benefits", label: "Benefits" },
  { id: "precautions", label: "Precautions" },
  { id: "dosage", label: "Dosage" },
  { id: "prepare", label: "Prepare" },
  { id: "grow", label: "Grow" },
];

function fingerprint(selection: GuideSelection) {
  return `${selection.concerns.join(",")}|${selection.issues.join(",")}|${selection.intensity}`;
}

function selectionFromSearch(searchParams: URLSearchParams): GuideSelection {
  const intensityValue = Number(searchParams.get("intensity") ?? "3");
  return {
    concerns: parseIdList(
      searchParams.get("concerns"),
      searchParams.get("concern"),
    ).filter(isPlantConcern),
    issues: parseIdList(searchParams.get("issues"), searchParams.get("issue")),
    intensity: Number.isFinite(intensityValue) ? intensityValue : 3,
  };
}

function tabCopy(plant: Plant, tab: PlantTab) {
  if (tab === "benefits") {
    return (
      <>
        <ul className="list-disc space-y-1.5 pl-4 text-sm font-light text-[var(--ink)]">
          {plant.benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm font-light leading-relaxed text-[var(--ink-soft)]">
          {plant.traditionalUses}
        </p>
      </>
    );
  }
  if (tab === "precautions") {
    return (
      <ul className="list-disc space-y-1.5 pl-4 text-sm font-light text-[var(--ink)]">
        {plant.precautions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (tab === "dosage") {
    return (
      <p className="text-sm font-light leading-relaxed text-[var(--ink-soft)]">
        Dosage is not provided in this prototype. A later sourced record can sit
        here. Do not treat any number on this site as a prescription.
      </p>
    );
  }
  if (tab === "prepare") {
    return <p className="text-sm font-light leading-relaxed text-[var(--ink)]">{plant.preparation}</p>;
  }
  return (
    <>
      <p className="text-sm font-light leading-relaxed text-[var(--ink)]">{plant.grow}</p>
      {plant.gardenNotes.length > 0 ? (
        <p className="mt-3 font-condensed text-[0.68rem] uppercase tracking-[0.14em] text-[var(--guide-purple)]">
          {plant.gardenNotes.join(" · ")}
        </p>
      ) : null}
    </>
  );
}

function PlantWindow({
  topPlant,
  onChat,
}: {
  topPlant: ReturnType<typeof getRecommendations>[number] | undefined;
  onChat: () => void;
}) {
  const [tab, setTab] = useState<PlantTab>("benefits");
  const plant = topPlant?.plant;

  useEffect(() => {
    setTab("benefits");
  }, [plant?.slug]);

  if (!plant) {
    return (
      <aside className="bg-white px-2 py-4 lg:px-4">
        <p className="font-condensed text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[var(--guide-purple)]">
          Highest on this path
        </p>
        <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-[var(--ink-soft)]">
          Choose a concern and the first plant appears here.
        </p>
      </aside>
    );
  }

  return (
    <aside className="bg-white px-2 py-4 lg:px-4">
      <p className="font-condensed text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[var(--guide-purple)]">
        Highest on this path
      </p>
      <h3 className="mt-3 font-display text-3xl leading-tight text-[var(--ink)] md:text-4xl">
        {plant.name}
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
        <nav className="flex flex-col">
          {plantTabs.map((item) => {
            const on = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`px-3 py-2.5 text-left font-condensed text-[0.68rem] uppercase tracking-[0.12em] ${
                  on
                    ? "bg-[var(--guide-purple)] text-white"
                    : "bg-[rgba(88,57,150,0.12)] text-[var(--guide-purple)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        <div>{tabCopy(plant, tab)}</div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onChat}
          className="rounded-full bg-[var(--guide-purple)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-white"
        >
          Chat
        </button>
        <Link
          href={`/marketplace?plant=${plant.slug}`}
          className="rounded-full border border-[var(--guide-purple)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--guide-purple)]"
        >
          Buy
        </Link>
        <Link
          href={`/library/${plant.slug}`}
          className="rounded-full border border-[var(--guide-purple)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--guide-purple)]"
        >
          Learn more
        </Link>
      </div>
    </aside>
  );
}

function guidePath(selection: GuideSelection, talkOpen: boolean) {
  const path = buildGuidePath(selection);
  if (!talkOpen) return path;
  const params = new URLSearchParams(path.split("?")[1] ?? "");
  params.set("talk", "1");
  return `/healing-guide?${params.toString()}`;
}

export function HealingGuideClient() {
  const searchParams = useSearchParams();
  const urlKey = searchParams.toString();
  const talkFromUrl = searchParams.get("talk") === "1";
  const [sageOpen, setSageOpen] = useState(talkFromUrl);
  const [selection, setSelection] = useState<GuideSelection>(() =>
    selectionFromSearch(searchParams),
  );
  const { concerns, issues, intensity } = selection;
  const results = getRecommendations({ concerns, issues, intensity });
  const topPlant = results[0];
  const morePlants = results.slice(1);
  const selectedCategories = healingCategories.filter((item) =>
    concerns.includes(item.id as PlantConcern),
  );

  useEffect(() => {
    const fromUrl = selectionFromSearch(new URLSearchParams(urlKey));
    if (fingerprint(fromUrl) === fingerprint(selection)) return;
    setSelection(fromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- compare fingerprints, not the object
  }, [urlKey]);

  useEffect(() => {
    if (talkFromUrl) setSageOpen(true);
  }, [talkFromUrl]);

  useEffect(() => {
    if (!sageOpen) return;
    document.getElementById("sage-talk")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [sageOpen]);

  function write(next: GuideSelection) {
    setSelection(next);
    window.history.replaceState(window.history.state, "", guidePath(next, sageOpen));
  }

  function openSage() {
    setSageOpen(true);
    window.history.replaceState(
      window.history.state,
      "",
      guidePath(selection, true),
    );
  }

  function closeSage() {
    setSageOpen(false);
    window.history.replaceState(
      window.history.state,
      "",
      guidePath(selection, false),
    );
  }

  function toggleConcern(id: string) {
    const nextConcerns = concerns.includes(id as PlantConcern)
      ? concerns.filter((item) => item !== id)
      : [...concerns, id as PlantConcern];
    const allowed = new Set(
      nextConcerns.flatMap(
        (concern) => getCategory(concern)?.issues.map((issue) => issue.id) ?? [],
      ),
    );
    write({
      concerns: nextConcerns,
      issues: issues.filter((issue) => allowed.has(issue)),
      intensity,
    });
  }

  function toggleIssue(id: string) {
    const nextIssues = issues.includes(id)
      ? issues.filter((item) => item !== id)
      : [...issues, id];
    write({ concerns, issues: nextIssues, intensity });
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-8 md:px-8 [overflow-anchor:none]">
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-[2.75rem]">
        Choose how you feel
      </h1>
      <p className="mt-1 text-base font-light text-[var(--ink-soft)]">
        One concern or several. The plant and the rest of the path stay in this
        section.
      </p>

      <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,32rem)]">
        <div className="flex min-w-0 flex-col">
          <div className="flex max-w-xl flex-wrap items-center gap-2">
            <CategorySelector
              selected={concerns}
              selectedIssues={issues}
              onToggleConcern={toggleConcern}
              onToggleIssue={toggleIssue}
              compact
            />
            {concerns.length > 0 ? (
              <button
                type="button"
                onClick={() => write({ concerns: [], issues: [], intensity: 3 })}
                className="ml-1 font-condensed text-[0.62rem] uppercase tracking-[0.16em] text-[var(--ink-soft)] underline decoration-[rgba(44,36,22,0.28)] underline-offset-4 hover:text-[var(--ink)]"
              >
                Clear all
              </button>
            ) : null}
          </div>

          <div className="mt-4 rounded-2xl bg-[rgba(88,57,150,0.05)] p-3 md:p-4">
            {selectedCategories.length > 0 ? (
              <div className="mb-4 space-y-3">
                {selectedCategories.map((category) => (
                  <div key={category.id}>
                    <p className="mb-1.5 font-condensed text-[0.68rem] uppercase tracking-[0.14em] text-[var(--guide-purple)]">
                      {category.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.issues.map((issue) => {
                        const on = issues.includes(issue.id);
                        return (
                          <button
                            key={issue.id}
                            type="button"
                            onClick={() => toggleIssue(issue.id)}
                            aria-pressed={on}
                            className={`rounded-full px-3 py-1.5 font-condensed text-[0.68rem] uppercase tracking-[0.12em] ${
                              on
                                ? "bg-[var(--guide-purple)] text-white"
                                : "border border-[rgba(88,57,150,0.22)] bg-white text-[var(--ink)]"
                            }`}
                          >
                            {issue.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <IssueSelector
              intensity={intensity}
              onChange={(value) => write({ concerns, issues, intensity: value })}
            />
          </div>

          <PlantWindow topPlant={topPlant} onChat={openSage} />

          {morePlants.length > 0 ? (
            <div className="mt-6">
              <p className="font-condensed text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--guide-purple)]">
                Also on this path
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {morePlants.map((item) => (
                  <Link
                    key={item.plant.slug}
                    href={`/library/${item.plant.slug}`}
                    className="font-display text-lg leading-tight text-[var(--ink)] hover:underline"
                  >
                    {item.plant.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <PrairieSageGuide
          open={sageOpen}
          onOpen={openSage}
          onClose={closeSage}
          plantSlug={topPlant?.plant.slug}
          plantName={topPlant?.plant.name}
        />
      </div>

      <SafetyNote compact className="mt-8" />
    </section>
  );
}
